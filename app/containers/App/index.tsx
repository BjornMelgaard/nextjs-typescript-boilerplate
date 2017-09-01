import * as React from 'react'
import Head from 'next/head'

import Logo from 'components/Logo'

export interface AppProps {
  title: string,
  children: JSX.Element[]
}

const App: React.SFC<AppProps> = ({
  title,
  children
}) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
    </Head>
    <div>
      <Logo />
      {children}
    </div>
  </div>
)

export default App
