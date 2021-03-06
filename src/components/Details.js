import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Form, ProgressBar, Row } from 'react-bootstrap';
import {  useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const Details = () => {


  const navigate = useNavigate();
  const  filteredList  = useSelector(state =>state.Reducer.productList)
  const location = useLocation();
  const itemList = location.state;
  const [newList] = filteredList?.filter(e => {
    return e.id === itemList.newId
  })
  const [listSubj] = newList.subjects?.filter(e => {
    return e.id === itemList.id
  });
  const [first, setfirst] = useState(listSubj?.isDone);
  const [target, setTarget] = useState();
  const [targetDone, setTargetDone] = useState();
  
  useEffect ( async ()  => {
    listSubj.isDone = first
    console.log((newList))
    await axios.put(`https://workingpro.herokuapp.com/dersler/${itemList.newId}`, newList)
  }, [first])


  const handleSubmitTarget = async (e) =>{
    e.preventDefault();
    listSubj.target =  parseInt(target);
    await axios.put(`https://workingpro.herokuapp.com/dersler/${itemList.newId}`, newList)
    setTarget("")

  }
  const handleSubmitTargetDone = async (e) =>{
    e.preventDefault();
    listSubj.targetDone =  parseInt(targetDone) + parseInt(listSubj.targetDone);
    const rate =  listSubj.targetDone / listSubj.target * 100 
    listSubj.targetRate = parseFloat(rate);
    await axios.put(`https://workingpro.herokuapp.com/dersler/${itemList.newId}`, newList)
    setTargetDone("")
  }  
  
  const newId = itemList.newId
  const handleReset = async (e) =>{
    e.preventDefault();
    listSubj.targetDone =  0;
    listSubj.targetRate = 0;
    listSubj.target = 0;
    listSubj.isDone = false;
    await axios.put(`https://workingpro.herokuapp.com/dersler/${itemList.newId}`, newList)
    navigate("/alan", {state : {newId}})
  }  



  return (
    <div>
      <Button onClick={() => navigate("/alan", {state : {newId}})}>GER??</Button>
      <Alert variant= 'danger'>
    Konu Tamamlama
  </Alert>
    {itemList.selectedItem?.map(e => (


    <Form key = {e.id}>
    <Alert variant='warning' style={{textAlign:"center"}}>
    <Form.Check 
    type="switch"
    id="custom-switch"
    label= { `Konu tamamlama onay?? : ` + e.subj}
    onChange = {(e) => setfirst(e.target.checked)}
    checked= {first}
    className ='checkbox'
  />


    </Alert>
  
</Form>
    ))}

    <Form className='form-control'  onSubmit={handleSubmitTarget} >
    <Form.Group className='targetQua'   >
    <Form.Label className="form-label" >Hedef Soru Say??s??</Form.Label>
    <Form.Control  className="form-form" onChange= {(e) => setTarget(e.target.value)} value={target}  type="text" placeholder="Soru Say??s??" />
    <Button className="form-buttons"  variant="primary" type="submit">
    Hedefe G??nder
  </Button>
  </Form.Group>
    </Form>

    <Form className='form-control' onSubmit={handleSubmitTargetDone} >
  <Form.Group className='targetQua'  >
    <Form.Label  className="form-label" >????z??len Soru Say??s??n?? Giriniz</Form.Label>
    <Form.Control  className="form-form"  onChange= {(e) => setTargetDone(e.target.value)} value={targetDone}  type="text" placeholder="Soru Say??s??" />
    <Button className="form-buttons"  type="submit">
    Hedefe G??nder
  </Button>
  </Form.Group>
 
</Form>


    <Alert className='targetQua' >
    <p>Hedef  {listSubj.target !== 0 ? listSubj.target : "Hedef giriniz" }</p>
    <p>????z??len Soru Say??s??  {listSubj.targetDone !== 0 ? listSubj.targetDone : "0"}</p>
  <Button onClick={handleReset} className="form-buttons" >SIFIRLA</Button>
  </Alert>
  <ProgressBar className='progressBar' animated now={listSubj.targetRate} label={"% " + listSubj.targetRate} />
      </div>

  ) 
};

export default Details;
