import React, { useState, useEffect } from 'react'
import App from './App'

const DELAY_MS = 300

const delay = (duration: number) => {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve()
    }, duration)
  })
}

const Loading = () => {
  return <div>載入中...</div>
}

const AppLoading = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    delay(DELAY_MS).then(() => {
      setIsLoading(false)
    })
  })

  return isLoading ? <Loading /> : <App />
}

export default AppLoading
