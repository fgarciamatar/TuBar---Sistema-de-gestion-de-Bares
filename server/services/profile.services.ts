import { ProfileModel } from '../database/models';
import { AppError } from '../models';
import { compareEncrypt } from '../utils';

class ProfileService {
  constructor() {}

  async findProfiles(id: number) {
    const profiles = await ProfileModel.findAll({
      where: {
        barId: id,
      },
    });
    return profiles;
  }
  async findProfileById(id: number) {
    const profile = await ProfileModel.findByPk(id);
    return profile;
  }
  async findProfileByIdAndBarIdOr404(profileId: number, barId: number) {
    if (!profileId || !barId)
      throw new AppError('Credenciales incorrectas. Verifique sus datos.', 401);
    const profile = await ProfileModel.findOne({
      where: {
        id: profileId,
        barId,
      },
    });
    console.log({ profile: profile?.get() });
    if (!profile)
      throw new AppError('Credenciales incorrectas. Verifique sus datos.', 401);
    return profile;
  }
}

export default ProfileService;
