import { BarModel, ProfileModel } from '../database/models';
import { BarProps } from '../interfaces';
import { encrypt, generateRandomPin } from '../utils';
import { AppError } from '../models';

class BarService {
  constructor() {}
  async createAuthBar(
    { email, name, password, userName }: BarProps,
    pinCode: string
  ) {
    const hashedPassword = await encrypt(password);
    const newAuthBar = await BarModel.create({
      email,
      name,
      password: hashedPassword,
      userName,
    });

    const hashedPinCode = await encrypt(pinCode);
    await ProfileModel.create({
      name: userName + '-ADMIN',
      role: 'ADMIN',
      pinCode: hashedPinCode,
      barId: newAuthBar.id,
    });
    return newAuthBar;
  }
  async findBarById(id: number) {
    const bar = await BarModel.findByPk(id);
    return bar;
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
