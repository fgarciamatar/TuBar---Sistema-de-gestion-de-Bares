import { NextFunction, Request, Response } from 'express';
import { AuthService, BarService, ProfileService } from '../services';
import { catchAsync, generateRandomPin } from '../utils';
import { AppError } from '../models';
import { tokenSign, verifyToken } from '../utils/jwt';
import { BarModel } from '../database/models';
import { TokenType } from '../interfaces';

const authService = new AuthService();
const barService = new BarService();
const profileService = new ProfileService();

const protect = (auths: TokenType[]) =>
  catchAsync(async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer'))
      return next(
        new AppError(
          '¡Usted no se ha identificado! por favor inicie sesión para obtener acceso.',
          401
        )
      );
    const token = authorization.split(' ')[1];
    const { id, tokenType } = verifyToken(token);
    console.log({ id });
    if (!auths.includes(tokenType)) {
      throw new AppError(`Usted no tiene acceso a esta ruta.`, 401);
    }
    if (tokenType === 'barSession') {
      const bar = await barService.findBarById(id);
      if (!bar)
        return next(
          new AppError(
            'El propietario de este token ya no está disponible.',
            401
          )
        );
      res.locals.barSession = bar;
    }
    if (tokenType === 'profileSession') {
      const profile = await profileService.findProfileById(id);
      if (!profile)
        return next(
          new AppError(
            'El propietario de este token ya no está disponible.',
            401
          )
        );
      res.locals.profileSession = profile;
    }
    next();
  });

const logIn = catchAsync(async (req, res, next) => {
  const { userName, password } = req.body;
  const bar = await authService.checkBarCredentials(userName, password);
  const token = tokenSign(bar.id, 'barSession');
  res.status(200).json({
    status: true,
    token,
    bar,
  });
});
const logInProfile = catchAsync(async (req, res, next) => {
  const { pinCode, profileId } = req.body;
  const { barSession } = res.locals;
  const profile = await authService.checkProfileCredentials(
    +profileId,
    pinCode,
    barSession.id
  );
  const token = tokenSign(profile.id, 'profileSession');
  res.status(200).json({
    status: true,
    token,
    profile,
  });
});

const signUp = catchAsync(async (req, res, next) => {
  const { body } = req;
  const pinCode = generateRandomPin(6);

  const query = await barService.createAuthBar(body, pinCode);
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
  const result = {
    bar: query,
    pin: pinCode,
  };
  console.log('query', query);
  res.status(201).json(result);
});

export { signUp, logIn, protect, logInProfile };
