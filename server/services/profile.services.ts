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
}

export default ProfileService;
