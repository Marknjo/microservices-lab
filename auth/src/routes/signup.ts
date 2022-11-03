import { Router, Response, Request } from 'express';
import { body, validationResult } from 'express-validator';

const router = Router();

router.post(
  `/signup`,
  body('email')
    .isEmail()
    .withMessage('Email must be valid')
    .normalizeEmail(),
  body('password')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('Password must be between 4 and 20 characters long'),

  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send(errors.array());
    }

    const { email, password } = req.body as {
      email: string;
      password: string;
    };

    if (!email || typeof email !== 'string') {
      res.status(400).send('Provide a valid email');
    }

    console.table({ email, password });

    res.status(201).json({
      status: 'success',
      message: 'Processing signup',
    });
  }
);

export { router as signUpRoute };
