
import { createRoot } from 'react-dom/client'
import './styles.css'
import App from './App'
import { Suspense } from 'react'
import Header from './Header'
import PageProvider from './context/pageProvider'


createRoot(document.getElementById("root")).render(
    <>
        <PageProvider>
          <Suspense >  
              <App />
              <Header/>
          </Suspense>
        </PageProvider>
    </>
  )
  