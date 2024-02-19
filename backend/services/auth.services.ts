import { AppError } from '../models';
import { compareEncrypt } from '../utils';
import BarService from './bar.services';

const barService = new BarService();
class AuthService {
  constructor() {}

  async checkBarCredentials(userName: string, password: string) {
    const bar = await barService.findBarByUserNameOr404(userName);
    const verifyPassword = compareEncrypt(password, bar.password);
    if (!verifyPassword) throw new AppError('Wrong Credentials', 401);
    return bar;
  }
}

export default AuthService;
