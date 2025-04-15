import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastContainer } from "react-toastify";
import {AuthProvider} from './Components/context/AuthConetxt.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <App />
    <ToastContainer/>
    </AuthProvider>
  </StrictMode>,
)
