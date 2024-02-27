import { AppError } from '../models';
import { ProductCategoryService } from '../services';
import { catchAsync } from '../utils';

const productsCategoryService = new ProductCategoryService();

const isExistCategoryInBar = catchAsync(async (req, res, next) => {
  const { profileSession } = res.locals;
  const { productCategoryId } = req.body;
  const category = await productsCategoryService.findCategoryForBar(
    profileSession.barId,
    productCategoryId
  );
  if (!category) throw new AppError('Esta categoria no existe en el bar.', 404);
  next();
});

export { isExistCategoryInBar };
