type AsyncFunction<T> = (...args: any[]) => Promise<T>;

interface AsyncWrapperResponse<T> {
  data: T | null;
  error: Error | null;
}

function asyncWrapper<T>(
  asyncFunc: AsyncFunction<T>
): AsyncFunction<AsyncWrapperResponse<T>> {
  return async (...args: any[]): Promise<AsyncWrapperResponse<T>> => {
    try {
      const data = await asyncFunc(...args);
      return { data, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  };
}

export default asyncWrapper;
