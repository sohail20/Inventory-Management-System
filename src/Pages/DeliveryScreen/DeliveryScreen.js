import React, { useEffect,useRef,useState } from 'react';
import EnhancedTable from '../../Components/Table/Table';
import { useDispatch, useSelector } from 'react-redux';
import { FetchData } from '../../Store/Store/Actions/Actions';
import ReactToPrint from "react-to-print"
import { useHistory } from 'react-router-dom';
import SpeedDial from "../../Components/SpeedDial/SpeedDial"
import {IconButton} from "@material-ui/core"
import swal from "sweetalert"
//ICONS
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import PrintIcon from '@material-ui/icons/Print';
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteData } from '../../Store/Store/Actions/deleteData';
function createData(name, calories, fat, carbs, protein,six) {
    return { name, calories, fat, carbs, protein,six };
  }
  

function DeliveryScreen(props) {
  const dispatch =useDispatch()
  const history = useHistory()
  const state = useSelector(state => state.FetchReducer)
  const redirect = (val) => { history.push(val) }
  const [Refresh, setRefresh] = useState(false);
  const componentRef = useRef();

    const headCells = [
        { id: 'name', numeric: false, disablePadding: true, label: 'Item Name' },
        { id: 'calories', numeric: true, disablePadding: false, label: 'Quantity' },
        { id: 'fat', numeric: true, disablePadding: false, label: 'Price' },
        { id: 'carbs', numeric: true, disablePadding: false, label: 'Date Of Delivery' },
        { id: 'protein', numeric: true, disablePadding: false, label: 'Created At' },
        { id: 'TotalAmount', numeric: true, disablePadding: false, label: 'Total Amount' },

      ];
      
      useEffect(()=>{
        dispatch(FetchData("Deliveries.db"))
      },[Refresh])

  const rows = [];

  state.data&& state.data.map((val)=>{
      rows.push(createData(val.ItemName,val.Quanity,val.Price,val.DateDelivery,new Date(val.createdAt).toDateString(),val.TotalAmount))
  })
   // createData('Oreo', 437, 18.0, 63, 4.0),
   const actions = [
    { icon: <FileCopyIcon />, name: 'Add more', link:"/Add Delivery" },
    { icon: <IconButton onClick={()=>{
    
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this data!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          dispatch(deleteData(false,"Deliveries.db"))
          setRefresh(true)
        } else {
          swal("Your data is safe!");
        }
      });
      
    
    
    }}><DeleteIcon /></IconButton>, name: 'Delete' },
    { icon: <ReactToPrint
      trigger={() => <PrintIcon />}
      content={() => componentRef.current}
    />, name: 'Print' },
  ];

    return (
        <div>
            <SpeedDial actions={actions} redirect={redirect}/>
            {
              state.loading?<p>Loading...</p>:
              <div ref={componentRef} >
                <EnhancedTable headCells={headCells} rows={rows} title="Deliveries"/>
              </div>
            }
            
        </div>
    );
}

export default DeliveryScreen;