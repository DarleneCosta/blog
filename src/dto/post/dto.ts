import { PostModel } from '@/models/post/post-model';

export type PublicPost = Omit<PostModel, 'publishedAt' | 'updatedAt'>;

export const makePartialPublicPost = (
  post?: Partial<PostModel>,
): PublicPost => {
  return {
    id: post?.id || '',
    title: post?.title || '',
    slug: post?.slug || '',
    author: post?.author || '',
    excerpt: post?.excerpt || '',
    content: post?.content || '',
    coverImageUrl: post?.coverImageUrl || '',
    published: post?.published || false,
    createdAt: post?.createdAt || '',
  };
};

export const makePublicPostFromDb = (post: PostModel): PublicPost => {
  return makePartialPublicPost(post);
};
