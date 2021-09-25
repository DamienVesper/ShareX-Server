import Express from 'express';
import { UploadedFile } from 'express-fileupload';

import config from '../../../config/config';

import { Media } from '../../models/media.model';
import { User } from '../../models/user.model';

import * as path from 'path';

const router: Express.Router = Express.Router();

// File uploads.
router.post(`/files`, async (req: Express.Request, res: Express.Response): Promise<unknown> => {
    if (!req.files?.file) return res.status(400);
    else if (!req.query.key && !req.body.key) return res.status(403);

    const authKey = (req.query.key as string);

    const user = await User.findOne({ token: authKey });
    if (!user || user.suspended) return res.status(403);

    const file = (req.files.file as UploadedFile);

    const media = new Media({
        extension: path.extname(file.name)
    });

    media.save();
    file.mv(path.resolve(`/var/www/sharex/i/`, media.name + media.extension));

    res.status(200).jsonp({
        success: true,
        file: {
            url: `https://${config.domain}/i/${media.name + media.extension}`
        }
    });
});

export default router;
