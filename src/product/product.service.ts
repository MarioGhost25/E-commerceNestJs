import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {

  private readonly logger = new Logger('ProductService');

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>, // Replace 'any' with your actual product entity type
  ) { }


  async create(createProductDto: CreateProductDto) {

    try {

      const product = this.productRepository.create(createProductDto);
      await this.productRepository.save(product);

      return product;

    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  findAll() {
    return this.productRepository.find({});
  }
    

  async findOne(id: string ) {
    const product = await this.productRepository.findOneBy({ id });

    if (!product) {
      throw new BadRequestException(`Product with id ${id} not found`);
    }

    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async remove(id: string) {

    const product = await this.findOne( id );
    await this.productRepository.remove( product );

  }

  private handleDBExceptions(error: any): never{

    if (error.code === '23505')
      throw new BadRequestException(error.detail);

    this.logger.error(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');

  }
}
