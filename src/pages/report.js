import Head from 'next/head'
import { useEffect,useState } from 'react'
import { useRouter } from 'next/router'
import NavbarAccommodations from '../components/navbar';
import { Container,Dropdown,DropdownButton } from 'react-bootstrap';
import withQuery from 'with-query';
import { BASE_API_URL } from '@/constants';
import { Row,Col,Accordion,Form,ButtonGroup,Button } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import toast from 'react-hot-toast';

export default function GenerateReport() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [minPrice,setMinPrice] = useState("");
  const [maxPrice,setMaxPrice] = useState("");
  const [numberOfRooms,setNumberOfRooms] = useState("");
  const [latitude,setLatitude] = useState("");
  const [longitude,setLongitude] = useState("");
  const [distanceKm,setDistanceKm] = useState("");
  const [reportType, setReportType] = useState("");
  useEffect(()=>{
    if(localStorage.getItem("jwtAccommodation")=='null'){
        router.push("/");
    }
  })

  const generateReport = async()=>{
    try{
      setIsLoading(true);
      let params = {reportType:reportType,latitude, longitude,distanceKm,minPrice,maxPrice,numberOfRooms} 
      console.log(params);
      let  result = await fetch(withQuery(`${BASE_API_URL}/accommodation/getAccommodationsReport`,params),{
        method: 'get',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("jwtAccommodation"), }

      })
      result = await result.json()   
      if(result.file){
        //download code 
        const link = document.createElement('a');
        link.href = result.file;
        document.body.appendChild(link);    
        link.click();
        link.parentNode.removeChild(link);
        toast.success(`Report generated succesfully.`)
      }else{
        toast.error("Report could not be generated.")
      }
      setIsLoading(false)
    }catch(e){
      console.log(e)
      
      setIsLoading(false);
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
          <Accordion defaultActiveKey="0" style={{marginTop:'2vh',marginBottom:'1vh'}}>
        <Accordion.Item eventKey="0">
            <Accordion.Header>Filters</Accordion.Header>
            <Accordion.Body>

            <Form onSubmit={(e)=>{e.preventDefault();generateReport();}}>
            <Row>
                <Col sm={12} md={4}>
                  <Form.Group className="mb-3" controlId="Latitude">
                      <Form.Label>Latitude</Form.Label>
                      <Form.Control type="number"  step={0.000000001} min={-90} max={+90} placeholder="Enter Latitude"  
                        required
                        value={latitude}
                        onChange={(e)=>setLatitude(e.target.value)}
                        />
                      
                  </Form.Group>
                </Col>
                <Col sm={12} md={4}>
                  <Form.Group className="mb-3" controlId="Longitude">
                      <Form.Label>Longitude</Form.Label>
                      <Form.Control type="number"  step={0.000000001} min={-180} max={180} placeholder="Enter Longitude"  
                        required
                        value={longitude}
                        onChange={(e)=>setLongitude(e.target.value)}
                        />
                      
                  </Form.Group>
                </Col>
                <Col sm={12} md={4}>
                  <Form.Group className="mb-3" controlId="DistanceKm">
                      <Form.Label>Distance Km</Form.Label>
                      <Form.Control type="number"  step={0.000000001} min={0} placeholder="Distance Km"  
                        required
                        value={distanceKm}
                        onChange={(e)=>setDistanceKm(e.target.value)}
                        />
                      
                  </Form.Group>
                </Col>
              </Row>
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
                
              
                    <Button variant="primary"  type={"submit"} style={{marginRight:'0.5vw'}}  onClick={()=>setReportType('pdf')}>
                        {'Generate PDF Report'}
                    </Button >
                    <Button variant="primary"  type={"submit"} style={{marginRight:'0.5vw'}}  onClick={()=>setReportType('csv')}>
                        {'Generate CSV Report'}
                    </Button >
                    {<Button variant="danger" style={{color:'white',marginRight:'0.5vw'}} onClick={()=>{setMaxPrice("");setMinPrice("");setNumberOfRooms("");setLongitude("");setLatitude("");setDistanceKm("")}}>
                        Reset Filters
                    </Button>}
              
            </Form>

            </Accordion.Body>
            
        </Accordion.Item>
        
        </Accordion>
        {isLoading ? <Spinner/> :<></>}
          
        </div>
      </main>
    </>
  )
}
