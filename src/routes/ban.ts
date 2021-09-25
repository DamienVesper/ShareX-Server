import * as Express from 'express';

import { Ban } from '../models/ban.model';

const banRouter: Express.Router = Express.Router();

banRouter.all(`*`, async (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    const isBanned = await Ban.findOne({ IP: req.ip });

    if (isBanned) res.status(403).send(`403 Forbidden`);
    else next();
});

export default banRouter;
