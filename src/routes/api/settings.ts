import Express from 'express';

import * as fs from 'fs';

const router: Express.Router = Express.Router();

// User configs.
router.get(`/config`, (req: Express.Request, res: Express.Response): void => {
    if (!req.isAuthenticated()) {
        res.status(403).send(`403 Forbidden`);
        return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const discordID = (req.user as any).discordID;
    const fileLocation = `/var/www/sharex/configs/${(discordID as string)}.sxcu`;

    if (!fs.existsSync(fileLocation)) {
        res.status(500).send(`500 Internal Server Error`);
        return;
    }

    res.status(200).download(fileLocation);
});

export default router;
