import Express from 'express';

import passport from '../passport';

const router: Express.Router = Express.Router();

// Authentication
router.get(`/discord`, passport.authenticate(`discord`, { failureRedirect: `/` }), (req: Express.Request, res: Express.Response) => res.redirect(`/dashboard`));

// Authentication Information
router.get(`/authenticated`, (req: Express.Request, res: Express.Response) => {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    req.isAuthenticated()
        ? res.status(200).jsonp({
            authenticated: true,

            discordID: (req.user as any).discordID,
            username: (req.user as any).username,
            email: (req.user as any).email,
            avatar: (req.user as any).avatar,

            permissions: (req.user as any).permissions
        })
        : res.status(403).jsonp({
            authenticated: false
        });
    /* eslint-enable @typescript-eslint/no-explicit-any */
});

// Logout
router.get(`/logout`, (req: Express.Request, res: Express.Response) => {
    req.logout();
    res.redirect(`/`);
});

export default router;
