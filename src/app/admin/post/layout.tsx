import { Menu } from '@/components/admin/Menu';
import { requireLoginSessionOrRedirect } from '@/lib/login/manage-login';

type AdminPostLayoutProps = {
  children: React.ReactNode;
};

export default async function AdminPostLayout({
  children,
}: Readonly<AdminPostLayoutProps>) {
  await requireLoginSessionOrRedirect();

  return (
    <>
      <Menu />
      {children}
    </>
  );
}
