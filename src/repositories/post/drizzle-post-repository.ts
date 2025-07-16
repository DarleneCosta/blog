import { and, eq } from 'drizzle-orm';
import { postsTable } from '@/db/drizzle/schemas';
import { drizzleDb } from '@/db/drizzle';
import { logColor } from '@/utils/log-color';
import { PostModel } from '@/models/post/post-model';
import { PostRepository } from './post-repository';

export class DrizzlePostRepository implements PostRepository {
  async findAll(): Promise<PostModel[]> {
    logColor('findAll', Date.now());
    const posts = await drizzleDb.query.posts.findMany({
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
    });
    return posts;
  }

  async findAllPublic(): Promise<PostModel[]> {
    logColor('findAllPublic', Date.now());
    const posts = await drizzleDb.query.posts.findMany({
      where: eq(postsTable.published, true),
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
    });
    return posts;
  }

  async findById(id: string): Promise<PostModel> {
    logColor('findById', Date.now());
    const post = await drizzleDb.query.posts.findFirst({
      where: eq(postsTable.id, id),
    });
    if (!post) {
      throw new Error('Post not found for id: ' + id);
    }
    return post;
  }

  async findBySlugPublic(slug: string): Promise<PostModel> {
    logColor('findBySlugPublic', Date.now());
    const post = await drizzleDb.query.posts.findFirst({
      where: and(eq(postsTable.slug, slug), eq(postsTable.published, true)),
    });
    if (!post) {
      throw new Error('Post not found for slug: ' + slug);
    }
    return post;
  }
}
