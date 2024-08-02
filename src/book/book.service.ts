import {  Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schema/book.schema';
import { Model } from 'mongoose';
import { CreateBookDto, UpdateBookDto } from './book.dto';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class BookService {
    constructor(
        @InjectModel(Book.name)  
        private bookModule: Model<Book>,
    ){}

    
    async findAll() : Promise<Book[]>{
        const books = await this.bookModule.find()
        return books
    }

    async create( CreateBookDto: CreateBookDto) :Promise<CreateBookDto>{
        const res = await this.bookModule.create(CreateBookDto)
        return res
    }

    async update( id: string , UpdateBookDto: UpdateBookDto) :Promise<Book>{
        const book = await this.bookModule.findByIdAndUpdate(id, UpdateBookDto, {
            new: true, // Trả về tài liệu đã được cập nhật
            useFindAndModify: false, // Tắt phương thức findAndModify
          });
        if (!book) {
            throw new NotFoundException("Sách không tồn tại");
        }
      

        return book
    }

    async delete( id: string) :Promise<string>{
        const book = await this.bookModule.findByIdAndDelete(id);
        if (!book) {
            throw new NotFoundException("Sách không tồn tại");
        }
      

        return "Xoá sản phẩm thành công"
    }

    async findOne (id:string) :Promise<Book> {
        const book = await this.bookModule.findById(id);
        if (!book) {
            throw new NotFoundException("Sách không tồn tại");
        }
        return book
    }
}
