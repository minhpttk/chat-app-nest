import { Optional } from '@nestjs/common';
import { Category } from './schema/book.schema';
import { IsEnum, IsString, IsNumber } from 'class-validator';

export class CreateBookDto{
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsNumber()
    price: number;

    @IsString()
    author: string;

    @IsEnum(Category, { message: 'Giá trị Category không hợp lệ' })
    category: Category;
}

export class UpdateBookDto{
    @Optional()
    @IsString()
    title: string;

    @Optional()
    @IsString()
    description: string;

    @Optional()
    @IsNumber()
    price: number;

    @Optional()
    @IsString()
    author: string;

    @Optional()
    @IsEnum(Category, { message: 'Giá trị Category không hợp lệ' })
    category: Category;
}