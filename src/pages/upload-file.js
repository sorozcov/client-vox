import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import NavbarAccommodations from '../components/navbar';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import { BASE_API_URL } from '@/constants';
import toast from 'react-hot-toast';
import { useForm } from "react-hook-form";

export default function UploadFile() {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  
  useEffect(()=>{
    if(localStorage.getItem("jwtAccommodation")=='null'){
        router.push("/");
    }
  })

  const handleUploadFile = async function(data){
  
  
    try{
        const formData = new FormData();
        console.log(data.file[0])
        formData.append("files", data.file[0]);
        let  result = await fetch(`${BASE_API_URL}/accommodation/uploadCSVFile`,{
            method: 'post',
            // headers: { 'Content-Type': 'multipart/form-data', 'Authorization': 'Bearer ' + localStorage.getItem("jwtAccommodation"), },
            body:formData
        });
        let response = await result.json();
        if(response.affectedRows){
            toast.success(`File uploaded succesfully with ${response.affectedRows}`);
        }else{
          toast.error("File not be uploaded succesfully. Check file again.");
        }
    }catch(e){
        toast.error("File not be uploaded succesfully. Check file again.");
        console.log(e);
    }
};

  return (
    <>
      <Head>
        <title>Vox Accommodations App</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main>
        <NavbarAccommodations></NavbarAccommodations>
        <div style={{marginLeft:'5vw', marginTop:'3vh'}}>
          <Form  
      onSubmit={handleSubmit(handleUploadFile)}>
        <Form.Group controlId="files" className="mb-3">
          <Form.Label>Add a file to populate accommodation</Form.Label>
          <Alert  variant={'warning'}>
            Remember that every accommodation should be unique and with the specified format.
          </Alert>
          <Form.Control type="file" size="lg" accept=".csv"  
          required
                      
          {...register("file")}/>
        </Form.Group>
        <Row>
         
        <Button variant="primary" 
        disabled={register("file")==null}
        style={{width:'25%',marginRight:'1%'}} type="submit">
                                Upload File
        </Button>
        
        </Row>
        </Form>
        </div>
      </main>
    </>
  )
}
