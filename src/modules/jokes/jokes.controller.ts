import { Controller, Get, Param } from '@nestjs/common';
import { JokesService } from './jokes.service';

@Controller('jokes')
export class JokesController {
  constructor(private readonly jokesService: JokesService) {}

  @Get('random')
  async getRandomJoke(): Promise<{ joke: string }> {
    const joke = await this.jokesService.getRandomJoke();
    return { joke };
  }

  @Get('categories')
  async getCategory(): Promise<{ joke: string }> {
    const joke = await this.jokesService.getJokeCategories();
    return { joke };
  }

  @Get('random/category/:category')
  async getJokeByCategory(
    @Param('category') category: string,
  ): Promise<{ joke: string }> {
    const joke = await this.jokesService.getJokeByCategory(category);
    return { joke };
  }

  @Get('search/:search')
  async getJokeFreeSearch(@Param('search') search: string): Promise<String[]> {
    const joke = await this.jokesService.getJokeFreeSearch(search);
    return joke;
  }
}
