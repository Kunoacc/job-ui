import '../styles/globals.scss'
import 'nprogress/nprogress.css'

import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import Router from 'next/router'
import Nprogress from 'nprogress'

Router.events.on('routeChangeStart', () => {Nprogress.start()})
Router.events.on('routeChangeComplete', () => {Nprogress.done()})
Router.events.on('routeChangeError', () => {Nprogress.done()})
Router.events.on('beforeHistoryChange', () => {
  console.log(window.location.href)
  console.log('fired')
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
