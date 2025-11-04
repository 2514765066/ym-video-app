import { sourceState } from "@/store/useSourceStore";

interface Option {
  url?: string;
  query?: Record<string, any>;
}

export const request = async <T>({
  url,
  query = {},
}: Option = {}): Promise<T> => {
  const str = new URLSearchParams(query).toString();

  const response = await fetch(
    `${url || sourceState.selectedSource.value}?${str}`
  );

  return await response.json();
};
