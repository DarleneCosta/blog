'use server';

import { verifyPassword } from '@/lib/login/manage-login';
import { asyncDelay } from '@/utils/async-delay';

type LoginActionState = {
  username: string;
  error: string;
};

export async function loginAction(state: LoginActionState, formData: FormData) {
  await asyncDelay(5000); // Vou manter

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
  const isUsernameValid = username === process.env.ADMIN_USERNAME;
  const isPasswordValid = await verifyPassword(
    password,
    process.env.ADMIN_PASSWORD as string,
  );

  if (!isUsernameValid || !isPasswordValid) {
    return {
      username: '',
      error: 'Usuário ou senha inválidos',
    };
  }

  return { username, error: '' };
}
