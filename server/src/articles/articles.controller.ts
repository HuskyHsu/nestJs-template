import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleEntity } from './entities/article.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

import { PoliciesGuard } from 'src/casl/policies/policies.guard';
import { CheckPolicies } from 'src/casl/policies/policies.decorator';
import {
  DeleteArticlePolicyHandler,
  ManageArticlePolicyHandler,
  ReadArticlePolicyHandler,
  UpdateArticlePolicyHandler,
} from 'src/casl/policies/articles';

@Controller('articles')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PoliciesGuard)
@ApiTags('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @ApiCreatedResponse({ type: ArticleEntity })
  create(@Body() createArticleDto: CreateArticleDto, @Request() req) {
    const { user } = req;
    createArticleDto.authorId = user.id;
    return this.articlesService.create(createArticleDto);
  }

  @Get()
  @CheckPolicies(new ReadArticlePolicyHandler())
  @ApiOkResponse({ type: ArticleEntity, isArray: true })
  findAll() {
    return this.articlesService.findAll();
  }

  @Get('drafts')
  @CheckPolicies(new ManageArticlePolicyHandler())
  @ApiOkResponse({ type: ArticleEntity, isArray: true })
  findDrafts() {
    return this.articlesService.findDrafts();
  }

  @Get(':id')
  @CheckPolicies(new ManageArticlePolicyHandler())
  @ApiOkResponse({ type: ArticleEntity })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.articlesService.findOne(+id);
  }

  @Patch(':id')
  @CheckPolicies(new UpdateArticlePolicyHandler())
  @ApiOkResponse({ type: ArticleEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    return this.articlesService.update(+id, updateArticleDto);
  }

  @Delete(':id')
  @CheckPolicies(new DeleteArticlePolicyHandler())
  @ApiOkResponse({ type: ArticleEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.articlesService.remove(+id);
  }
}
