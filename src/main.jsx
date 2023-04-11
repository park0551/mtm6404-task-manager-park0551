import React from 'react'
import ReactDOM from 'react-dom/client'
import ListContextProvider from './contexts/ListContext'
import App from './App'
import Footer from './components/Footer'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ListContextProvider>
    <App />
    <Footer />
    </ListContextProvider>
  </React.StrictMode>,
)
