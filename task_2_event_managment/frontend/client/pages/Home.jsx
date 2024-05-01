import React, { useContext, useEffect, useState } from "react";
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Spinnner from "../components/Spinner";
import Card from 'react-bootstrap/Card';
import { FetchPostFunc ,addInterestFunc} from "../Services/services";
import { toast,ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { addData, addData2 } from "../components/ContextProvider";

export default function Home() {

  const [spin, setSpin] = useState(false);
  const [posts, setPosts] = useState([]);
  const [checkLength, setLength] = useState(false); // Initialize checkLength to false
  const navigate = useNavigate();
  const {key,setKey}=useContext(addData);
 

  useEffect(() => {
    console.log("key="+key);
    getData();
    const timer = setTimeout(() => {
      setSpin(true);
    }, 3000);
    
    // Clean up the timer to avoid memory leaks
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Check the length of posts when it changes
    if (posts.length > 0) {
      setLength(true);
    } else {
      setLength(false);
    }
  }, [posts]);

  async function getData() {
    try {
      const res = await FetchPostFunc();
      console.log(res.data.arr);
      setPosts(res.data.arr);
    } catch (e) {
      console.log(e);
      toast.error("Server error");
    }
  }

  function handleClick(id) {
  
      navigate(`/EventInfo/${id}`); // Ensure you're passing the parameter correctly

    
    
  }
 
  async function handleSubmit(_id,elem_id){
    console.log("key="+key);
    if(key){
      try{
        const res=await addInterestFunc({"username":key,"id":_id});
      
           if(res && res.data.status===200){
             const d= document.getElementById(elem_id);
             d.innerText="Interest Added";
             d.style.backgroundColor="red";
             d.style.color="white";
           }
          else{
        
            toast.error("Something went wrong");
          }
           }catch(e){
           
            console.log(e)
            toast.error("Something went wrong");
           }
    }
     else{
      toast('you nead to login first');
     }
  }
   
  return (
    <>
      {spin ? (
        <Stack gap={2} className="col-md-5 mx-auto">
          {checkLength ? (
            posts.map((elem, index) => (
              <Card key={index}  >
                <Card.Header as="h5">Event Created By {elem.createdBy}</Card.Header>
                <Card.Body>
                  <Card.Title>{elem.title}</Card.Title>
                  <Card.Text>{elem.description}</Card.Text>
                  <Card.Text>{elem.date}</Card.Text>
                  <Card.Text>{elem.time}</Card.Text>
               <span>
                  <Button variant="primary" id={index} onClick={()=>{ handleSubmit(elem._id,index)} }>Show interest</Button>
                  {"      "}
                  <Button variant="primary" id={index} onClick={()=>{ handleClick(elem._id); }}>Total interest</Button>
                
                </span>   
               
                </Card.Body>
              </Card>
            ))
          ) : (
            <Card onClick={handleClick}>
              <Card.Header as="h5">Event</Card.Header>
              <Card.Body>
                <Card.Title>No event yet</Card.Title>
              </Card.Body>
            </Card>
          )}
        </Stack>
      ) : (
        <Stack gap={2} className="col-md-5 mx-auto">
          <Spinnner animation="border" />
        </Stack>
      )}
<ToastContainer />
    </>
  );
}
