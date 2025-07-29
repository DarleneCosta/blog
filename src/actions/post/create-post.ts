'use server';

import { makePartialPublicPost, PublicPost } from '@/dto/post/dto';
import { PostCreateSchema } from '@/lib/posts/validation';
import { getZodErrorMessages } from '@/utils/get-zod-error-messages';

type CreatePostActionState = {
  formState: PublicPost;
  errors: string[];
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
    id: '',
    slug: '',
  };
  return {
    formState: newPost,
    errors: [],
  };
}
