import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'; //
import { CreateUserDto, UpdateUserDto } from 'src/modules/users/dtos/users.dto';
import { Order } from 'src/modules/users/entities/order.entity';
import { User } from 'src/modules/users/entities/users.entity';
import { ProductsService } from '../../products/services/products.service';

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    private configService: ConfigService,
  ) {}

  private counterId = 1;
  private users: User[] = [
    {
      id: 1,
      name: 'Jhon Doe',
      mail: 'jdoe@mail.com',
      pass: '12345',
    },
  ];

  findAll() {
    console.log(this.configService.get('API_KEY'));
    return this.users;
  }

  findOne(id: number) {
    const USER = this.users.find((value) => value.id === id);
    if (!USER) {
      throw new NotFoundException(`User with Id ${id} is not found!!`);
    }
    return USER;
  }

  create(payload: CreateUserDto) {
    this.counterId++;
    const NEW_PRODUCT = {
      id: this.counterId,
      ...payload,
    };
    this.users.push(NEW_PRODUCT);
    return NEW_PRODUCT;
  }

  update(id: number, payload: UpdateUserDto) {
    const USER = this.findOne(id);
    if (!USER) {
      throw new NotFoundException(`User with ${id} is not found!`);
    }
    const INDEX = this.users.findIndex((item) => item.id === id);
    this.users[INDEX] = {
      ...USER,
      ...payload,
    };
    return this.users[INDEX];
  }

  getOrdersByUser(id: number): Order {
    const user = this.findOne(id);
    return {
      date: new Date(),
      user,
      products: this.productsService.findAll(),
    };
  }
}
