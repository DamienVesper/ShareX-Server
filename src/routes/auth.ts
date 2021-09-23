import Express from 'express';

import passport from '../passport';

const router: Express.Router = Express.Router();

// Discord Authentication & Callback
router.get(`/discord`, passport.authenticate(`discord`));
router.get(`/discord/callback`, passport.authenticate(`discord`, {
    failureRedirect: `/`
}), (req: Express.Request, res: Express.Response) => res.redirect(`/dashboard`));

export default router;
