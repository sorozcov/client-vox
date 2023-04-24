
import {Button, Form, Row,Col, Card} from 'react-bootstrap';
import { useRouter } from 'next/router'
import { useState,useEffect } from 'react';
import { BASE_API_URL } from '../../constants';

export default function Login(){
    useEffect(()=>{
        if(localStorage.getItem("jwtAccommodation")!='null'){
            router.push("\home");
        }
    })

    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async function(e){
        e.preventDefault();
        try{
            let  result = await fetch(`${BASE_API_URL}/auth/login`,{
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body:JSON.stringify({email,password})
            });
            let jwtToken = await result.json();
            localStorage.setItem("jwtAccommodation", jwtToken);
            router.push("\home");
        }catch(e){
            alert("Could not login.")
            console.log(e)
        }
    };

    return (
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-3 border-primary"></div>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2  d-flex justify-content-center">Login Accomodations</h2>
                    <Form onSubmit={handleLogin}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" 
                        required
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        />
                        </Form.Group>
                
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" 
                        required
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        />
                        </Form.Group>
                        <Row>
                            <Button variant="primary" style={{margin:'auto',width:'50%',marginBottom:'2vh',marginTop:'2vh'}} type="submit">
                                Login
                            </Button>
                        </Row>
                        <Row>
                            
                                <Button variant="secondary" style={{margin:'auto',width:'50%',marginBottom:'2vh'}} onClick={()=>{router.push("/register")}}>
                                    Register
                                </Button>
                           
                        </Row>
                </Form>
                </div>
                </Card.Body>
            </Card>
            <div className="border border-3 border-primary"></div>
          </Col>
         </Row>
    )
}