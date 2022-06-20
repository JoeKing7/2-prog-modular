import { Module, Global } from '@nestjs/common';

const DEV_KEY = '123dev'; //Para mejor uso de esto es crear el archivo .env y usar @nestjs/config para usar las .env en la api
const PROD_KEY = '0293prod';

@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV == 'prod' ? PROD_KEY : DEV_KEY,
    },
  ],
  exports: ['API_KEY'],
})
export class DatabaseModule {}
