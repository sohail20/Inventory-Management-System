import React,{useEffect,useState,useRef} from 'react';
import EnhancedTable from '../../Components/Table/Table';
import SpeedDial from '../../Components/SpeedDial/SpeedDial';
import {IconButton} from "@material-ui/core"
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import PrintIcon from '@material-ui/icons/Print';
import DeleteIcon from '@material-ui/icons/Delete';
import swal from "sweetalert"
import {useHistory} from "react-router-dom"
import {useDispatch,useSelector} from "react-redux"
import { FetchData } from '../../Store/Store/Actions/Actions';
import ReactToPrint from "react-to-print"
import { deleteData } from '../../Store/Store/Actions/deleteData';
function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  

function ProductsScreen(props) {

  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector(state=>state.FetchReducer)
  const [Refresh, setRefresh] = useState(false);
  
  const componentRef = useRef();

  const redirect = (val) => { history.push(val) }

  useEffect(()=>{
    dispatch(FetchData("Products.db"))
  },[Refresh])
  


    const headCells = [
        { id: 'name', numeric: false, disablePadding: true, label: 'Item Name' },
        { id: 'calories', numeric: true, disablePadding: false, label: 'Purchase Price' },
        { id: 'fat', numeric: true, disablePadding: false, label: 'Selling Price' },
        { id: 'carbs', numeric: true, disablePadding: false, label: 'Note' },
        { id: 'protein', numeric: true, disablePadding: false, label: 'Profit' },
      ];
      

  const rows = [];

  state.data.map((val)=>{
    rows.push(createData(val.ItemName,val.PurchasePrice,val.SellPrice,val.Note,val.profit))
  })
  
  const actions = [
    { icon: <FileCopyIcon />, name: 'Add more', link:"/Add Product" },
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
          dispatch(deleteData(false,"Products.db"))
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
              <>
              
              <div ref={componentRef} >
                <EnhancedTable headCells={headCells} rows={rows} title="Products"/>
              </div>
              </>
            }
            
        </div>
    );
}

export default ProductsScreen;