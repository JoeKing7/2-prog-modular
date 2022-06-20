import {
  Controller,
  Param,
  Get,
  Post,
  Query,
  Put,
  Delete,
  Body,
  HttpStatus,
  HttpCode,
  Res,
  // ParseIntPipe
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

// import { Response } from 'express';
import { ProductsService } from 'src/modules/products/services/products.service';
import { ParseIntPipe } from '../../../common/parse-int.pipe';
import {
  CreateProductDto,
  UpdateProductDto,
} from 'src/modules/products/dtos/products.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {
    //atributo de la misma clase, inyectamos
  }
  //parametros query

  @Get()
  @ApiOperation({ summary: 'List of products' })
  getProducts(@Query() params: any) {
    // general form || specific form @Query('limit') limit: number ... || @Query('limit') limit = 100
    const { limit, offset } = params;
    // return {
    //   limit,
    //   offset
    // };

    return this.productService.findAll();
  }

  @Get('filter')
  getProductFilter() {
    return {
      msg: `I am a filter`,
    };
  }

  @Get(':id') //id -> params.id
  @HttpCode(HttpStatus.ACCEPTED) //response es de la forma de express.
  getProduct(@Param('id', ParseIntPipe) id: number) {
    // general form: @Param() params: any
    //@Res() response: Response //Express form
    // response.status(200).send({
    //   productId: id
    // })
    // return {
    //   productId: id
    // };
    return this.productService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    // return {
    //   msg: 'Create action',
    //   payload
    // };
    return this.productService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateProductDto) {
    //recibimos el parametro y luego el body a editar
    // return {
    //   id,
    //   payload
    // }
    return this.productService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.productService.delete(id);
  }
}
