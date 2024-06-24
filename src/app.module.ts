import { Module } from '@nestjs/common';
import { JokesController } from './modules/jokes/jokes.controller';
import { JokesService } from './modules/jokes/jokes.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { JokesResolver } from './modules/jokes/jokes.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
  ],
  controllers: [JokesController],
  providers: [JokesService, JokesResolver],
})
export class AppModule {}
