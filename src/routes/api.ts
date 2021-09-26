import Express from 'express';

import uploadRouter from './api/upload';
import settingsRouter from './api/settings';

const router: Express.Router = Express.Router();

router.use(`/upload`, uploadRouter);
router.use(`/settings`, settingsRouter);

export default router;
