import { Router } from 'express';
import { logIn, signUp } from '../controllers';

const router = Router();

router.post('/login', logIn);

router.post('/sign-up', signUp);

export default router;
