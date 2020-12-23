import '../styles/globals.css'
import 'nprogress/nprogress.css'

import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import Router from 'next/router'
import Nprogress from 'nprogress'

Router.events.on('routeChangeStart', () => {
  Nprogress.start()
})

Router.events.on('routeChangeComplete', () => {Nprogress.done()})
Router.events.on('routeChangeError', () => {Nprogress.done()})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
