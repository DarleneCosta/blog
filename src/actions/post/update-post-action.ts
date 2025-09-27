'use server';

import { getLoginSessionForApi } from '@/lib/login/manage-login';
import {
  PublicPostForApiSchema,
  UpdatePostForApiSchema,
  PublicPostForApiDto,
} from '@/lib/posts/schemas';
import { authenticatedApiRequest } from '@/utils/authenticate-api-request';
import { getZodErrorMessages } from '@/utils/get-zod-error-messages';
import { makeRandomString } from '@/utils/make-random-string';
import { revalidateTag } from 'next/cache';

type UpdatePostActionState = {
  formState: PublicPostForApiDto;
  errors?: string[] | [];
  success?: string;
};

export async function updatePostAction(
  prevState: UpdatePostActionState,
  formData: FormData,
): Promise<UpdatePostActionState> {
  const isAuthenticated = await getLoginSessionForApi();

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
  const zodParsed = UpdatePostForApiSchema.safeParse(formDataToObject);

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

  const validatedPostData = zodParsed.data;
  const updatePostResponse = await authenticatedApiRequest<PublicPostForApiDto>(
    `/posts/me/${postId}`,
    {
      method: 'PATCH',
      body: JSON.stringify(validatedPostData),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  if (!updatePostResponse.success) {
    return {
      formState: PublicPostForApiSchema.parse(formDataToObject),
      errors: updatePostResponse.errors,
    };
  }

  const post = updatePostResponse.data;
  revalidateTag('posts');
  revalidateTag(`posts-${post.slug}`);

  return {
    formState: PublicPostForApiSchema.parse(post),
    errors: [],
    success: makeRandomString(),
  };
}
