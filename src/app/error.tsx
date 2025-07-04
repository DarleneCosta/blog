'use client';

import { useEffect } from 'react';
import ErrorMessage from '@/components/ErrorMessage';

type RootErrorProps = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: RootErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorMessage
      title='500'
      contentTitle='Erro interno do servidor'
      content={
        <button
          className='bg-blue-500 text-white px-4 py-2 rounded-md'
          onClick={() => {
            reset();
          }}
        >
          Recarregar a página
        </button>
      }
    />
  );
}
