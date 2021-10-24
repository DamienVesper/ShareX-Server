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
    const form = new IncomingForm();
    form.parse(req, (err, fields: { key: string }, files) => {
        if (err !== undefined) throw err;
        if (files === undefined) {
            res.status(400);
            log(`red`, `there is no file`);
            return;
        }

        const authKey = fields.key;

        if (fields.key === undefined) {
            res.status(400);
            log(`red`, `there are no keys!`);
            return;
        }

        void User.findOne({ token: authKey }).then(user => {
            if ((user == null) || user.suspended) {
                res.status(403);
                return;
            }

            const file = ((files as unknown) as File);
            const media = new Media({ extension: path.extname(file.name) });
            const fileName = media.name + media.extension;

            console.log(fileName);
            console.log(file.name);

            void media.save().then(() => {
                void fs.rename(path.basename(fileName), path.resolve(`/var/www/sharex/i/`, fileName), () => {
                    res.status(200).jsonp({
                        success: true,
                        file: { url: `https://${config.domain}/i/${fileName}` }
                    });
                });
            });
        });
    });
});

export default router;
