import { ProfileService } from '../services';
import { catchAsync } from '../utils';

const profileService = new ProfileService();
const getProfiles = catchAsync(async (req, res, next) => {
  const { barSession } = res.locals;
  const profiles = await profileService.findProfiles(barSession.id);
  res.status(200).json(profiles);
});

export { getProfiles };
