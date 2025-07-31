'use server';

import { makePartialPublicPost, PublicPost } from '@/dto/post/dto';
import { PostUpdateSchema } from '@/lib/posts/validation';
import { postRepository } from '@/repositories/post';
import { getZodErrorMessages } from '@/utils/get-zod-error-messages';
import { redirect } from 'next/navigation';

type UpdatePostActionState = {
  formState: PublicPost;
  errors: string[];
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

  const formDataToObject = Object.fromEntries(formData.entries());
  const zodParsed = PostUpdateSchema.safeParse(formDataToObject);

  if (!zodParsed.success) {
    return {
      formState: makePartialPublicPost(formDataToObject),
      errors: getZodErrorMessages(zodParsed.error),
    };
  }

  const validatedData = zodParsed.data;
  const newPost = {
    ...validatedData,
    updatedAt: new Date().toISOString(),
  };

  try {
    await postRepository.updateById(prevState.formState.id, newPost);
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

  return redirect(`/admin/post`);
}
