import { Container,Navbar, Nav } from 'react-bootstrap';

import { useRouter } from 'next/router';

export default function NavbarAccommodations(){
    const router = useRouter();
    return(<Navbar bg="primary" variant="dark" expand={true} style={{paddingLeft:'5vw',paddingRight:'5vw',paddingTop:'3vh',paddingBottom:'3vh'}}>
          {/* <Container> */}
            <Navbar.Brand >Accommodations App</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link onClick={()=>{router.push("/list")}}>Accommodations List</Nav.Link>
              <Nav.Link onClick={()=>{router.push("/upload-file")}}>Upload CSV File</Nav.Link>
              <Nav.Link onClick={()=>{router.push("/report")}}>Generate Report</Nav.Link>

              <div style={{marginLeft:'45vw'}}><Nav.Link onClick={()=>{localStorage.setItem("jwtAccommodation",null);router.push("/");}}>Logout</Nav.Link></div>
            </Nav>
          {/* </Container> */}
    </Navbar>)
}