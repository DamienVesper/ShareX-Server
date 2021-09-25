import Express from 'express';

import passport from '../passport';

const router: Express.Router = Express.Router();

// Authentication
router.get(`/discord`, passport.authenticate(`discord`));

// Authentication Callback
router.get(`/discord/callback`, passport.authenticate(`discord`, {
    failureRedirect: `/`
}), (req: Express.Request, res: Express.Response) => res.redirect(`/dashboard`));

// Authentication Information
router.get(`/authenticated`, (req: Express.Request, res: Express.Response) => {
    req.isAuthenticated()
        ? res.jsonp(req.user)
        : res.status(403);
});

// Logout
router.get(`/logout`, (req: Express.Request, res: Express.Response) => {
    req.logout();
    res.redirect(`/`);
});

export default router;
