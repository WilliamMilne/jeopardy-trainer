import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Category } from './entities/category';
import { Episode } from './entities/episode';
import { Prompt } from './entities/prompt';
import { Response } from './entities/response';
import { User } from './entities/user';
import { TestResolver } from './graphql/testResolver';

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
  providers: [AppService, TestResolver],
})
export class AppModule {}
//https://docs.nestjs.com/techniques/database