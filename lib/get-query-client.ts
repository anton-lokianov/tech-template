import { isServer, QueryClient } from "@tanstack/react-query";

const makeQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60,
      },
    },
  });
};

let browserQueryClient: QueryClient | undefined = undefined;

export const getQueryClient = () => {
  return isServer
    ? makeQueryClient()
    : (browserQueryClient ?? (browserQueryClient = makeQueryClient()));
};
