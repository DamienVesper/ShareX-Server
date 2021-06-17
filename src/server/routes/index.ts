import Express from 'express';
const router: Express.Router = Express.Router();

router.get(`/`, async (req: Express.Request, res: Express.Response) => res.render(`index.ejs`));

export default router;
