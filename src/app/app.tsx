import 'semantic-ui-css/semantic.min.css'
import '@app/app.scss'

import * as React from 'react'

import { hydrate, render } from 'react-dom'

import App from '@components/App'

const rootElement = document.getElementById('root')
if (rootElement.hasChildNodes()) {
  hydrate(<App />, rootElement)
} else {
  render(<App />, rootElement)
}
