import { LoginForm } from '@/components/admin/LoginForm';
import { ErrorMessage } from '@/components/ErrorMessage';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Login',
};

export default async function AdminLoginPage() {
  const allowLogin = Boolean(Number(process.env.ALLOW_LOGIN));
  if (!allowLogin) {
    return <ErrorMessage contentTitle='403' content='Login desabilitado' />;
  }

  return <LoginForm />; // TODO: Adicionar mensagem de erro se login desabilitado
}
