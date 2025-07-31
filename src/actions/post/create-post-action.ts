'use server';

import { makePartialPublicPost, PublicPost } from '@/dto/post/dto';
import { PostCreateSchema } from '@/lib/posts/validation';
import { postRepository } from '@/repositories/post';
import { getZodErrorMessages } from '@/utils/get-zod-error-messages';
import { makeSlug } from '@/utils/make-slug';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

type CreatePostActionState = {
  formState: PublicPost;
  errors?: string[] | [];
  success?: true;
};

export async function createPostAction(
  prevState: CreatePostActionState,
  formData: FormData,
): Promise<CreatePostActionState> {
  // TODO: VALIDAR SE O USUARIO ESTA LOGADO
  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      errors: ['Dados inválidos'],
    };
  }

  const formDataToObject = Object.fromEntries(formData.entries());
  const zodParsed = PostCreateSchema.safeParse(formDataToObject);

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
  return redirect(`/admin/post/${newPost.id}`);
}
