'use server';

import { createLoginSession, verifyPassword } from '@/lib/login/manage-login';
import { asyncDelay } from '@/utils/async-delay';
import { redirect } from 'next/navigation';

type LoginActionState = {
  username: string;
  error: string;
};

export async function loginAction(state: LoginActionState, formData: FormData) {
  const allowLogin = Boolean(Number(process.env.ALLOW_LOGIN));
  if (!allowLogin) {
    return {
      username: '',
      error: 'Login desabilitado',
    };
  }

  await asyncDelay();

  if (!(formData.get('username') as string)) {
    return {
      username: '',
      error: 'Dados inválidos',
    };
  }

  //dados crus do form
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  //aqui eu checaria se o usuario existe no banco de dados
  //porem nao vou fazer isso aqui, vou usar um mock por env
  const isUsernameValid = username === process.env.LOGIN_USER;
  const isPasswordValid = await verifyPassword(
    password,
    process.env.LOGIN_PASS as string,
  );

  if (!isUsernameValid || !isPasswordValid) {
    return {
      username: '',
      error: 'Usuário ou senha inválidos',
    };
  }

  await createLoginSession(username);
  redirect('/admin/post');
}
