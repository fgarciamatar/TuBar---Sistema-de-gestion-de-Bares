import { NextFunction, Request, Response } from 'express';
import { AuthService, BarService } from '../services';
import { catchAsync } from '../utils';
import { AppError } from '../models';
import { tokenSign, verifyToken } from '../utils/jwt';
import { BarModel } from '../database/models';

const authService = new AuthService();
const barService = new BarService();

const protect = catchAsync(async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer'))
    return next(
      new AppError('You are not logged in!  please log in to get access', 401)
    );
  const token = authorization.split(' ')[1];
  const decoded = verifyToken(token);
  const bar = await BarModel.findOne({
    where: {
      id: decoded.id,
    },
  });
  if (!bar)
    return next(
      new AppError('The owner of this token it not longer available', 401)
    );
  res.locals.sessionBar = bar;
  next();
});

const logIn = catchAsync(async (req, res, next) => {
  const { userName, password } = req.body;
  const bar = await authService.checkBarCredentials(userName, password);
  const token = tokenSign(bar.id);
  res.status(200).json({
    status: true,
    token,
    bar,
  });
});

const signUp = catchAsync(async (req, res, next) => {
  const { body } = req;
  // throw new AppError('No se pudo editar el projecto', 400);

  const query = await barService.createAuthBar(body);
  // try {
  //   await sender.sendMail({
  //     from: process.env.MAIL_SEND,
  //     to: user.email,
  //     subject: `Success SignUp! ${user.firstName} `,
  //     html: `<h1>Welcome to: ${process.env.DOMAIN}`,
  //     text: 'Welcome Again!',
  //   })
  // } catch (error) {
  //   errors.push({errorName:'Error Sending Email', message:'Something went wrong with the Sender Email'})
  // }
  res.status(201).json(query);
});

export { signUp, logIn, protect };
