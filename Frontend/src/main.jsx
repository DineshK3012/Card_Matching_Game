import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {RecoilRoot} from "recoil";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <RecoilRoot >
          <App />
          <ToastContainer
              position="top-right"
              autoClose={1500}
              closeOnClick
              pauseOnHover
          />
      </RecoilRoot>
  </StrictMode>,
)
