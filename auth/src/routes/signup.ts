import { Router, Response, Request } from 'express';
import { body, validationResult } from 'express-validator';
import { User } from '../models/user';
import { RequestValidationException } from '../exceptions/RequestValidationException';

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

  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationException(errors.array());
    }

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log('Email in user');
      return res.send({});
    }

    const user = User.build({ email, password });

    await user.save();

    res.status(201).json({
      status: 'success',
      data: {
        user,
      },
    });
  }
);

export { router as signUpRoute };
