import clsx from 'clsx';

export default function Home() {
  return (
    <div
      className={clsx(
        'flex',
        'flex-col',
        'items-center',
        'justify-center',
        'h-screen',
        'bg-gray-100',
        'text-gray-900',
        'text-2xl',
        'font-bold',
      )}
    >
      <h1>Hello World</h1>
    </div>
  );
}
