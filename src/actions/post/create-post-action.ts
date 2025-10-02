'use server';

import { getLoginSessionForApi } from '@/lib/login/manage-login';
import {
  CreatePostForApiSchema,
  PublicPostForApiDto,
  PublicPostForApiSchema,
} from '@/lib/posts/schemas';
import { authenticatedApiRequest } from '@/utils/authenticated-api-request';
import { getZodErrorMessages } from '@/utils/get-zod-error-messages';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

type CreatePostActionState = {
  formState: PublicPostForApiDto;
  errors?: string[] | [];
  success?: string;
};

export async function createPostAction(
  prevState: CreatePostActionState,
  formData: FormData,
): Promise<CreatePostActionState> {
  const isAuthenticated = await getLoginSessionForApi();
  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      errors: ['Dados inválidos'],
    };
  }

  const formDataToObject = Object.fromEntries(formData.entries());
  const zodParsed = CreatePostForApiSchema.safeParse(formDataToObject);

  if (!isAuthenticated) {
    return {
      formState: PublicPostForApiSchema.parse(formDataToObject),
      errors: ['Faça login em outra aba antes de salvar o post'],
    };
  }

  if (!zodParsed.success) {
    return {
      formState: PublicPostForApiSchema.parse(formDataToObject),
      errors: getZodErrorMessages(zodParsed.error),
    };
  }

  const newPost = zodParsed.data;
  const createPostResponse = await authenticatedApiRequest<PublicPostForApiDto>(
    `/posts/me`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
    },
  );
  if (!createPostResponse.success) {
    return {
      formState: PublicPostForApiSchema.parse(newPost),
      errors: createPostResponse.errors,
    };
  }

  const createdPost = createPostResponse.data;
  revalidateTag('posts');
  return redirect(`/admin/post/${createdPost.id}?created=1`);
}
