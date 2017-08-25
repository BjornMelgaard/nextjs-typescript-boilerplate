import * as React from 'react'
import App from '../app/containers/App'

const style = `
  img {
    width: 300px;
    height: 300px;
    }
  h1 {
    font-family: Arial;
  }
  .myDiv {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
`

const title = 'asdf'

export default function Index (): JSX.Element {
  return (
    <App title={title}>
      <div className='myDiv'>
        <img src='/static/pueue.png' />
        <h1>Welcome to Next.js + Typescript Boilerplate!!!</h1>
      </div>
      <style>{style}</style>
    </App>
  )
}
