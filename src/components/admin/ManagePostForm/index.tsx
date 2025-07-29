'use client';

import { useState } from 'react';
import Button from '@/components/Button';
import MarkdownEditor from '@/components/MarkdownEditor';
import InputCheckBox from '@/components/InputCheckBox';
import InputText from '@/components/InputText';
import ImageUploader from '../ImageUploader';
import { PublicPost } from '@/dto/post/dto';

type ManagePostFormProps = {
  publicPost?: PublicPost;
};

export default function ManagePostForm({ publicPost }: ManagePostFormProps) {
  const [content, setContent] = useState(publicPost?.content || '');
  return (
    <form className='flex flex-col gap-6'>
      <div className='flex flex-col gap-6'>
        <InputText
          labelText='ID'
          placeholder='ID gerado automaticamente'
          readOnly
          name='id'
          type='text'
          defaultValue={publicPost?.id || ''}
        />
        <InputText
          labelText='Slug'
          placeholder='Slug gerado automaticamente'
          name='slug'
          readOnly
          type='text'
          defaultValue={publicPost?.slug || ''}
        />
        <InputText
          labelText='Título'
          name='title'
          placeholder='Digite o título do post'
          type='text'
          defaultValue={publicPost?.title || ''}
        />
        <InputText
          labelText='Autor'
          name='author'
          placeholder='Digite o nome do autor do post'
          type='text'
          defaultValue={publicPost?.author || ''}
        />
        <InputText
          labelText='Resumo'
          name='excerpt'
          placeholder='Digite o resumo do post'
          type='text'
          defaultValue={publicPost?.excerpt || ''}
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
          defaultValue={publicPost?.coverImageUrl || ''}
        />
        <InputCheckBox
          labelText='Publicar?'
          name='published'
          type='checkbox'
          defaultChecked={publicPost?.published || false}
        />
        <div className='mt-4'>
          <Button type='submit'>Criar Post</Button>
        </div>
      </div>
    </form>
  );
}
