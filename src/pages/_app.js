// import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import  { Toaster } from 'react-hot-toast';
export default function App({ Component, pageProps }) {
  return  (<div className="App"><Component {...pageProps} /><Toaster/></div>)
}
