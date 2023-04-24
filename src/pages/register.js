import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
const inter = Inter({ subsets: ['latin'] })
import { Navbar ,Container} from 'react-bootstrap'
import SignUp from '../components/signup';
export default function Home() {
  return (
    <>
      <Head>
        <title>Vox Accommodations App</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main>
          <Container>
              <SignUp />
          </Container>
      </main>
   
    </>
  )
}
