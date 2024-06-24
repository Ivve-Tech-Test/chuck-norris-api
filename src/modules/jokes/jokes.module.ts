import { Module } from '@nestjs/common';
import { JokesController } from './jokes.controller';
import { JokesService } from './jokes.service';
import { GraphQLModule } from '@nestjs/graphql';
import { JokesResolver } from './jokes.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
  ],
  controllers: [JokesController],
  providers: [JokesService, JokesResolver],
})
export class JokesModule {}
