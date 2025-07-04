import { PostHeading } from '../PostHeading';
import { PostDate } from '../PostDate';

interface PostSummaryProps {
  postHeading: 'h1' | 'h2';
  postLink: string;
  createdAt: string;
  title: string;
  excerpt: string;
}

export const PostSummary = ({
  postHeading,
  postLink,
  createdAt,
  title,
  excerpt,
}: PostSummaryProps) => {
  return (
    <div className='flex flex-col gap-4 sm:justify-center'>
      <PostDate date={createdAt} />
      <PostHeading url={postLink} as={postHeading}>
        {title}
      </PostHeading>
      <p>{excerpt}</p>
    </div>
  );
};
