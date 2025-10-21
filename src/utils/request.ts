export const request = async <T>(
  url: string,
  query: Record<string, any> = {},
  option?: RequestInit
): Promise<T> => {
  const str = new URLSearchParams(query).toString();

  const response = await fetch(`${url}?${str}`, option);

  return await response.json();
};
