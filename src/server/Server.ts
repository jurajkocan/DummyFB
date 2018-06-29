import * as Express from "express";
import * as BodyParser from "body-parser";
import * as Session from "express-session";
import { WebConfig } from "../WebConfig";
import { renderLogin } from "../frontend/pages/security/LoginServer";
import { EndpointsV1 } from "../api/EndPoints";
import { ApiRoutes } from "../api/interfaces/ApiRoutes";
import { getUser } from "../database/query/User";
import { renderApplication } from "../frontend/pages/RenderApplicationServer";
import { validateToken } from "../jwt/JwtHandler";
import { DbUser } from "../database/schema/DbUser";
import { getDefaultAppState, defaultAppState } from "../frontend/redux/State";
import { authenticated } from "../api/Authorization";
import { getPageSettings } from "./Utils";

export const startServer = async () => {
    //#region express settings
    const app = Express();
    app.use(BodyParser.urlencoded({ extended: false }));
    app.use(BodyParser.json());
    app.use(
        Session({
            secret: WebConfig.SessionConfiguration.SessionSecret,
            cookie: {
                maxAge: WebConfig.SessionConfiguration.ExpireLoginSession
            },
            saveUninitialized: true,
            resave: true
        })
    );
    app.use(Express.static("./public"));
    //#endregion

    /**
     * check if user is authenticated on all request but api and security
     */
    app.use((req, res, next) => {
        if (
            req.url.indexOf("/api") === -1 &&
            req.url.indexOf("/security") === -1
        ) {
            if (isLoggedIn(req)) {
                next();
            } else {
                res.redirect(303, "/security/login");
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
    };

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
    };
    //#endregion

    /**
     * @returns login page
     */
    app.get("/security/login", async (req, res) => {
        const html = renderLogin();
        res.send(html);
    });

    /**
     * @description api endpoints
     */
    app.use(async (req, res, next) => {
        const sendResponse = (result: any, error?: string) => {
            if (result) res.status(200).send(result);
            else res.status(400).send(error);
        };

        if (req.url.includes("/api")) {
            const currentEndpoint = Object.keys(EndpointsV1).find(endPoint => {
                return endPoint === req.url;
            });
            if (currentEndpoint) {
                const endpointIn = currentEndpoint as keyof ApiRoutes;
                const [authPayload, errorMessage] = await authenticated(req);
                try {
                    switch (endpointIn) {
                        case "/api/v1/user/login":
                            const loginToken = await EndpointsV1[
                                "/api/v1/user/login"
                            ](req, req.body);
                            try {
                                const user = await getUser(
                                    undefined,
                                    req.body.email
                                );
                                if (req.session) {
                                    req.session.accessToken = loginToken.token;
                                    req.session.user = user;
                                }
                            } catch (e) {
                                sendResponse(
                                    undefined,
                                    "Email or password are incorrect"
                                );
                            }

                            sendResponse(loginToken);
                            return;
                        case "/api/v1/user/filtered":
                            if (authPayload) {
                                const userResponse = await EndpointsV1[
                                    "/api/v1/user/filtered"
                                ](req, req.body);
                                sendResponse(userResponse);
                            } else {
                                sendResponse(undefined, errorMessage);
                            }
                            return;
                        case "/api/v1/post/filtered":
                            if (authPayload) {
                                const postResponse = await EndpointsV1[
                                    "/api/v1/post/filtered"
                                ](req, req.body);
                                sendResponse(postResponse);
                            } else {
                                sendResponse(undefined, errorMessage);
                            }
                            return;
                        default:
                            res.send("bad api endpoint");
                            return;
                    }
                } catch (e) {
                    res.statusMessage = e.message;
                    res.status(400).send();
                }
            } else {
                res.statusMessage = "";
                res.status(400).send("bad api endpoint as obj");
                return;
            }
        } else {
            next();
        }
    });

    /**
     * @description logout user, if user is in session will be removed
     */
    app.get("/security/logout", async (req, res) => {
        if (req.session) {
            req.session.accessToken = null;
            req.session.user = null;
        }
        res.redirect("/security/login");
    });

    app.get("*", async (req, res) => {
        const userAccessToken = getUserAccessTokenFromSession(req);
        const user = getUserFromSession(req);
        let html;
        if (user && userAccessToken) {
            const pageSettings = getPageSettings(req, user);
            const appState = getDefaultAppState(
                userAccessToken,
                user,
                pageSettings
            );
            html = renderApplication(appState);
        } else {
            const appState = defaultAppState;
            html = renderApplication(appState);
        }
        res.send(html);
    });
    app.listen(3000);
    console.log("server started");
};
