import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App({ Component, pageProps }) {
  return  (<div className="App"><Component {...pageProps} /></div>)
}
