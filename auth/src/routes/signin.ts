import { Router, Response, Request } from 'express';

const router = Router();

router.post(`/signin`, (req: Request, res: Response) => {
  res.status(500).json('Route not implemented');
});

export { router as signInRoute };
