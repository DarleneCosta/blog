'use server';

import { verifyLoginSession } from '@/lib/login/manage-login';
import { asyncDelay } from '@/utils/async-delay';
import { mkdir, writeFile } from 'fs/promises';
import { extname, resolve } from 'path';

const imageUploaderMaxSize =
  Number(process.env.NEXT_PUBLIC_IMAGE_UPLOADER_MAX_SIZE) || 900 * 1024;
const imageUploaderDirectory =
  process.env.NEXT_PUBLIC_IMAGE_UPLOADER_DIRECTORY || 'uploads';
const imageServerUrl =
  process.env.NEXT_PUBLIC_IMAGE_SERVER_URL || 'http://localhost:3000/uploads';

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
  const isAuthenticated = await verifyLoginSession();
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

  const { size, type, name } = file;

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

  const extension = extname(name);
  const filename = `${Date.now()}${extension}`;
  const fullUploadPath = resolve(
    process.cwd(),
    'public',
    imageUploaderDirectory,
  );
  const fullFilePath = resolve(fullUploadPath, filename);

  try {
    await mkdir(fullUploadPath, { recursive: true });
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(fullFilePath, buffer);

    const url = `${imageServerUrl}/${filename}`;
    return createResult({ url });
  } catch (err) {
    console.error('Erro ao salvar imagem:', err);
    return createResult({ error: 'Falha ao salvar a imagem no servidor.' });
  }
}
