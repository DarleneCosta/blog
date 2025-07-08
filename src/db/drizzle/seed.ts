import { JsonPostRepository } from '@/repositories/post/json-post-repository';
import { drizzleDb } from '.';
import { postsTable } from './schemas';

(async () => {
  const jsonPostsRepository = new JsonPostRepository();
  const posts = await jsonPostsRepository.findAll();
  try {
    await drizzleDb.delete(postsTable);
    await drizzleDb.insert(postsTable).values(posts);
  } catch (error) {
    console.error('Erro durante o seed:', error);
  }
})();
