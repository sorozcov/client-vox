import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import NavbarAccommodations from '../components/navbar';
import { BASE_API_URL } from '@/constants';
import TableStriped from '@/components/table';
import { Row,Col } from 'react-bootstrap';
import dynamic from "next/dynamic"

const MapAccomodation = dynamic(() => import("@/components/map"), { ssr:false })


const headers = ['AccommodationId','AccommodationLatitude', 'AccommodationLongitude', 'AccommodationTitle', 'AccommodationAdvertiser', 'AccommodationDescription', 'AccommodationIsReformed', 'AccommodationPhone', 'AccommodationType', 'AccommodationPrice', 'AccommodationPricePerMeter', 'AccommodationAddress', 'AccommodationProvince', 'AccommodationCity', 'AccommodationSquaredMeters', 'AccommodationNumberOfRooms', 'AccommodationNumberofBathrooms', 'AccommodationHasParking', 'AccommodationIsSecondHand', 'AccommodationHasFittedWardrobes', 'AccommodationYearBuilt', 'AccommodationIsFurnished', 'AccommodationHeatingType', 'AccommodationHasEnergeticCertification', 'AccommodationFloor', 'AccommodationIsExterior', 'AccommodationIsInterior', 'AccommodationHasElevator', 'AccommodationDate', 'AccommodationStreet', 'AccommodationNeighborhood', 'AccommodationDistrict', 'AccommodationHasRooftop', 'AccommodationHasStorageRoom', 'AccommodationIsKitchenEquipped', 'AccommodationIsFirstKitchenEquipped', 'AccommodationHasAirConditioner', 'AccommodationHasPool', 'AccommodationHasGarden', 'AccommodationUsefulSquaredMeters', 'AccommodationIsSuitableForPeopleWithReducedMobility', 'AccommodationNumberOfFloors', 'AccommodationIsPetFriendly', 'AccommodationHasBalcony']
export default function AccommodationsList() {
  const router = useRouter();
  const [accommmodations,setAccommodations] = useState([]);
  useEffect(()=>{
    if(localStorage.getItem("jwtAccommodation")=='null'){
        router.push("/");
    }
  })

  const fetchAccommodations = async () => {
    try{
      let  result = await fetch(`${BASE_API_URL}/accommodation/getList`,{
        method: 'get',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("jwtAccommodation"), }

      })
      result = await result.json()    
    
      setAccommodations(result);
    }catch(e){
      console.log(e)
    }
  };

  useEffect(()=>{
    fetchAccommodations();
  },[])

  return (
    <>
      <Head>
        <title>Vox Accommodations App</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main>
        <NavbarAccommodations></NavbarAccommodations>
        <div style={{marginLeft:'3vw', marginTop:'3vh',marginRight:'3vw'}}>
          <h2>List of Accommodations</h2>
          
          <Row>
            <Col sm={12} md={8}>
            
         
              <div style={{overflow:'scroll',height:'72vh'}}> 
                <TableStriped headers={headers} data={accommmodations}/>
              </div>
            </Col>
            <Col sm={12} md={4}>
             <div style={{height:'72vh',width:'100%'}}> 
              <MapAccomodation data={accommmodations}/>
              </div>
            </Col>
          </Row>
        </div>

      </main>
    </>
  )
}
