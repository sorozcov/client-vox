
import {Button, Form, Row,Col, Card} from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useEffect,useState } from 'react';
import { BASE_API_URL } from '@/constants';

export default function SignUp(){
    useEffect(()=>{
        if(localStorage.getItem("jwtAccommodation")!='null'){
            router.push("\list");
        }
    })

    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleSignup = async function(e){
        e.preventDefault();
        try{
            let  result = await fetch(`${BASE_API_URL}/auth/signup`,{
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body:JSON.stringify({name,email,password})
            });
            let response = await result.json();
            if(response.insertId){
                router.push("/");
                alert("Account created succesfully.");
            }
        }catch(e){
            alert("Could not sign up succesfully.");
            console.log(e);
        }
    };
  

    return (
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-3 border-primary"></div>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2  d-flex justify-content-center">Sign Up Accomodations</h2>
                    <Form onSubmit={handleSignup}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" 
                        required
                        value={name}
                        onChange={(e)=>setName(e.target.value)}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" 
                        required
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}/>
                        </Form.Group>
                
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" 
                        required
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}/>
                        </Form.Group>
                        <Row>
                            <Button variant="primary" style={{margin:'auto',width:'50%',marginBottom:'2vh',marginTop:'2vh'}} type="submit">
                                Register
                            </Button>
                        </Row>
                        <Row>
                            <Button variant="danger" style={{margin:'auto',width:'50%',marginBottom:'2vh'}} onClick={()=>{router.push("/")}}>
                            Cancel
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