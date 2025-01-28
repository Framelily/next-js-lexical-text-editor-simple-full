import React from 'react'

import type { AppProps } from 'next/app'

import '@/styles/globals.scss'

const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return <Component {...pageProps} />
}

export default MyApp
