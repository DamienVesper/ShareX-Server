import * as Express from 'express';

import { Ban } from '../models/ban.model';

const banRouter: Express.Router = Express.Router();

banRouter.all(`*`, (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    void Ban.findOne({ IP: req.ip }).then(isBanned => {
        if (isBanned != null) res.status(403).send(`403 Forbidden`);
        else next();
    });
});

export default banRouter;
