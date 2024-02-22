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
  //relacion uno a muchos bar con mesas
  BarModel.hasMany(TableModel);
  TableModel.belongsTo(BarModel);
  //-----------------------
  //relacion uno a muchos bar con categorias
  BarModel.hasMany(ProductsCategoryModel);
  ProductsCategoryModel.belongsTo(BarModel);
  //-----------------------
  //relacion uno a muchos categorias con productos
  ProductsCategoryModel.hasMany(ProductModel);
  ProductModel.belongsTo(ProductsCategoryModel);
  //-----------------------
  BillModel;
  OrderModel;
  OrdersDetailModel;
};

export default initModels;
