import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('comments')
export class CommentController {
    constructor() {} // injecter

    @Get()
    findOne() {}

    @Post()
    create() {}

    @Put(':id')
    update() {}

    @Delete(':id')
    remove() {}
}
