import Express from 'express';
import { IncomingForm } from 'formidable';

import * as path from 'path';
import * as fs from 'fs';

import config from '../../../config/config';

import { Media } from '../../models/media.model';
import { User } from '../../models/user.model';

import log from '../../utils/log';

const router: Express.Router = Express.Router();

// File uploads.
router.post(`/files`, (req: Express.Request, res: Express.Response): void => {
    console.log(`got here`);
    const form = new IncomingForm();
    console.log(`got here 2`);
    form.parse(req, (err, fields: { key: string }, files) => {
        console.log(`got here 3`);
        if (err !== undefined && err !== null) {
            console.log(`got here 4`);
            console.log(err);
            throw err;
        }

        if (files === undefined) {
            console.log(`got here 5`);
            res.status(400);
            log(`red`, `there is no file`);
            return;
        }

        const authKey = fields.key;

        if (fields.key === undefined) {
            console.log(`got here 6`);
            res.status(400);
            log(`red`, `there are no keys!`);
            return;
        }

        console.log(`got here 7`);
        void User.findOne({ token: authKey }).then(user => {
            console.log(`got here 8`);
            if ((user == null) || user.suspended) {
                console.log(`got here 9`);
                res.status(403);
                return;
            }

            console.log(`got here 10`);
            const file = ((files as unknown) as { fdata: File });

            const media = new Media({
                name: path.parse(file.fdata.name).name,
                extension: path.parse(file.fdata.name).ext,

                owner: user.discordID
            });
            const fileName = media.name + media.extension;

            console.log(`got here 11`);

            void media.save().then(() => {
                console.log(`got here 12`);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                void fs.rename((file.fdata as any).path, path.resolve(`/var/www/sharex/i`, fileName), () => {
                    console.log(`got here 13`);
                    res.status(200).send(`https://${config.domain}/i/${fileName}`);
                    console.log(`got here 14`);
                });
            });
        });
    });
});

export default router;
