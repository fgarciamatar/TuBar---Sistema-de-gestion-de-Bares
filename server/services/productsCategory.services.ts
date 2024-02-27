import { ProductModel, ProductsCategoryModel } from '../database/models';
import { ProductsCategoryProps } from '../interfaces';
import { AppError } from '../models';

class ProductsCategoryService {
  constructor() {}

  async findCategoriesForBar(barId: number) {
    const category = await ProductsCategoryModel.findAll({
      where: {
        barId,
      },
      include: {
        model: ProductModel,
      },
    });
    return category;
  }

  async findCategoryForBar(barId: number, productsCategoryId: number) {
    if (!productsCategoryId) throw new AppError('Verifique sus datos.', 401);
    const category = await ProductsCategoryModel.findOne({
      where: {
        barId,
        id: productsCategoryId,
      },
    });
    return category;
  }

  async createCategoryForBar({ name, description, barId }: ProductsCategoryProps) {
    const category = await ProductsCategoryModel.create({
      name,
      description,
      barId,
    });
    return category;
  }
  async updateCategoryForBar(
    categoryId: number,
    { name, description, barId }: ProductsCategoryProps
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
    category.update({ name, description });
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
