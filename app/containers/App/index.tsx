import * as React from 'react';
import Head from 'next/head';

export namespace App {
  export interface Props {
    title: string,
    children: JSX.Element
  }
  export interface State { }
}

export default function App ({
  title,
  children
}: App.Props): JSX.Element {
    return (
      <div>
        <Head>
          <title>{this.props.title}</title>
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        </Head>
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }

