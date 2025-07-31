'use client';

import { useActionState, useEffect, useState } from 'react';
import Button from '@/components/Button';
import MarkdownEditor from '@/components/MarkdownEditor';
import InputCheckBox from '@/components/InputCheckBox';
import InputText from '@/components/InputText';
import ImageUploader from '../ImageUploader';
import { makePartialPublicPost, PublicPost } from '@/dto/post/dto';
import { createPostAction } from '@/actions/post/create-post';
import { toast } from 'react-toastify';

type ManagePostFormProps = {
  publicPost?: PublicPost;
};

export default function ManagePostForm({ publicPost }: ManagePostFormProps) {
  const initialState = {
    formState: makePartialPublicPost(publicPost),
    errors: [],
  };
  const [state, formAction, isPending] = useActionState(
    createPostAction,
    initialState,
  );
  const { formState } = state;
  const [content, setContent] = useState(formState.content);

  useEffect(() => {
    if (state.errors.length > 0) {
      toast.dismiss();
      toast.error(state.errors.join(', '));
    }
  }, [state.errors]);

  return (
    <form className='flex flex-col gap-6' action={formAction}>
      <div className='flex flex-col gap-6'>
        <InputText
          labelText='ID'
          placeholder='ID gerado automaticamente'
          readOnly
          name='id'
          type='text'
          defaultValue={formState.id}
        />
        <InputText
          labelText='Slug'
          placeholder='Slug gerado automaticamente'
          name='slug'
          readOnly
          type='text'
          defaultValue={formState.slug}
        />
        <InputText
          labelText='Título'
          name='title'
          placeholder='Digite o título do post'
          type='text'
          defaultValue={formState.title}
        />
        <InputText
          labelText='Autor'
          name='author'
          placeholder='Digite o nome do autor do post'
          type='text'
          defaultValue={formState.author}
        />
        <InputText
          labelText='Resumo'
          name='excerpt'
          placeholder='Digite o resumo do post'
          type='text'
          defaultValue={formState.excerpt}
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
          defaultValue={formState.coverImageUrl}
        />
        <InputCheckBox
          labelText='Publicar?'
          name='published'
          type='checkbox'
          defaultChecked={formState.published}
        />
        <div className='mt-4'>
          <Button type='submit' disabled={isPending}>
            {isPending ? 'Salvando...' : 'Salvar'}
          </Button>
        </div>
      </div>
    </form>
  );
}
