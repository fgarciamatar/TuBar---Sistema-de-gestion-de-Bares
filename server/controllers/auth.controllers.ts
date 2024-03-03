import { AuthService, BarService, ProfileService } from '../services';
import { catchAsync, generateRandomPin } from '../utils';
import { tokenSign } from '../utils/jwt';

const authService = new AuthService();
const barService = new BarService();
const profileService = new ProfileService();

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
  const { barSession, profileSession } = res.locals;
  const barId = barSession ? barSession.id : profileSession.barId;
  const profile = await authService.checkProfileCredentials(
    +profileId,
    pinCode,
    barId
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
    status: true,
    bar: query,
    pin: pinCode,
  };
  res.status(201).json(result);
});

export { signUp, logIn, logInProfile };
