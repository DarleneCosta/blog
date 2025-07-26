'use server';

import {
  IMAGE_SERVER_URL,
  IMAGE_UPLOADER_MAX_SIZE,
  IMAGE_UPLOADER_DIRECTORY,
} from '@/lib/posts/constants';
import { asyncDelay } from '@/utils/async-delay';
import { mkdir, writeFile } from 'fs/promises';
import { extname, resolve } from 'path';

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
  // TODO: Verificar se o usuário está logado

  await asyncDelay({ verbose: true });

  if (!(formData instanceof FormData)) {
    return createResult({ error: 'Dado inválido.' });
  }

  const file = formData.get('file');
  if (!(file instanceof File)) {
    return createResult({ error: 'Arquivo não encontrado.' });
  }

  const { size, type, name } = file;

  if (size > IMAGE_UPLOADER_MAX_SIZE) {
    return createResult({
      error: 'Arquivo excede o tamanho máximo permitido.',
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
    IMAGE_UPLOADER_DIRECTORY,
  );
  const fullFilePath = resolve(fullUploadPath, filename);

  try {
    await mkdir(fullUploadPath, { recursive: true });
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(fullFilePath, buffer);

    const url = `${IMAGE_SERVER_URL}/${filename}`;
    return createResult({ url });
  } catch (err) {
    console.error('Erro ao salvar imagem:', err);
    return createResult({ error: 'Falha ao salvar a imagem no servidor.' });
  }
}
