'use server';

import { getLoginSessionForApi } from '@/lib/login/manage-login';
import { asyncDelay } from '@/utils/async-delay';
import { authenticatedApiRequest } from '@/utils/authenticated-api-request';

const imageUploaderMaxSize =
  Number(process.env.NEXT_PUBLIC_IMAGE_UPLOADER_MAX_SIZE) || 900 * 1024;

type UploadImageActionResult = {
  url: string;
  error: string;
};

const createResult = ({
  url = '',
  error = '',
}: Partial<UploadImageActionResult>): UploadImageActionResult => ({
  url,
  error,
});

export async function uploadImage(
  formData: FormData,
): Promise<UploadImageActionResult> {
  const isAuthenticated = await getLoginSessionForApi();
  if (!isAuthenticated) {
    return createResult({
      error: 'Faça login em outra aba antes de salvar a imagem',
    });
  }

  await asyncDelay();

  if (!(formData instanceof FormData)) {
    return createResult({ error: 'Dado inválido.' });
  }

  const file = formData.get('file');
  if (!(file instanceof File)) {
    return createResult({ error: 'Arquivo não encontrado.' });
  }

  const { size, type } = file;

  if (size > imageUploaderMaxSize) {
    return createResult({
      error: `Arquivo excede o tamanho máximo permitido. ${(
        imageUploaderMaxSize / 1024
      ).toFixed(0)}kb.`,
    });
  }

  if (!type.startsWith('image/')) {
    return createResult({
      error: 'O arquivo enviado não é uma imagem válida.',
    });
  }

  const uploadImageResponse = await authenticatedApiRequest<string>(`/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!uploadImageResponse.success) {
    return createResult({
      error: uploadImageResponse.errors[0] ?? 'Erro ao salvar imagem',
    });
  }
  const url = `${process.env.NEXT_PUBLIC_IMAGE_SERVER_URL}/${uploadImageResponse.data}`;
  return createResult({ url });
}
