import { and, eq } from 'drizzle-orm';
import { postsTable } from '@/db/drizzle/schemas';
import { drizzleDb } from '@/db/drizzle';
import { logColor } from '@/utils/log-color';
import { PostModel } from '@/models/post/post-model';
import { PostRepository } from './post-repository';
import { asyncDelay } from '@/utils/async-delay';
import { POST_SIMULATE_DELAY_MS } from '@/lib/posts/constants';

export class DrizzlePostRepository implements PostRepository {
  async findAll(): Promise<PostModel[]> {
    await asyncDelay(POST_SIMULATE_DELAY_MS, true);
    logColor('findAll', Date.now());
    const posts = await drizzleDb.query.posts.findMany({
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
    });
    return posts;
  }

  async findAllPublic(): Promise<PostModel[]> {
    await asyncDelay(POST_SIMULATE_DELAY_MS, true);
    logColor('findAllPublic', Date.now());
    const posts = await drizzleDb.query.posts.findMany({
      where: eq(postsTable.published, true),
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
    });
    return posts;
  }

  async findById(id: string): Promise<PostModel> {
    await asyncDelay(POST_SIMULATE_DELAY_MS, true);
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
    await asyncDelay(POST_SIMULATE_DELAY_MS, true);
    logColor('findBySlugPublic', Date.now());
    const post = await drizzleDb.query.posts.findFirst({
      where: and(eq(postsTable.slug, slug), eq(postsTable.published, true)),
    });
    if (!post) {
      throw new Error('Post not found for slug: ' + slug);
    }
    return post;
  }

  async deletePostById(id: string): Promise<void> {
    await asyncDelay(POST_SIMULATE_DELAY_MS, true);
    logColor('delete', Date.now());
    await drizzleDb.delete(postsTable).where(eq(postsTable.id, id));
  }
}
