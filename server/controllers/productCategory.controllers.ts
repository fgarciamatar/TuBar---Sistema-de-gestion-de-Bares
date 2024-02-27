import { ProductCategoryService } from '../services';
import { catchAsync } from '../utils';

const productsCategoryService = new ProductCategoryService();

const getProductsCategoriesForBar = catchAsync(async (req, res, next) => {
  const { profileSession } = res.locals;
  const categories = await productsCategoryService.findCategoriesForBar(
    profileSession.barId
  );
  res.status(200).json({ status: true, categories });
});

const createProductCategoryForBar = catchAsync(async (req, res, next) => {
  const { body } = req;
  const { profileSession } = res.locals;
  const data = { ...body, barId: profileSession.barId };
  const category = await productsCategoryService.createCategoryForBar(data);
  res.status(200).json({ status: true, category });
});

const deleteProductCategoryForBar = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { profileSession } = res.locals;
  await productsCategoryService.removeCategoryForBar(+id, profileSession.barId);
  res
    .status(204)
    .json({ status: true, msg: 'Categoria eliminado exitosamente.' });
});
const editProductCategoryForBar = catchAsync(async (req, res, next) => {
  const { body, params } = req;
  const { profileSession } = res.locals;
  const { id } = params;
  const data = { ...body, barId: profileSession.barId };
  const category = await productsCategoryService.updateCategoryForBar(
    +id,
    data
  );
  res.status(200).json({ status: true, category });
});

export {
  getProductsCategoriesForBar,
  createProductCategoryForBar,
  deleteProductCategoryForBar,
  editProductCategoryForBar,
};
