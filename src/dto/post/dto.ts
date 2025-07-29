import { PostModel } from '@/models/post/post-model';

export type PublicPost = Omit<PostModel, 'publishedAt' | 'updatedAt'>;

export const makePublicPost = (post: PostModel): PublicPost => {
  const {
    id,
    title,
    slug,
    author,
    excerpt,
    content,
    coverImageUrl,
    published,
    createdAt,
  } = post;

  return {
    id,
    title,
    slug,
    author,
    excerpt,
    content,
    coverImageUrl,
    published,
    createdAt,
  };
};
