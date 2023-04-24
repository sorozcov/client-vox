import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
const inter = Inter({ subsets: ['latin'] })
import Login from '../components/login'
import { Navbar ,Container} from 'react-bootstrap'
export default function Home() {
  return (
    <>
      <Head>
        <title>Vox Accommodations App</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main>
          <Container>
              <Login />
          </Container>
      </main>
   
    </>
  )
}
