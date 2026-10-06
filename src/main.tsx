/// <reference types="vite-plugin-pwa/client" />

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { registerSW } from "virtual:pwa-register"
import { RouterProvider } from "react-router-dom"
import { router } from "./routes"

registerSW({
  onOfflineReady() {
    console.log("App ready to work offline")
  },

  onNeedRefresh() {
    console.log("New version available")
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
