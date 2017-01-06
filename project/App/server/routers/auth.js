import getDefaultFavicon from 'helpers/default-favicon';
import getMarkup from 'helpers/get-markup';
import passport from 'passport';
import routeHandler from 'helpers/route-handler';
import routes from 'routers/auth';
import { Router } from 'express';

const authRouter = new Router();

function injectScript (req, res, next) {
    if (process.env.NODE_ENV === 'production') {
        res.locals.header.push({
            tag: 'link',
            props: {
                rel: 'stylesheet',
                type: 'text/css',
                href: '/assets/auth.css',
            },
        });
        res.locals.header.push({
            tag: 'link',
            props: {
                rel: 'stylesheet',
                type: 'text/css',
                href: '/assets/common.js.css',
            },
        });
    }
    res.locals.header.push(getDefaultFavicon(res));
    res.locals.footer.push({
        tag: 'script',
        props: {
            src: `${res.baseScriptsURL}/assets/auth.js`,
        },
    });
    next();
}

authRouter.get('/admin/login', (req, res, next) => {
    if (req.isAuthenticated()) {
        res.redirect('/admin');
    } else {
        routeHandler(routes, req, res, next);
    }
});

authRouter.get('/admin/logout', (req, res) => {
    req.logout();
    res.redirect('/admin/login');
});

authRouter.get(/^\/admin\/(register|forgotPwd)$/, (req, res, next) => {
    routeHandler(routes, req, res, next);
});

// Register | ForgotPwd
authRouter.get(/^\/admin\/(register|forgotPwd)$/, injectScript, async (req, res, next) => {
    res.status(200).send(getMarkup(req, res));
});

// Login
authRouter.get('/admin/login', injectScript, (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/admin');
    } else {
        res.status(200).send(getMarkup(req, res));
    }
});

authRouter.post('/admin/login', (req, res, next) => {
    passport.authenticate('local', (err, user) => {
        if (err) {
            res.status(500).send({
                error: 500,
                message: '服务器错误'
            });
        } else if (!user) {
            res.status(403).send({
                error: 403,
                message: '密码不正确'
            });
        } else {
            req.logIn(user, (error) => {
                if (error) {
                    res.status(500).send({
                        error: 500,
                        message: '登录失败'
                    });
                } else {
                    res.status(200).end();
                }
            });
        }
    })(req, res, next);
});

export default authRouter;
