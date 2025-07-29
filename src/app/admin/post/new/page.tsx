import { Metadata } from 'next';
import ManagePostForm from '@/components/admin/ManagePostForm';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Novo post',
};

export default function NewPostPage() {
  return (
    <div className='flex flex-col gap-4 p-4'>
      <h1 className='text-xl font-bold'>Novo post</h1>
      <ManagePostForm />
    </div>
  );
}
