import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider, SessionProviderProps } from "next-auth/react"
import {QueryClient} from "@tanstack/query-core";
import {QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient()

export default function App({ Component, pageProps: {session, ...pageProps} }: AppProps<SessionProviderProps>) {
  return (
      <QueryClientProvider client={queryClient}>
          <SessionProvider session={session}>
            <Component {...pageProps} />
          </SessionProvider>
      </QueryClientProvider>
  )
}
