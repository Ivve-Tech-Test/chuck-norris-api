import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class JokesService {
  private readonly apiUrl = 'https://api.chucknorris.io/jokes/';

  async getRandomJoke(): Promise<string> {
    try {
      const data = await axios.get(this.apiUrl + 'random');
      return data.data.value;
    } catch (error) {
      throw new Error(`Error ${error.message}`);
    }
  }

  async getJokeCategories(): Promise<string> {
    try {
      const data = await axios.get(this.apiUrl + 'categories');
      return data.data;
    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    }
  }

  async getJokeByCategory(category: string): Promise<string> {
    try {
      const data = await axios.get(`${this.apiUrl}random?category=${category}`);
      return data.data.value;
    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    }
  }

  async getJokeFreeSearch(search: string): Promise<string[]> {
    try {
      const response = await axios.get(`${this.apiUrl}search?query=${search}`);
      return response.data.result.slice(0, 10).map((joke: any) => [joke.value]);
    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    }
  }
}
