/* eslint-disable no-undef */
import React ,{useState,useEffect} from 'react'
import { GetGSTClients , DeleteGSTClient } from '../../../service/GstClientService'
import MaterialTable from 'material-table'
import {Link,useNavigate} from 'react-router-dom'
import { FaEdit } from "react-icons/fa";
import { BsEye } from "react-icons/bs";

const GstClientTable = (props) => {
  let navigate = useNavigate();
  const columns = [
    
    {title: "Proprietor Name", field:"proprietorName"},
    {title: "GST Tin No", field:"gstin"},
    {title: "GST User Name", field:"gstUserName"},
    {title: "GST Email", field:"gstEmailId"},
    {title: "Phone Number", field:"phoneNumber"},
    {title: "Rack File No", field:"rackFileNo"},
    {title: "Status", field:"status.statusType", cellStyle:(e,rowData)=>{
      rowData.status.statusType === "ACTIVE"? <p style={{color:"green"}}> </p>:
      <p style={{color:"red"}}>{rowData.status.statusType} </p>
    }}
  ]
    const [list, setList] = useState([])
    useEffect(() => {
     
     GetDetails();
    }, [])
    //getting client details
    const GetDetails = ()=>{
        GetGSTClients().then((res)=>{setList(res.data.result)})
    }
    const GoEdit = (item)=>{
      console.log(props , item)
      navigate('/gstedit', { state: item })
  }
  const GoView = (item)=>{
    console.log(props , item)
    navigate('/gstview', { state: item })
}
  const deleteGSTClient = (item)=>{
    console.log(props , item)
    DeleteGSTClient(item.id).then((res)=>{
      GetDetails();
    })
}

  console.log("list for table",list)
  return (
    <div className='Table-div'>
      <div className='headcontainer'>
        <h2 className="Tableheading">GST Client details</h2>
        <Link to="/gstform"> <button className='btn btn-success ml-1  mt-2 m-0' >Add</button></Link>
         {/* <button className='btn btn-success ml-1  mt-2 ml-3' onClick={()=>setShowAdd(true)} >Add</button>  */}
      </div>

  <div style={{ maxWidth: '100%' }} className='container mt-2 my-2 '>
        <MaterialTable
       
           title="GST Clients"
           data={list}
           columns={columns}
           actions={[
            rowData=>({icon: ()=><FaEdit style={{color:"green"}} />,
            tooltip: 'edit User',
            onClick:(event,rowData)=>GoEdit(rowData)
            }),
            rowData=>({icon: ()=><BsEye style={{color:"blue"}}/>,
            tooltip: 'view User',
            onClick:(event,rowData)=>GoView(rowData)
            }),
            rowData=>( {
              icon: 'delete',
              iconProps: { color: 'secondary' },
              tooltip: 'dalete User',
              onClick:(event,rowData)=>deleteGSTClient(rowData)
            }),
          ]}
          options={{
            exportButton: true,
            actionsColumnIndex: -1,
           
        
          }}
          
        />
      </div>
  </div>
  )
}

export default GstClientTable