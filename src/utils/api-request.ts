type ApiRequestError = {
  errors: string[];
  success: false;
  status: number;
};

type ApiRequestSuccess<T> = {
  data: T;
  success: true;
  status: number;
};

export type ApiRequest<T> = ApiRequestError | ApiRequestSuccess<T>;

export const API_URL = process.env.API_URL || 'http://localhost:3001';

export async function apiRequest<T>(
  path: string,
  options: RequestInit,
): Promise<ApiRequest<T>> {
  const url = `${API_URL}${path}`;
  try {
    const response = await fetch(url, options);
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const errors = Array.isArray(data.message)
        ? data.message
        : [data.message ?? 'Erro inesperado'];

      return {
        errors,
        success: false,
        status: response.status,
      };
    }

    return {
      data,
      success: true,
      status: response.status,
    };
  } catch (error) {
    return {
      errors: [
        error instanceof Error
          ? error.message
          : 'Erro ao conectar-se ao servidor',
      ],
      success: false,
      status: 500,
    };
  }
}
