import { AppProps } from 'next/app';
import React from 'react';
import {
  Hydrate,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from 'react-query';

import '@/styles/globals.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';

/**
 * !STARTERCONF info
 * ? `Layout` component is called in every page using `np` snippets. If you have consistent layout across all page, you can add it here too
 */

const queryCache = new QueryCache({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSuccess: async (success: any, query) => {
    if (typeof success === 'undefined') {
      query.fetch();
    }
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        queryCache,
        defaultOptions: {
          queries: {
            retry: 2,
            refetchOnWindowFocus: false,
          },
        },
      })
  );
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
