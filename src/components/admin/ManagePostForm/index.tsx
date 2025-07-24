'use client';

import { useState } from 'react';
import Button from '@/components/Button';
import MarkdownEditor from '@/components/MarkdownEditor';
import InputCheckBox from '@/components/InputCheckBox';
import InputText from '@/components/InputText';
import ImageUploader from '../ImageUploader';

export default function ManagePostForm() {
  const [content, setContent] = useState('');
  return (
    <form className='flex flex-col gap-6 p-4'>
      <div className='flex flex-col gap-6 p-4'>
        <InputCheckBox labelText='Título' />
        <InputText labelText='Publicar' />
        <ImageUploader />
        <MarkdownEditor
          labelText='Conteúdo'
          value={content}
          setValue={setContent}
          textAreaName='content'
        />
        <div className='mt-4'>
          <Button type='submit'>Criar Post</Button>
        </div>
      </div>
    </form>
  );
}
