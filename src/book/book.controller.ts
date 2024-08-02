import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schema/book.schema';
import { CreateBookDto, UpdateBookDto } from './book.dto';

@Controller('book')
export class BookController {
    constructor(private  BookService: BookService){}

    @Get()
    async getAllBooks() :Promise<Book[]> {
        return this.BookService.findAll()
    }

    @Post()
    async CreateBook(@Body() CreateBookDto : CreateBookDto ) :Promise<Book>{
        return this.BookService.create(CreateBookDto)
    }

    @Put('/:id')
    async UpdateBook(@Param('id') id: string, @Body() UpdateBookDto:UpdateBookDto): Promise<Book>{
        return this.BookService.update(id, UpdateBookDto)
    }

    @Delete('/:id')
    async DeleteBook(@Param('id') id: string) :Promise<string>{
        return this.BookService.delete(id)
    }

    @Get('/:id')
    async GetOneBook(@Param('id') id: string) :Promise<Book>{
        return this.BookService.findOne(id)
    }
}
