import Express from 'express';

import uploadRouter from './api/upload';

const router: Express.Router = Express.Router();

router.use(`/upload`, uploadRouter);

export default router;
