import {
  BarModel,
  ProfileModel,
  ProductModel,
  TableModel,
  ProductCategoryModel,
  BillOrderModel,
  OrderDetailModel,
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
  BarModel.hasMany(ProductCategoryModel);
  ProductCategoryModel.belongsTo(BarModel);
  //-----------------------
  //relacion uno a muchos categorias con productos
  ProductCategoryModel.hasMany(ProductModel);
  ProductModel.belongsTo(ProductCategoryModel);
  //-----------------------
  // relacion uno a muchos mesas con facturas
  TableModel.hasMany(BillOrderModel);
  BillOrderModel.belongsTo(TableModel);
  //-----------------------
  //relacion uno a muchos perfiles con facturas
  ProfileModel.hasMany(BillOrderModel);
  BillOrderModel.belongsTo(ProfileModel);
  //-----------------------
  //relacion uno a muchos facturas con ordenes
  BillOrderModel.hasMany(OrderDetailModel);
  OrderDetailModel.belongsTo(BillOrderModel);
  //-----------------------
  //relacion uno a uno facturas con ordenes
  ProductModel.hasOne(OrderDetailModel);
  OrderDetailModel.belongsTo(ProductModel);
  //-----------------------
};

export default initModels;
