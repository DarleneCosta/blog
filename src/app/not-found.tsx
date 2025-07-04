import ErrorMessage from '@/components/ErrorMessage';

export default function NotFound() {
  return (
    <ErrorMessage
      title='404'
      contentTitle='Página não encontrada'
      content='A página que você está procurando não existe.'
    />
  );
}
