import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { MainProvider } from './MainContext.tsx'
import { Provider } from 'react-redux'
import { store } from './app/store.ts'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <MainProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </MainProvider>
  </Provider>
)
