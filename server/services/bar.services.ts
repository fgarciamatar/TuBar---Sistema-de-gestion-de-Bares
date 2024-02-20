import { BarModel } from '../database/models';
import { BarProps } from '../interfaces';
import { encrypt } from '../utils';
import { AppError } from '../models';

class BarService {
  constructor() {}
  async createAuthBar({ email, name, password, userName }: BarProps) {
    const hashedPassword = await encrypt(password);
    const newAuthBar = await BarModel.create({
      email,
      name,
      password: hashedPassword,
      userName,
    });
    return newAuthBar;
  }
  async findBarByUserNameOr404(userName: string) {
    if (!userName)
      throw new AppError(
        'Credenciales incorrectas. Verifique su usuario y contraseña',
        401
      );
    const bar = await BarModel.findOne({ where: { userName } });
    if (!bar)
      throw new AppError(
        'Credenciales incorrectas. Verifique su usuario y contraseña',
        401
      );
    return bar;
  }
}

export default BarService;
