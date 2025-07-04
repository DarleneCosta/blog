import clsx from 'clsx';
import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';

type SafeMarkDownProps = {
  content: string;
};

export function SafeMarkDown({ content }: SafeMarkDownProps) {
  return (
    <div
      className={clsx(
        'prose prose-slate dark:prose-invert',
        'w-full max-w-none',
        'overflow-hidden',
        'prose-a:transition',
        'prose-a:no-underline',
        'prose-a:text-blue-600 dark:prose-a:text-blue-400',
        'prose-a:hover:text-blue-700 dark:prose-a:hover:text-blue-300',
        'prose-a:hover:underline',
        'prose-img:mx-auto',
        'md:prose-lg',
      )}
    >
      <ReactMarkdown
        rehypePlugins={[rehypeSanitize]}
        remarkPlugins={[remarkGfm]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
