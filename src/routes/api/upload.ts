import Express from 'express';
import { UploadedFile } from 'express-fileupload';

import config from '../../../config/config';

import { Media } from '../../models/media.model';
import { User } from '../../models/user.model';

import * as path from 'path';

const router: Express.Router = Express.Router();

// File uploads.
router.post(`/files`, (req: Express.Request, res: Express.Response): void => {
    if ((req.files?.file) == null) {
        res.status(400);
        return;
    } else if ((req.query.key === undefined) && (req.body.key === undefined)) {
        res.status(403);
        return;
    }

    const authKey = (req.query.key as string);

    void User.findOne({ token: authKey }).then(user => {
        if ((user == null) || user.suspended) {
            res.status(403);
            return;
        }

        const file = (req.files?.file as UploadedFile);
        const media = new Media({ extension: path.extname(file.name) });
        const fileName = media.name + media.extension;

        void media.save().then(() => {
            void file.mv(path.resolve(`/var/www/sharex/i/`, fileName));

            res.status(200).jsonp({
                success: true,
                file: { url: `https://${config.domain}/i/${fileName}` }
            });
        });
    });
});

export default router;
