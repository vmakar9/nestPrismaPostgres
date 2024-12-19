import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpStatus } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ArticleEntity } from './entities/article.entity';
import { ArticlesService } from './articles.service';
import { handleServiceError } from '../utils/error-handler';

@Controller('articles')
@ApiTags('articles')
export class ArticlesController {
  constructor(private readonly articleService: ArticlesService) {}

  @Post()
  @ApiCreatedResponse({ type: ArticleEntity })
  async create(@Body() createArticleDto: CreateArticleDto) {
    try {
      return await this.articleService.create(createArticleDto);
    } catch (error) {
      handleServiceError(error, HttpStatus.BAD_REQUEST, 'Error creating the article.');
    }
  }

  @Get()
  @ApiOkResponse({ type: [ArticleEntity] })
  async findAll() {
    try {
      return await this.articleService.findAll();
    } catch (error) {
      handleServiceError(error, HttpStatus.INTERNAL_SERVER_ERROR, 'Error fetching articles.');
    }
  }

  @Get(':id')
  @ApiOkResponse({ type: ArticleEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.articleService.findOne(id);
    } catch (error) {
      handleServiceError(error, HttpStatus.NOT_FOUND, `Article with ID ${id} not found.`);
    }
  }

  @Patch(':id')
  @ApiOkResponse({ type: ArticleEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    try {
      return await this.articleService.update(id, updateArticleDto);
    } catch (error) {
      handleServiceError(error, HttpStatus.BAD_REQUEST, `Error updating the article with ID ${id}.`);
    }
  }

  @Delete(':id')
  @ApiOkResponse({ type: ArticleEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.articleService.remove(id);
    } catch (error) {
      handleServiceError(error, HttpStatus.NOT_FOUND, `Error deleting the article with ID ${id}.`);
    }
  }
}
