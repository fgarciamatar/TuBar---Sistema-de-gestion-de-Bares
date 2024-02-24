import { ProductModel, ProductsCategoryModel } from '../database/models';
import { ProductProps } from '../interfaces';
import { AppError } from '../models';
import ProductsCategoryService from './productsCategory.services';

const productsCategoryService = new ProductsCategoryService();
class ProductService {
  constructor() {}

  async findProductsForBar(barId: number) {
    const categories = await ProductsCategoryModel.findAll({
      where: {
        barId,
      },
      attributes: ['id'],
    });
    const categoryIds = categories.map(category => category.id);
    const products = await ProductModel.findAll({
      where: {
        productsCategoryId: categoryIds,
      },
    });
    return products;
  }

  async createProductForBar(
    barId: number,
    { name, description, price, productsCategoryId }: ProductProps
  ) {
    const category = await productsCategoryService.findCategoryForBar(
      barId,
      productsCategoryId
    );
    if (!category)
      throw new AppError('Esta categoria no existe en el bar.', 404);
    const product = await ProductModel.create({
      name,
      description,
      price,
      productsCategoryId,
    });
    return product;
  }

  async findProductForBarOr404(productId: number) {
    const product = await ProductModel.findOne({
      where: {
        id: productId,
      },
    });
    if (!product)
      throw new AppError(
        'No se encontró ningun producto en el bar con el ID especificado.',
        404
      );
    return product;
  }

  async updateProductForBar(
    productId: number,
    barId: number,
    { name, description, price }: ProductProps
  ) {
    const product = await this.findProductForBarOr404(productId);
    const findProductInCategory =
      await productsCategoryService.findCategoryForBar(
        barId,
        product.productsCategoryId
      );
    if (!findProductInCategory)
      throw new AppError(
        'No se encontró ningun producto en el bar con el ID especificado.',
        404
      );
    product.update({ name, description, price });
    return product;
  }

  async removeProductForBar(productId: number, barId: number) {
    const product = await this.findProductForBarOr404(productId);
    const findProductInCategory =
      await productsCategoryService.findCategoryForBar(
        barId,
        product.productsCategoryId
      );
    if (!findProductInCategory)
      throw new AppError(
        'No se encontró ningun producto en el bar con el ID especificado.',
        404
      );
    product.destroy();
    return product;
  }
}

export default ProductService;
