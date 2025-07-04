import {
  formatDateTime,
  formatRelativeDateTime,
} from '@/utils/format-datetime';

type PostDateProps = {
  date: string;
};

export function PostDate({ date }: PostDateProps) {
  return (
    <time
      className='text-slate-600 text-sm/tight dark:text-slate-400'
      dateTime={date}
      title={formatRelativeDateTime(date)}
    >
      {formatDateTime(date)}
    </time>
  );
}
