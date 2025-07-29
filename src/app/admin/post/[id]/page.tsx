import ManagePostForm from '@/components/admin/ManagePostForm';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { findPostByIdAdmin } from '@/lib/posts/queries/admin';
import { makePublicPost } from '@/dto/post/dto';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Editar post',
};

type AdminPostIdPageProps = {
  params: Promise<{ id: string }>;
};

export default async function PostIdPage({ params }: AdminPostIdPageProps) {
  const { id } = await params;
  const post = await findPostByIdAdmin(id).catch();
  if (!post) {
    notFound();
  }
  const publicPost = makePublicPost(post);
  return (
    <div className='flex flex-col gap-4 p-4'>
      <h1 className='text-xl font-bold'>Editar post</h1>
      <ManagePostForm publicPost={publicPost} />
    </div>
  );
}
