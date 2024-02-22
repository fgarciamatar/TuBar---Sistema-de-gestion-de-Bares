import { ProductsCategoryModel } from '../database/models';
import { ProductsCategoryProps } from '../interfaces';
import { AppError } from '../models';

class ProductsCategoryService {
  constructor() {}

  async findCategoriesForBar(id: number) {
    const category = await ProductsCategoryModel.findAll({
      where: {
        barId: id,
      },
    });
    return category;
  }

  async createCategoryForBar({ name, barId }: ProductsCategoryProps) {
    const category = await ProductsCategoryModel.create({
      name,
      barId,
    });
    return category;
  }
  async updateCategoryForBar(
    categoryId: number,
    { name, barId }: ProductsCategoryProps
  ) {
    const category = await ProductsCategoryModel.findOne({
      where: {
        id: categoryId,
        barId,
      },
    });
    if (!category)
      throw new AppError(
        'No se encontró ninguna categoria en el bar con el ID especificado.',
        404
      );
    category.update({ name });
    return category;
  }
  async removeCategoryForBar(categoryId: number, barId: number) {
    const category = await ProductsCategoryModel.findOne({
      where: {
        id: categoryId,
        barId,
      },
    });
    if (!category)
      throw new AppError(
        'No se encontró ninguna categoria en el bar con el ID especificado.',
        404
      );
    category.destroy();
    return category;
  }
}

export default ProductsCategoryService;
