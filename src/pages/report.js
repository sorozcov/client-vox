import Head from 'next/head'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import NavbarAccommodations from '../components/navbar';
import { Container,Dropdown,DropdownButton } from 'react-bootstrap';
import withQuery from 'with-query';
import { BASE_API_URL } from '@/constants';

export default function GenerateReport() {
  const router = useRouter();
  
  useEffect(()=>{
    if(localStorage.getItem("jwtAccommodation")=='null'){
        router.push("/");
    }
  })

  const generateReport = async(format)=>{
    try{
      let params = {reportType:format,latitude:40.3645, longitude:-3.58329,distanceKm:5,} 
      let  result = await fetch(withQuery(`${BASE_API_URL}/accommodation/getAccommodationsReport`,params),{
        method: 'get',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("jwtAccommodation"), }

      })
      result = await result.json()    
      console.log(result)
      const link = document.createElement('a');
      link.href = result.file;
    
  
      // Append to html link element page
      document.body.appendChild(link);
  
      // Start download
      link.click();
  
      // Clean up and remove the link
      link.parentNode.removeChild(link);
      
    }catch(e){
      console.log(e)
    }
  }
  return (
    <>
      <Head>
        <title>Vox Accommodations App</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main>
        <NavbarAccommodations></NavbarAccommodations>
        <div style={{marginLeft:'5vw', marginTop:'3vh'}}>
          <h2>Generate report of accommodations</h2>
         
          <DropdownButton  title="Download report in format" style={{marginTop:'2vh'}}>
            <Dropdown.Item onClick={()=>{generateReport('pdf')}}>PDF</Dropdown.Item>
            <Dropdown.Item onClick={()=>{generateReport('csv')}}>CSV</Dropdown.Item>
          </DropdownButton>
          
        </div>
      </main>
    </>
  )
}
