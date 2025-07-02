import { PostHeading } from '../PostHeading';
import {
  formatDateTime,
  formatRelativeDateTime,
} from '@/utils/format-datetime';

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
      <time
        className='text-slate-600 block text-sm/tight'
        dateTime={createdAt}
        title={formatRelativeDateTime(createdAt)}
      >
        {formatDateTime(createdAt)}
      </time>
      <PostHeading url={postLink} as={postHeading}>
        {title}
      </PostHeading>
      <p>{excerpt}</p>
    </div>
  );
};
