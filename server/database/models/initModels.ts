import { BarModel, ProfileModel } from './';

const initModels = () => {
  //relacion uno a muchos bar con profile
  BarModel.hasMany(ProfileModel);
  ProfileModel.belongsTo(BarModel);
};

export default initModels;
