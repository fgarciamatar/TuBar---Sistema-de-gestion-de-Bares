import { AppError } from '../models';
import { ProductsCategoryService } from '../services';
import { catchAsync } from '../utils';

const productsCategoryService = new ProductsCategoryService();

const isExistCategoryInBar = catchAsync(async (req, res, next) => {
  const { profileSession } = res.locals;
  const { productsCategoryId } = req.body;
  const category = await productsCategoryService.findCategoryForBar(
    profileSession.barId,
    productsCategoryId,
    
  );
  if (!category) throw new AppError('Esta categoria no existe en el bar.', 404);
  next();
});

export { isExistCategoryInBar };
