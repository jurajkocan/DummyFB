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

export const startServer = async () => {
    const app = Express();
    app.use(BodyParser.urlencoded({ extended: false }));
    app.use(Session(
        {
            secret: WebConfig.SessionConfiguration.SessionSecret,
            cookie: { maxAge: WebConfig.SessionConfiguration.ExpireLoginSession },
            saveUninitialized: true,
            resave: true,
        }
    ));
    app.use(Express.static('./public'));

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

    /**
    * @returns login page
    */
    app.get('/security/login', async (req, res) => {
        const html = renderLogin();
        res.send(html);
    });

    app.get('*', async (req, res) => {
        const html = renderApplication();
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
                            const user = GetUser(req.body.email);
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
                    res.status(500).send(e.message);
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

    app.listen(3000);
    console.log('server started');
}
