

export async function fetchWithRateLimit(url: string) {
  const response = await fetch(url);
  
  if (response.status === 429) {
    const retryAfter = response.headers.get('Retry-After');
    throw new Error(`Rate limited. Retry after ${retryAfter} seconds`);
  }
  
  return response;
}