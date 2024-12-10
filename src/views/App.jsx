import './App.css'
import AppRoute from '../routes/AppRoute'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAppLogic from '../hooks/useAppLogic';
import { useEffect } from 'react';

function App() {

  // init Facebook SDK
  useEffect(() => {
    if (!window.FB) { // Kiểm tra xem Facebook SDK đã được khởi tạo chưa
      const appId = import.meta.env.VITE_APP_FB_ID;
      const script = document.createElement('script');
      script.src = 'https://connect.facebook.net/vi_VN/sdk.js';
      script.async = true;
      script.defer = true;
      script.crossOrigin = 'anonymous';
      script.onload = () => {
        window.FB.init({
          appId: appId,
          xfbml: true,
          version: 'v21.0',
        });
      };
      document.body.appendChild(script);
    }
  }, []);

  useAppLogic();

  return (
    <>
      <AppRoute />

      <ToastContainer position="top-right"
        autoClose={1800}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={true}
        theme="light"
        className={'col-6 col-sm-3'}
      />
    </>
  )
}

export default App
