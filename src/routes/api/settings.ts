import Express from 'express';

import * as fs from 'fs';
import * as path from 'path';

const router: Express.Router = Express.Router();

// User configs.
router.get(`/config`, (req: Express.Request, res: Express.Response): void => {
    if (!req.isAuthenticated()) {
        res.status(403);
        return;
    }

    // eslint-disable-next-line
    const discordID = (<any>req.user).discordID;
    const fileLocation = path.resolve(__dirname, `../../../configs/${discordID}.sxcu`);

    if (!fs.existsSync(fileLocation)) {
        res.status(500);
        return;
    }

    res.status(200).download(fileLocation);
});

export default router;
