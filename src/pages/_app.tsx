
import type { AppProps } from 'next/app'
import { Header } from '../components/Header';
import '../styles/global.scss';
import { SessionProvider } from "next-auth/react"

function MyApp({ Component, pageProps }: AppProps) {
  return (

    <SessionProvider session={pageProps.session} refetchInterval={5 * 60}>
      <Header />
      <Component {...pageProps} />
    </SessionProvider>

  )
}

export default MyApp
