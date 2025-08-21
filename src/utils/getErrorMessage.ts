import type { AxiosError } from 'axios';

export const getErrorMessage = (err: unknown): string => {
  if ((err as any)?.isAxiosError) {
    const ax = err as AxiosError<any>;
    const status = ax.response?.status;
    const code = ax.response?.data?.code ?? ax.code;
    const msg = ax.response?.data?.message || ax.message || '요청 실패';

    const detailList: string[] = Array.isArray(ax.response?.data?.errors)
      ? ax.response!.data!.errors.map((e: any) => e?.message || e).slice(0, 3)
      : [];

    const head = `[${status ?? 'NETWORK'}${code ? `/${code}` : ''}] ${msg}`;
    return detailList.length ? `${head}\n- ${detailList.join('\n- ')}` : head;
  }
  if (err instanceof Error) return err.message;
  try {
    return JSON.stringify(err);
  } catch {
    return String(err);
  }
};
