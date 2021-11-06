import Express from 'express';
import { IncomingForm } from 'formidable';

import * as path from 'path';
import * as fs from 'fs';

import config from '../../../config/config';

import { Media } from '../../models/media.model';
import { User } from '../../models/user.model';

import randomString from '../../utils/randomString';

const router: Express.Router = Express.Router();

// File uploads.
router.post(`/files`, (req: Express.Request, res: Express.Response): void => {
    const form = new IncomingForm();
    form.parse(req, (err, fields: { key: string }, files) => {
        if (err !== undefined && err !== null) {
            throw err;
        }

        if (files === undefined) {
            res.status(400).send(`400 Bad Request`);
            return;
        }

        const authKey = fields.key;

        if (fields.key === undefined) {
            res.status(400).send(`400 Bad Request`);
            return;
        }

        void User.findOne({ token: authKey }).then(user => {
            if ((user == null) || user.suspended) {
                res.status(403).send(`403 Forbidden`);
                return;
            }

            const file = ((files as unknown) as { fdata: File });

            const media = new Media({
                name: randomString(5),
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                extension: path.parse((file.fdata as any).originalFilename).ext,
                owner: user.discordID
            });

            const fileName = media.name + media.extension;
            void media.save().then(() => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                void fs.rename((file.fdata as any).filepath, path.resolve(`/var/www/ShareX/i`, fileName), () => {
                    res.status(200).send(`https://${config.domain}/i/${fileName}`);
                });
            });
        });
    });
});

export default router;
