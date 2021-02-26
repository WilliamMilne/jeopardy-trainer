import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Category } from './category/category';
import { CategoryService } from './category/category.service';
import { Episode } from './episode/episode';
import { EpisodeResolver } from './episode/episode.resolver';
import { EpisodeService } from './episode/episode.service';
import { Prompt } from './prompt/prompt';
import { PromptResolver } from './prompt/prompt.resolver';
import { PromptService } from './prompt/prompt.service';
import { Response } from './response/response';
import { User } from './user/user';
import { UserResolver } from './user/user.resolver';
import { UserService } from './user/user.service';

require('dotenv').config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.DBUSER,
      password: process.env.DBPASS,
      database: process.env.DBNAME,
      entities: [Category, Episode, Prompt, Response, User],
      synchronize: true,
      autoLoadEntities: true
    }),
    GraphQLModule.forRoot({
      debug: false,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, UserService, UserResolver, PromptService, PromptResolver, EpisodeService, CategoryService, EpisodeResolver], 
  // TODO: Figure out easy way to import all services and resolvers automatically
  // instead of having to add them each time you create a new one.
  // this nestjs code-first graphql example may help: https://github.com/nestjs/nest/blob/master/sample/23-graphql-code-first/src/recipes/recipes.service.ts
})
export class AppModule {}
//https://docs.nestjs.com/techniques/database