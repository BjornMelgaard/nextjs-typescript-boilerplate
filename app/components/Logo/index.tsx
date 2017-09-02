import * as React from 'react'
// import logoSrc from './pueue.png'
const logoSrc = require('./pueue.png')

export default function App(): JSX.Element {
  return <img src={logoSrc} alt="logo" />
}
