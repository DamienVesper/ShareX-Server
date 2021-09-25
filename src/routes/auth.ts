import Express from 'express';

import passport from '../passport';

const router: Express.Router = Express.Router();

// Authentication Callback
router.get(`/discord`, passport.authenticate(`discord`));
router.get(`/discord/callback`, passport.authenticate(`discord`, {
    failureRedirect: `/`
}), (req: Express.Request, res: Express.Response) => res.redirect(`/dashboard`));

// Logout
router.get(`/logout`, (req: Express.Request, res: Express.Response) => {
    req.logout();
    res.redirect(`/`);
});

export default router;
