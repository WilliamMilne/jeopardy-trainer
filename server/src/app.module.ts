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
import { Clue } from './clue/clue';
import { ClueResolver } from './clue/clue.resolver';
import { ClueService } from './clue/clue.service';
import { Response } from './response/response';
import { User } from './user/user';
import { UserResolver } from './user/user.resolver';
import { UserService } from './user/user.service';
import { ResponseResolver } from './response/response.resolver';
import { ResponseService } from './response/response.service';

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
      entities: [Category, Episode, Clue, Response, User],
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
  providers: [AppService, UserService, UserResolver, ClueService, ClueResolver, EpisodeService, CategoryService, EpisodeResolver, ResponseService, ResponseResolver], 
  // TODO: Figure out easy way to import all services and resolvers automatically
  // instead of having to add them each time you create a new one.
  // this nestjs code-first graphql example may help: https://github.com/nestjs/nest/blob/master/sample/23-graphql-code-first/src/recipes/recipes.service.ts
})
export class AppModule {}
//https://docs.nestjs.com/techniques/database