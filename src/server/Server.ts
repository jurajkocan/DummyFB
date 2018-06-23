import * as Express from 'express';
import * as BodyParser from 'body-parser';
import * as Session from 'express-session';
import { WebConfig } from '../WebConfig';
import { renderLogin } from '../frontend/pages/security/LoginServer';
import { EndpointsV1 } from '../api/EndPoints';
import { ApiRoutes } from '../api/interfaces/ApiRoutes';
import { GetUser } from '../database/query/User';
import { renderApplication } from '../frontend/pages/RenderApplicationServer';
import { validateToken } from '../jwt/JwtHanddler';
import { DbUser } from '../database/schema/DbUser.ts';
import { getDefaultAppState, defaultAppState } from '../frontend/redux/State';

export const startServer = async () => {
    //region express settings
    const app = Express();
    app.use(BodyParser.urlencoded({ extended: false }));
    app.use(BodyParser.json());
    app.use(Session(
        {
            secret: WebConfig.SessionConfiguration.SessionSecret,
            cookie: { maxAge: WebConfig.SessionConfiguration.ExpireLoginSession },
            saveUninitialized: true,
            resave: true,
        }
    ));
    app.use(Express.static('./public'));
    //#endregion

    /**
     * check if user is authenticated on all request but api and security
     */
    app.use((req, res, next) => {
        if (req.url.indexOf('/api') === -1 && req.url.indexOf('/security') === -1) {
            if (isLoggedIn(req)) {
                next();
            } else {
                res.redirect(303, '/security/login');
            }
        } else {
            next();
        }
    });

    //#region Work with session
    const isLoggedIn = (req: Express.Request) => {
        if (req.session) {
            if (req.session.accessToken) {
                if (validateToken(req.session.accessToken)) {
                    return true;
                }
            }
        }
        return false;
    };

    const getUserFromSession = (req: Express.Request) => {
        if (req.session) {
            if (req.session.user) {
                return req.session.user as DbUser;
            }
        }
        return null;
    }

    const getUserAccessTokenFromSession = (req: Express.Request) => {
        if (req.session) {
            if (req.session.accessToken) {
                const payload = validateToken(req.session.accessToken) as any;
                if (payload) {
                    return req.session.accessToken as string;
                }
            }

        }
        return null;
    }
    //#endregion

    /**
    * @returns login page
    */
    app.get('/security/login', async (req, res) => {
        const html = renderLogin();
        res.send(html);
    });

    /**
     * api endpoints
     */
    app.use(async (req, res, next) => {
        const sendResponse = (result: any) => {
            res.status(200).send(result);
        }

        if (req.url.includes('/api')) {
            const currentEndpoint = Object.keys(EndpointsV1).find((endPoint) => { return endPoint === req.url });
            if (currentEndpoint) {
                const endpointIn = currentEndpoint as keyof ApiRoutes;
                try {
                    switch (endpointIn) {
                        case '/api/v1/user/login':
                            const loginToken = await EndpointsV1['/api/v1/user/login'](req, req.body);
                            const user = await GetUser(undefined, req.body.email);
                            if (req.session) {
                                req.session.accessToken = loginToken.token;
                                req.session.user = user;
                            }
                            sendResponse(loginToken);
                            return;
                        default:
                            res.send('bad api endpoint');
                            return;
                    }
                }
                catch (e) {
                    res.status(400).send(e.message);
                }
            }
            else {
                res.statusMessage = '';
                res.status(400).send('bad api endpoint as obj');
                return;
            }
        }
        else {
            next();
        }
    });


    app.get('*', async (req, res) => {
        const userAccessToken = getUserAccessTokenFromSession(req);
        const user = getUserFromSession(req);
        let html;
        if (user && userAccessToken) {
            console.log('jaja here');
            const appState = getDefaultAppState(userAccessToken, user);
            html = renderApplication(appState);
        }
        else {
            const appState = defaultAppState;
            html = renderApplication(appState);
        }
        res.send(html);
    });
    app.listen(3000);
    console.log('server started');
}
