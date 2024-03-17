import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { MainProvider } from './MainContext.tsx'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <MainProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </MainProvider>
)
