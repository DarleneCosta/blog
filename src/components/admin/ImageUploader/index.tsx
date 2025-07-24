'use client';

import { useRef } from 'react';
import Button from '@/components/Button';
import { ImageUpIcon } from 'lucide-react';

export default function ImageUploader() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleChooseImage() {
    if (!fileInputRef.current) {
      return;
    }
    fileInputRef.current.click();
  }

  return (
    <div className='flex flex-col items-start gap-2 py-4 '>
      <Button
        type='button'
        variant='ghost'
        className='px-12'
        onClick={handleChooseImage}
      >
        <ImageUpIcon />
        Enviar imagem
      </Button>
      <input
        className='hidden'
        type='file'
        name='file'
        accept='image/*'
        ref={fileInputRef}
      />
    </div>
  );
}
