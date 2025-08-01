'use server';

import { makePartialPublicPost, PublicPost } from '@/dto/post/dto';
import { PostUpdateSchema } from '@/lib/posts/validation';
import { PostModel } from '@/models/post/post-model';
import { postRepository } from '@/repositories/post';
import { getZodErrorMessages } from '@/utils/get-zod-error-messages';
import { makeRandomString } from '@/utils/make-random-string';
import { revalidateTag } from 'next/cache';

type UpdatePostActionState = {
  formState: PublicPost;
  errors?: string[] | [];
  success?: string;
};

export async function updatePostAction(
  prevState: UpdatePostActionState,
  formData: FormData,
): Promise<UpdatePostActionState> {
  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      errors: ['Dados inválidos'],
    };
  }

  const postId = formData.get('id') as string;
  if (!postId || typeof postId !== 'string') {
    return {
      formState: prevState.formState,
      errors: ['Dados inválidos'],
    };
  }

  const formDataToObject = Object.fromEntries(formData.entries());
  const zodParsed = PostUpdateSchema.safeParse(formDataToObject);

  if (!zodParsed.success) {
    return {
      formState: makePartialPublicPost(formDataToObject),
      errors: getZodErrorMessages(zodParsed.error),
    };
  }

  const newPost: Omit<PostModel, 'createdAt' | 'updatedAt'> = zodParsed.data;
  let post: PostModel;
  try {
    post = await postRepository.updateById(postId, newPost);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        formState: makePartialPublicPost(formDataToObject),
        errors: [error.message],
      };
    }
    return {
      formState: makePartialPublicPost(formDataToObject),
      errors: ['Erro ao criar post'],
    };
  }
  revalidateTag('posts');
  revalidateTag(`posts-${post.slug}`);
  return {
    formState: makePartialPublicPost(formDataToObject),
    success: makeRandomString(),
  };
}
