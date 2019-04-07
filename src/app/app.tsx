import * as React from 'react'
import { hydrate, render } from 'react-dom'

import App from '@components/App'

import 'semantic-ui-css/semantic.min.css'
import '@app/app.scss'

const rootElement = document.getElementById('root')
if (rootElement.hasChildNodes()) {
  hydrate(<App />, rootElement)
} else {
  render(<App />, rootElement)
}
