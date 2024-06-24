import { Resolver, Query, Args } from '@nestjs/graphql';
import { JokesService } from './jokes.service';

@Resolver()
export class JokesResolver {
  constructor(private readonly jokesService: JokesService) {}

  @Query(() => String)
  async randomJoke(): Promise<string> {
    return await this.jokesService.getRandomJoke();
  }

  @Query(() => [String])
  async category(): Promise<string> {
    return await this.jokesService.getJokeCategories();
  }

  @Query(() => String)
  async jokeByCategory(@Args('category') category: string): Promise<string> {
    return await this.jokesService.getJokeByCategory(category);
  }

  @Query(() => [String])
  async jokeFreeSearch(@Args('search') search: string): Promise<string[]> {
    const data = await this.jokesService.getJokeFreeSearch(search);
    return data.flat();
  }
}
