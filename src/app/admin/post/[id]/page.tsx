export const dynamic = 'force-dynamic';

type AdminPostIdPageProps = {
  params: Promise<{ id: string }>;
};

export default async function PostIdPage({ params }: AdminPostIdPageProps) {
  const { id } = await params;
  return <div>PostId: {id}</div>;
}
