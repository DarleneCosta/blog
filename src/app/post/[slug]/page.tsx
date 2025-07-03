type PostSlugPageProps = {
  params: {
    slug: string;
  };
};

export default function PostSlugPage({ params }: PostSlugPageProps) {
  console.log(params);
  return <div>PostSlug {params.slug}</div>;
}
