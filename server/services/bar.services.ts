import { BarModel, ProfileModel } from '../database/models';
import { BarProps } from '../interfaces';
import { encrypt, generateRandomPin } from '../utils';
import { AppError } from '../models';
import db from '../database/db';

class BarService {
  constructor() {}
  async createAuthBar(
    { email, name, password, userName }: BarProps,
    pinCode: string
  ) {
    const t = await db.transaction();
    const hashedPassword = await encrypt(password);
    const newAuthBar = await BarModel.create(
      {
        email,
        name,
        password: hashedPassword,
        userName,
      },
      { transaction: t }
    );

    const hashedPinCode = await encrypt(pinCode);
    await ProfileModel.create(
      {
        name: userName + '-ADMIN',
        role: 'ADMIN',
        pinCode: hashedPinCode,
        barId: newAuthBar.id,
      },
      { transaction: t }
    );
    await t.commit();
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
  async removeBar(barId: number) {

    const bar = await BarModel.findByPk(barId);

    if (!bar)
      throw new AppError(
        'No se encontró ningún bar con el ID especificado.',
        404
      );
    bar.destroy();
    return bar;
  }
  async updateBar(
    barId: number,
    { email, name, password }: BarProps,
  ) {
    const bar = await BarModel.findByPk(barId);
    if (!bar)
      throw new AppError(
        'No se encontró ningún bar con el ID especificado.',
        404
      );
    bar.update({ email, name, password });
    return bar;
  }

}

export default BarService;
