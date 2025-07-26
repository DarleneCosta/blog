'use client';

import { startTransition, useRef, useTransition } from 'react';
import Button from '@/components/Button';
import { ImageUpIcon } from 'lucide-react';
import { IMAGE_UPLOADER_MAX_SIZE } from '@/lib/posts/constants';
import { toast } from 'react-toastify';
import { uploadImage } from '@/actions/upload/upload-image';

export default function ImageUploader() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, startUploading] = useTransition();

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
      return;
    }
    if (file.size > IMAGE_UPLOADER_MAX_SIZE) {
      toast.error(
        `A imagem deve ter menos de ${IMAGE_UPLOADER_MAX_SIZE / 1024}KB`,
      );
      fileInputRef.current.value = '';
      return;
    }
    const formData = new FormData();
    formData.append('file', file);

    startTransition(async () => {
      const result = await uploadImage(formData);
      if (result.error) {
        toast.error(result.error);
        fileInputRef.current!.value = '';
        return;
      }
      console.log(result);
      toast.success(result.url);
    });
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
        onChange={handleImageUpload}
      />
    </div>
  );
}
