import { Menu } from '@/components/admin/Menu';
import { requireLoginSessionForApiOrRedirect } from '@/lib/login/manage-login';

type AdminPostLayoutProps = {
  children: React.ReactNode;
};

export default async function AdminPostLayout({
  children,
}: Readonly<AdminPostLayoutProps>) {
  await requireLoginSessionForApiOrRedirect();

  return (
    <>
      <Menu />
      {children}
    </>
  );
}
