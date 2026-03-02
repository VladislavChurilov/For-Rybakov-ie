export async function retryNetwork<T>(
  fn: () => Promise<T>,
  attempts = 1,
): Promise<T> {
  let lastError: unknown;

  for (let i = 0; i <= attempts; i++) {
    try {
      return await fn();
    } catch (error) {
      if (!(error instanceof Error)) {
        throw error;
      }

      lastError = error;
    }
  }

  throw lastError;
}
