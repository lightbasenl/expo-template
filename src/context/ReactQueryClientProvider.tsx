import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ReactNode } from "react";

import { errorReporting } from "@/services/sentry";

export const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false, staleTime: 20 } },
  queryCache: new QueryCache({
    onError: (error) => errorReporting(error as AxiosError<any, any>),
  }),
  mutationCache: new MutationCache({
    onError: (error) => errorReporting(error as AxiosError<any, any>),
  }),
});

export function ReactQueryClientProvider(props: { children: ReactNode }) {
  return <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>;
}
