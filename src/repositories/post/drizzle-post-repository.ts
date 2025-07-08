import { PostModel } from '@/models/post/post-model';
import { PostRepository } from './post-repository';
import { drizzleDb } from '@/db/drizzle';
import { postsTable } from '@/db/drizzle/schemas';
import { and, eq } from 'drizzle-orm';

export class DrizzlePostRepository implements PostRepository {
  async findAll(): Promise<PostModel[]> {
    const posts = await drizzleDb.query.posts.findMany({
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
    });
    return posts;
  }

  async findAllPublic(): Promise<PostModel[]> {
    const posts = await drizzleDb.query.posts.findMany({
      where: eq(postsTable.published, true),
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
    });
    return posts;
  }

  async findById(id: string): Promise<PostModel> {
    const post = await drizzleDb.query.posts.findFirst({
      where: eq(postsTable.id, id),
    });
    if (!post) {
      throw new Error('Post not found for id: ' + id);
    }
    return post;
  }

  async findBySlugPublic(slug: string): Promise<PostModel> {
    const post = await drizzleDb.query.posts.findFirst({
      where: and(eq(postsTable.slug, slug), eq(postsTable.published, true)),
    });
    if (!post) {
      throw new Error('Post not found for slug: ' + slug);
    }
    return post;
  }
}
