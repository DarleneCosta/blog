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
        <InputText
          labelText='ID'
          placeholder='ID gerado automaticamente'
          readOnly
          name='id'
          type='text'
        />
        <InputText
          labelText='Slug'
          placeholder='Slug gerado automaticamente'
          name='slug'
          readOnly
          type='text'
        />
        <InputText
          labelText='Título'
          name='title'
          placeholder='Digite o título do post'
          type='text'
        />
        <InputText
          labelText='Autor'
          name='author'
          placeholder='Digite o nome do autor do post'
          type='text'
        />
        <InputText
          labelText='Resumo'
          name='excerpt'
          placeholder='Digite o resumo do post'
          type='text'
        />
        <MarkdownEditor
          labelText='Conteúdo'
          value={content}
          setValue={setContent}
          textAreaName='content'
        />
        <ImageUploader />
        <InputText
          labelText='Url da imagem de capa'
          name='coverImageUrl'
          placeholder='Digite a url da imagem de capa'
          type='text'
        />

        <InputCheckBox labelText='Publicar?' name='published' type='checkbox' />
        <div className='mt-4'>
          <Button type='submit'>Criar Post</Button>
        </div>
      </div>
    </form>
  );
}
