import React, { useEffect, useState } from 'react'
import{GetStatus} from '../../../service/StatusService'
import {useNavigate,useLocation} from 'react-router-dom'
import { useFormik } from 'formik';
import { Col, Row } from 'react-bootstrap';
import { SmallInput } from '../../../shared/SamllInput';
import MediaValidation from './MediaValidation';
import {Update_Media} from '../../../service/MediaTypeService'
import { toast } from 'react-toastify';

const UpdateMedia = () => {
    const [status,setStatus] =useState([])
    let navigate = useNavigate()
    const location = useLocation();
    useEffect(()=>{
      getStatus()
    },[])
      const formik = useFormik({
          initialValues: {
            media:location.state.media,
            description:location.state.description,
              statusId:location.state.statusId
          },
          validationSchema:MediaValidation,
          onSubmit: values => {
              console.log(values)
            },
          });
         const UpdateMediaType = () =>{
            const data = Object.assign(formik.values,{id:location.state.id})
            Update_Media(data,location.state.id).then(res=>{
              if(res?.data?.isSuccess){
                toast.success("Updated Scuccess")
                navigate('/MediaTypes')
              }
              else{
                toast.error(res?.data?.errorMessages)
              }
            }).then()
            
         }
         const getStatus =()=>{
          GetStatus().then(res=>{
            console.log(res)
            if(res.status)
              setStatus(res.data.result)
          })
        }
        const handleCancle =()=>{
          navigate('/MediaTypes')
        }
        return (
          <div  className='container p-2 col-11 col-sm-10 col-lg-12 mt-5'>
            
              <form id="formik-form" onSubmit={formik.handleSubmit} className="ml-2 p-2 mt-2 m-auto col-lg-7">
              <h2 className=' fromheading my-1 p-0 text-center'>Update Media Types</h2>  
              <Row className='my-3 mx-1' >
              <Col m={6} sm={12} lg={12} ml-0>
              <SmallInput  
              name="media"
              id="media"
              label="Media :"
              span="*"
              placeholder="Enter your media Type"
              {...formik.getFieldProps("media")}
              />
                    {formik.touched.media && formik.errors.media ? (
               <p style={{color:"red",textAlign:"center"}}>{formik.errors.media}</p>
             ) : null}
              </Col>
              </Row>
              <Row className='my-3 mx-1' >
              <Col m={6} sm={12} lg={12} ml-0>
              <SmallInput  
              name="description"
              id="description"
              label="Description :"
              placeholder="Enter your Media Description"
              {...formik.getFieldProps("description")}
              />
                    {formik.touched.description && formik.errors.description ? (
               <p style={{color:"red",textAlign:"center"}}>{formik.errors.description}</p>
             ) : null}
              </Col>
              </Row>
              <Row className='my-3 mx-1' >
                <Col m={6} sm={12} lg={4} ml-0  className='p-1'>
                <label htmlFor="Statusid"className="form-label col-sm-10 col-lg-12 p-0 text-lg-right float-sm-left">
               Status :<span style={{color:'red',fontSize:'20px'}}>*</span>
               </label>
               </Col>
              
              <Col m={6} sm={12} ml-0 lg={6} className='p-1'>
               <select className='form-Control ml-0 col-sm-12 col-lg-12'
                  style={{with:70,padding:'10px',borderRadius:'5px' ,border:' 1px solid lightgray'}}
                name="Statusid"
                type="number"
                {...formik.getFieldProps("statusId")}
               >
                  <option value=" " label="Select Status" />
               {status.map(item=>(
                <option value={item.id} label={item.statusType} />
                ))}
              </select>
              {formik.touched.statusId && formik.errors.statusId ? (
                 <p style={{color:"red",textAlign:"left"}}>{formik.errors.statusId}</p>
               ) : null}
              </Col>
                </Row>
                <Row className='my-3 mx-1 justify-content-center'>
                <Col m={6} sm={12} ml-0 lg={6}>
                <button type="submit" className='btn  btn-outline-info ml-0 col-sm-10 col-lg-4 my-1 float-right' onClick={()=>UpdateMediaType()}>Submit</button>
                
                </Col>
                <Col m={6} sm={12} ml-0 lg={6}>
                <button type="submit" className='btn  btn-outline-danger ml-0 col-sm-10 col-lg-4 my-1'  onClick={()=>handleCancle()}>Cancel</button>
                  </Col>
                </Row>
              </form>
          </div>
        )
}

export default UpdateMedia