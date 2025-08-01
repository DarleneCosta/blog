'use client';

import { useRef, useState, useTransition } from 'react';
import Button from '@/components/Button';
import { ImageUpIcon } from 'lucide-react';
import { IMAGE_UPLOADER_MAX_SIZE } from '@/lib/posts/constants';
import { toast } from 'react-toastify';
import { uploadImage } from '@/actions/upload/upload-image';

type ImageUploaderProps = {
  disabled?: boolean;
};

export default function ImageUploader({ disabled }: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, startTransition] = useTransition();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  function handleChooseImage() {
    if (!fileInputRef.current) {
      return;
    }
    fileInputRef.current.click();
  }

  async function handleImageUpload() {
    if (!fileInputRef.current) {
      return;
    }
    const file = fileInputRef.current.files?.[0];
    if (!file) {
      setImageUrl(null);
      return;
    }
    if (file.size > IMAGE_UPLOADER_MAX_SIZE) {
      toast.error(
        `A imagem deve ter menos de ${IMAGE_UPLOADER_MAX_SIZE / 1024}KB`,
      );
      setImageUrl(null);
      fileInputRef.current.value = '';
      return;
    }
    const formData = new FormData();
    formData.append('file', file);

    startTransition(async () => {
      const result = await uploadImage(formData);
      if (result.error) {
        toast.error(result.error);
        setImageUrl(null);
        fileInputRef.current!.value = '';
        return;
      }
      if (result.url) {
        setImageUrl(result.url);
        toast.success('Imagem enviada com sucesso');
      }
    });
  }

  function handleRemoveImage() {
    setImageUrl(null);
  }

  return (
    <div className='flex flex-col items-start gap-2 py-4 '>
      <Button
        type='button'
        variant='ghost'
        className='px-12'
        onClick={handleChooseImage}
        disabled={isUploading || disabled}
      >
        <ImageUpIcon />
        Enviar imagem
      </Button>
      {imageUrl && (
        <div className='flex flex-col items-start gap-4'>
          <p className='text-sm text-gray-500'>{imageUrl}</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageUrl} alt='Imagem enviada' className='rounded-lg' />
          <Button type='button' variant='ghost' onClick={handleRemoveImage}>
            Remover imagem
          </Button>
        </div>
      )}
      <input
        className='hidden'
        type='file'
        name='file'
        accept='image/*'
        ref={fileInputRef}
        onChange={handleImageUpload}
        disabled={isUploading}
      />
    </div>
  );
}
