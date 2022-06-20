import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule, HttpService } from '@nestjs/axios';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './modules/global/database/database.module';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { lastValueFrom, map } from 'rxjs';
import { enviroments } from './enviroments';
import config from './config';

process.env.NODE_ENV = 'dev';
//Reaunadar en el video 11
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        API_KEY: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
        PORT: Joi.number().required(),
      }),
    }),
    HttpModule,
    DatabaseModule,
    UsersModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'TASKS',
      useFactory: async (http: HttpService) => {
        const tasks = await lastValueFrom(
          http.get('https://jsonplaceholder.typicode.com/todos').pipe(
            map((resp) => {
              return resp.data;
            }),
          ),
        );
        return tasks;
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
