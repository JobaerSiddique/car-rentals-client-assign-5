
import { createRoot } from 'react-dom/client'

import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/routes'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { Toaster } from 'sonner'




createRoot(document.getElementById('root')!).render(
  
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}></PersistGate>
    <RouterProvider router={router}/>
    <Toaster />
    </Provider>,
    

)
