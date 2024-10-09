import { QueryClient } from '@tanstack/react-query';

class ReactQueryClient {
  static #queryClient: QueryClient;

  private constructor() {}

  public static get instance() {
    if (!ReactQueryClient.#queryClient) {
      ReactQueryClient.#queryClient = new QueryClient();
    }
    return ReactQueryClient.#queryClient;
  }
}

export default ReactQueryClient;
