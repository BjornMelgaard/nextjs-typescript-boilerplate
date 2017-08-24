import * as React from 'react'
import Head from 'next/head'

export interface AppProps {
  title: string,
  children: JSX.Element[]
}

export default function App ({
  title,
  children
}: AppProps): JSX.Element {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <div>
        {children}
      </div>
    </div>
  )
}
