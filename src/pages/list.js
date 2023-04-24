import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import NavbarAccommodations from '../components/navbar';
import { BASE_API_URL } from '@/constants';
import TableStriped from '@/components/table';
import { Row,Col,Accordion,Form,Button } from 'react-bootstrap';
import dynamic from "next/dynamic"
import withQuery from 'with-query';
import Spinner from 'react-bootstrap/Spinner';
import toast from 'react-hot-toast';

const MapAccomodation = dynamic(() => import("@/components/map"), { ssr:false })


const headers = ['AccommodationId','AccommodationLatitude', 'AccommodationLongitude', 'AccommodationTitle', 'AccommodationAdvertiser', 'AccommodationDescription', 'AccommodationIsReformed', 'AccommodationPhone', 'AccommodationType', 'AccommodationPrice', 'AccommodationPricePerMeter', 'AccommodationAddress', 'AccommodationProvince', 'AccommodationCity', 'AccommodationSquaredMeters', 'AccommodationNumberOfRooms', 'AccommodationNumberofBathrooms', 'AccommodationHasParking', 'AccommodationIsSecondHand', 'AccommodationHasFittedWardrobes', 'AccommodationYearBuilt', 'AccommodationIsFurnished', 'AccommodationHeatingType', 'AccommodationHasEnergeticCertification', 'AccommodationFloor', 'AccommodationIsExterior', 'AccommodationIsInterior', 'AccommodationHasElevator', 'AccommodationDate', 'AccommodationStreet', 'AccommodationNeighborhood', 'AccommodationDistrict', 'AccommodationHasRooftop', 'AccommodationHasStorageRoom', 'AccommodationIsKitchenEquipped', 'AccommodationIsFirstKitchenEquipped', 'AccommodationHasAirConditioner', 'AccommodationHasPool', 'AccommodationHasGarden', 'AccommodationUsefulSquaredMeters', 'AccommodationIsSuitableForPeopleWithReducedMobility', 'AccommodationNumberOfFloors', 'AccommodationIsPetFriendly', 'AccommodationHasBalcony']
export default function AccommodationsList() {
  const router = useRouter();
  const [validatedAuth, setValidatedAuth] = useState(false);
  const [accommmodations,setAccommodations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [minPrice,setMinPrice] = useState("");
  const [maxPrice,setMaxPrice] = useState("");
  const [numberOfRooms,setNumberOfRooms] = useState("");

  useEffect(()=>{
    if(localStorage.getItem("jwtAccommodation")=='null'){
        router.push("/");
    }else{
      setValidatedAuth(true);
    }
  })

  const fetchAccommodations = async () => {
    try{
      setIsLoading(true);
      let params = {minPrice,maxPrice,numberOfRooms};
      let  result = await fetch(withQuery(`${BASE_API_URL}/accommodation/getList`,params),{
        method: 'get',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("jwtAccommodation"), }

      })
      result = await result.json()    
      setAccommodations(result);
      setIsLoading(false)
    }catch(e){
      console.log(e)
      toast.error(e);
      setIsLoading(false);
    }
  };

  useEffect(()=>{
    fetchAccommodations();
  },[])

  return (
    validatedAuth ? <>
      <Head>
        <title>Vox Accommodations App</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main>
        <NavbarAccommodations></NavbarAccommodations>
        <div style={{marginLeft:'3vw', marginTop:'3vh',marginRight:'3vw'}}>
          <h2>List of Accommodations</h2>
          <Accordion defaultActiveKey="0" style={{marginTop:'2vh',marginBottom:'1vh'}}>
        <Accordion.Item eventKey="0">
            <Accordion.Header>Filters</Accordion.Header>
            <Accordion.Body>

            <Form onSubmit={(e)=>{e.preventDefault();fetchAccommodations();}}>
              <Row>
                <Col sm={12} md={4}>
                  <Form.Group className="mb-3" controlId="MinPrice">
                      <Form.Label>Min Price</Form.Label>
                      <Form.Control type="number" min={0} placeholder="Enter Min Price"  
                        // required
                        value={minPrice}
                        onChange={(e)=>setMinPrice(e.target.value)}
                        />
                      
                  </Form.Group>
                </Col>
                <Col sm={12} md={4}>
                  <Form.Group className="mb-3" controlId="Max Price">
                      <Form.Label>Max Price</Form.Label>
                      <Form.Control type="number" min={0} placeholder="Enter Max Price"  
                        // required
                        value={maxPrice}
                        onChange={(e)=>setMaxPrice(e.target.value)}
                        />
                      
                  </Form.Group>
                </Col>
                <Col sm={12} md={4}>
                  <Form.Group className="mb-3" controlId="NumberOfRooms">
                      <Form.Label>Number of Rooms</Form.Label>
                      <Form.Control type="number" min={0} placeholder="Enter Number of Rooms"  
                        // required
                        value={numberOfRooms}
                        onChange={(e)=>setNumberOfRooms(e.target.value)}
                        />
                      
                  </Form.Group>
                </Col>
              </Row>
                
              
                    <Button variant="primary" type="submit" style={{marginRight:'0.5vw'}} >
                        {'Filter'}
                    </Button >
                    {<Button variant="danger" style={{color:'white',marginRight:'0.5vw'}} onClick={()=>{setMaxPrice("");setMinPrice("");setNumberOfRooms("");fetchAccommodations();}}>
                        Reset Filter
                    </Button>}
              
            </Form>

            </Accordion.Body>
            
        </Accordion.Item>
        
        </Accordion>
          {isLoading ? <Spinner/>: <Row style={{marginBottom:'2vh'}}>
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
          </Row>}
        </div>

      </main>
    </> :<></>
  )
}
