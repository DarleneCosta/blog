import { Menu } from '@/components/admin/Menu';

type AdminPostLayoutProps = {
  children: React.ReactNode;
};

export default function AdminPostLayout({
  children,
}: Readonly<AdminPostLayoutProps>) {
  return (
    <>
      <Menu />
      {children}
    </>
  );
}
