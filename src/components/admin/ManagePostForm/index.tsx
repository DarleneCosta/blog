'use client';

import { useActionState, useEffect, useState } from 'react';
import { Button } from '@/components/Button';
import { MarkdownEditor } from '@/components/admin/MarkdownEditor';
import { InputCheckBox } from '@/components/admin/InputCheckBox';
import { InputText } from '@/components/InputText';
import { ImageUploader } from '@/components/admin/ImageUploader';
import {
  PublicPostForApiDto,
  PublicPostForApiSchema,
} from '@/lib/posts/schemas';
import { createPostAction } from '@/actions/post/create-post-action';
import { updatePostAction } from '@/actions/post/update-post-action';
import { toast } from 'react-toastify';
import { useSearchParams, useRouter } from 'next/navigation';

type ManagePostFormUpdateProps = {
  mode: 'update';
  publicPost: PublicPostForApiDto;
};

type ManagePostFormCreateProps = {
  mode: 'create';
};

type ManagePostFormProps =
  | ManagePostFormUpdateProps
  | ManagePostFormCreateProps;

export default function ManagePostForm(props: ManagePostFormProps) {
  const { mode } = props;

  const searchParams = useSearchParams();
  const created = searchParams.get('created');

  let publicPost;
  if (mode === 'update') {
    publicPost = props.publicPost;
  }

  const actionsMap = {
    update: updatePostAction,
    create: createPostAction,
  };

  const initialState = {
    formState: PublicPostForApiSchema.parse(publicPost || {}),
    errors: [],
  };
  const [state, formAction, isPending] = useActionState(
    actionsMap[mode],
    initialState,
  );
  const { formState } = state;
  const [content, setContent] = useState(formState.content);
  const router = useRouter();

  useEffect(() => {
    if (state?.errors && state.errors.length > 0) {
      toast.dismiss();
      toast.error(state.errors.join(', '));
    }
  }, [state?.errors]);

  useEffect(() => {
    if (state?.success) {
      toast.dismiss();
      toast.success('Post atualizado com sucesso!');
    }
  }, [state?.success]);

  useEffect(() => {
    if (created === '1') {
      const url = new URL(window.location.href);
      url.searchParams.delete('created');
      router.replace(url.toString());
      toast.dismiss();
      toast.success('Post criado com sucesso!');
    }
  }, [created, router]);

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
          disabled={isPending}
        />
        <InputText
          labelText='Slug'
          placeholder='Slug gerado automaticamente'
          name='slug'
          readOnly
          type='text'
          defaultValue={formState.slug}
          disabled={isPending}
        />
        <InputText
          labelText='Título'
          name='title'
          placeholder='Digite o título do post'
          type='text'
          defaultValue={formState.title}
          disabled={isPending}
        />
        <InputText
          labelText='Resumo'
          name='excerpt'
          placeholder='Digite o resumo do post'
          type='text'
          defaultValue={formState.excerpt}
          disabled={isPending}
        />
        <MarkdownEditor
          labelText='Conteúdo'
          value={content}
          setValue={setContent}
          textAreaName='content'
          disabled={isPending}
        />
        <ImageUploader disabled={isPending} />
        <InputText
          labelText='Url da imagem de capa'
          name='coverImageUrl'
          placeholder='Digite a url da imagem de capa'
          type='text'
          defaultValue={formState.coverImageUrl}
          disabled={isPending}
        />
        {mode === 'update' && (
          <InputCheckBox
            labelText='Publicar?'
            name='published'
            type='checkbox'
            defaultChecked={formState.published}
            disabled={isPending}
          />
        )}

        <div className='mt-4'>
          <Button type='submit' disabled={isPending}>
            {isPending ? 'Salvando...' : 'Salvar'}
          </Button>
        </div>
      </div>
    </form>
  );
}
