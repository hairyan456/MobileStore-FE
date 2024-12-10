import './index.css'
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import App from './views/App'
import { persistor, store } from './redux/store';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'nprogress/nprogress.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { PersistGate } from 'redux-persist/integration/react';

// Create a client
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
  // </StrictMode>
  ,
)
