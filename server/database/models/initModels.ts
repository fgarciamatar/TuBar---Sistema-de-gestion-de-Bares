import {
  BarModel,
  BillModel,
  OrderModel,
  OrdersDetailModel,
  ProfileModel,
  ProductsCategoryModel,
  ProductModel,
  TableModel,
} from './';

const initModels = () => {
  //relacion uno a muchos bar con profile
  BarModel.hasMany(ProfileModel);
  ProfileModel.belongsTo(BarModel);
  //-----------------------
  BillModel;
  OrderModel;
  OrdersDetailModel;
  ProductsCategoryModel;
  ProductModel;
  TableModel;
};

export default initModels;
