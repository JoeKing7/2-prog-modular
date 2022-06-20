import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from 'src/modules/products/entities/product.entity';
import {
  CreateProductDto,
  UpdateProductDto,
} from 'src/modules/products/dtos/products.dto';

@Injectable()
export class ProductsService {
  private counterId = 1;
  private products: Product[] = [
    {
      id: 1,
      name: 'Product A',
      desc: 'Description A',
      price: 100,
      stock: 10,
      image: 'image1.jpg',
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const PRODUCT = this.products.find((item) => item.id === id);
    if (!PRODUCT) {
      throw new NotFoundException(`Product ${id} is not found`);
    }
    return PRODUCT;
  }

  create(payload: CreateProductDto) {
    this.counterId++;
    const newProduct = {
      id: this.counterId,
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, payload: UpdateProductDto) {
    //any por el momento
    const PRODUCT = this.findOne(id);
    console.log(this.findOne(id));

    if (PRODUCT) {
      const INDEX = this.products.findIndex((i) => i.id === id);
      this.products[INDEX] = {
        ...PRODUCT,
        ...payload,
      };
      return this.products[INDEX];
    }
    throw new NotFoundException(`Product ${id} is not found`);
  }

  delete(id: number) {
    const INDEX = this.products.findIndex((i) => i.id == id);

    if (INDEX === -1) {
      throw new NotFoundException(`Product ${id} is not found`);
    }
    this.products.splice(INDEX, 1);
    return this.products;
  }
}
