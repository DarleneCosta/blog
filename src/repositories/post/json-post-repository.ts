import { readFile } from 'fs/promises';
import { PostModel } from '@/models/post/post-model';
import { PostRepository } from './post-repository';
import { resolve } from 'path';

const ROOT_DIR = process.cwd();
const JSON_POSTS_PATH = resolve(ROOT_DIR, 'src', 'db', 'seed', 'posts.json');
const SIMULATE_DELAY = 0;

export class JsonPostRepository implements PostRepository {
  private async readFromDisk(): Promise<PostModel[]> {
    await new Promise(resolve => setTimeout(resolve, SIMULATE_DELAY));
    const file = await readFile(JSON_POSTS_PATH, 'utf8');
    const { posts } = JSON.parse(file);
    return posts;
  }

  async findAllPublic(): Promise<PostModel[]> {
    const posts = await this.readFromDisk();
    return posts.filter(post => post.published);
  }

  async findById(id: string): Promise<PostModel> {
    const posts = await this.readFromDisk();
    const post = posts.find(post => post.id === id);
    if (!post) {
      throw new Error('Post not found for id: ' + id);
    }
    return post;
  }

  async findBySlug(slug: string): Promise<PostModel> {
    const posts = await this.readFromDisk();
    const post = posts.find(post => post.slug === slug);
    if (!post) {
      throw new Error('Post not found for slug: ' + slug);
    }
    return post;
  }
}
