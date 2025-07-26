'use server';

import { mkdir, writeFile } from 'fs/promises';
import { extname, join } from 'path';
import {
  IMAGE_SERVER_URL,
  IMAGE_UPLOADER_DIRECTORY,
  IMAGE_UPLOADER_MAX_SIZE,
} from '@/lib/posts/constants';

type UploadImageActionResult = {
  url?: string;
  error?: string;
};

const makeResult = ({
  url,
  error,
}: {
  url?: string;
  error?: string;
}): UploadImageActionResult => ({ url, error });

export async function uploadImage(
  formData: FormData,
): Promise<UploadImageActionResult> {
  const file = formData.get('file');

  if (!(file instanceof File)) {
    return makeResult({ error: 'Arquivo não encontrado.' });
  }

  if (file.size > IMAGE_UPLOADER_MAX_SIZE) {
    return makeResult({ error: 'Arquivo muito grande.' });
  }

  if (!file.type.startsWith('image/')) {
    return makeResult({ error: 'Tipo de imagem inválido.' });
  }

  const fileExt = extname(file.name);
  const fileName = `${Date.now()}${fileExt}`;
  const uploadDir = join(process.cwd(), IMAGE_UPLOADER_DIRECTORY);

  // Garante que o diretório de upload existe
  await mkdir(uploadDir, { recursive: true });

  const filePath = join(uploadDir, fileName);
  const fileBuffer = Buffer.from(await file.arrayBuffer());

  await writeFile(filePath, fileBuffer);

  const url = `${IMAGE_SERVER_URL}/${fileName}`;
  return makeResult({ url });
}
