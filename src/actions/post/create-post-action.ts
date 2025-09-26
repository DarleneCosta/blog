'use server';

import { makePartialPublicPost, PublicPost } from '@/dto/post/dto';
import { verifyLoginSession } from '@/lib/login/manage-login';
import { PostCreateSchema } from '@/lib/posts/schemas';
import { postRepository } from '@/repositories/post';
import { getZodErrorMessages } from '@/utils/get-zod-error-messages';
import { makeSlug } from '@/utils/make-slug';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

type CreatePostActionState = {
  formState: PublicPost;
  errors?: string[] | [];
  success?: string;
};

export async function createPostAction(
  prevState: CreatePostActionState,
  formData: FormData,
): Promise<CreatePostActionState> {
  const isAuthenticated = await verifyLoginSession();
  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      errors: ['Dados inválidos'],
    };
  }

  const formDataToObject = Object.fromEntries(formData.entries());
  const zodParsed = PostCreateSchema.safeParse(formDataToObject);

  if (!isAuthenticated) {
    return {
      formState: makePartialPublicPost(formDataToObject),
      errors: ['Faça login em outra aba antes de salvar o post'],
    };
  }

  if (!zodParsed.success) {
    return {
      formState: makePartialPublicPost(formDataToObject),
      errors: getZodErrorMessages(zodParsed.error),
    };
  }

  const validatedData = zodParsed.data;
  const newPost = {
    ...validatedData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    id: uuidv4(),
    slug: makeSlug(validatedData.title),
  };

  try {
    await postRepository.create(newPost);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        formState: newPost,
        errors: [error.message],
      };
    }
    return {
      formState: newPost,
      errors: ['Erro ao criar post'],
    };
  }

  revalidateTag('posts');
  return redirect(`/admin/post/${newPost.id}?created=1`);
}
