'use server';

import { createLoginSessionFromApi } from '@/lib/login/manage-login';
import { LoginSchema } from '@/lib/login/schemas';
import { getZodErrorMessages } from '@/utils/get-zod-error-messages';
import { apiRequest } from '@/utils/api-request';
import { redirect } from 'next/navigation';

type LoginActionState = {
  email: string;
  errors: string[];
};

export async function loginAction(state: LoginActionState, formData: FormData) {
  const allowLogin = Boolean(Number(process.env.ALLOW_LOGIN));
  if (!allowLogin) {
    return {
      email: '',
      errors: ['Login desabilitado'],
    };
  }

  if (!(formData.get('email') as string)) {
    return {
      email: '',
      errors: ['Dados inválidos'],
    };
  }
  const formObj = Object.fromEntries(formData.entries());
  const formEmail = formObj?.email?.toString() || '';
  const parsedFormData = LoginSchema.safeParse(formObj);

  if (!parsedFormData.success) {
    return {
      email: formEmail,
      errors: getZodErrorMessages(parsedFormData.error),
    };
  }

  //fetch
  const response = await apiRequest<{ accessToken: string }>('/auths/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(parsedFormData.data),
  });

  if (!response.success) {
    return {
      email: formEmail,
      errors: response.errors,
    };
  }

  await createLoginSessionFromApi(response.data.accessToken);
  redirect('/admin/post');
}
