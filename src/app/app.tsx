import * as React from 'react'

import { hydrate, render } from 'react-dom'

import AppLoading from '@components/AppLoading'

import 'semantic-ui-css/semantic.min.css'
import '@app/app.scss'
import App from '@components/App'

const rootElement = document.getElementById('root')
if (rootElement.hasChildNodes()) {
  hydrate(<App />, rootElement)
} else {
  render(<AppLoading />, rootElement)
}
