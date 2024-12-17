import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ArticleEntity } from './entities/article.entity';
import { ArticlesService } from './articles.service';

@Controller('articles')
@ApiTags('articles')
export class ArticlesController {
  constructor(private readonly articleService: ArticlesService) {}

  @Post()
  @ApiCreatedResponse({type: ArticleEntity})
  create(@Body() createArticleDto: CreateArticleDto) {
   return this.articleService.create(createArticleDto)
  }

  @Get()
  @ApiOkResponse({type: ArticleEntity})
  findAll() {
    return this.articleService.findAll()
  }

  @Get(':id')
  @ApiOkResponse({type: ArticleEntity})
  findOne(@Param('id') id: string) {
      return this.articleService.findOne(+id)
  }

  @Patch(':id')
  @ApiOkResponse({type: ArticleEntity})
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
     return this.articleService.update(+id,updateArticleDto)
  }

  @Delete(':id')
  @ApiOkResponse({type: ArticleEntity})
  remove(@Param('id') id: string) {
    return this.articleService.remove(+id)
  }
}
