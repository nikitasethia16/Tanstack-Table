import {
  createColumnHelper,
} from "@tanstack/react-table";
import data from "./nestedStudent.json";
import {
    Box,
    Button,
  Checkbox,
} from "@mui/material";
import ToggleExpandTable from "./components/ToggleExpandTable";
import {ExpandMore, ExpandLess } from '@mui/icons-material';


const ToggleStudentTable = () => {
  const columnHelper = createColumnHelper();
  const columnDef = [
    columnHelper.display({
        id: 'actions',
        header: (props)=>(
               <Button onClick={props.table.getToggleAllRowsExpandedHandler()}>
            {props.table.getIsAllRowsExpanded() ? <ExpandLess/> : <ExpandMore /> } 
           </Button> 
        ),
        cell: (props) => (
          props.row.getCanExpand() ?   <Button onClick={props.row.getToggleExpandedHandler()}>
             {props.row.getIsExpanded() ? <ExpandLess/> : <ExpandMore /> } 
            </Button> : <Box px={4} >–</Box>
    )}),
      columnHelper.accessor("id", {
        header: "Id",
        footer:"id"
      }),
      columnHelper.group( {
        header: "Personal Details",
        columns:[
            columnHelper.accessor(row=>`${row.firstName} ${row.middleName} ${row.lastName}`, {
                header: "Full Name",
              }),
              columnHelper.accessor("email", {
                  header: "Email",
                }),
                // columnHelper.accessor(row=>`${row.standard} ${row.section}`, {
                //     header: "Standard",
                //   }),
                columnHelper.accessor("age", {
                  header: "Age",
                }),
        ]
      }),
    
      columnHelper.group( {
        header: "Address",
        columns: [
            columnHelper.accessor("address.pincode", {
                header: "Pincode",
              }),
              columnHelper.accessor("address.city", {
                header: "City",
              }),
              columnHelper.accessor("address.street", {
                header: "Street",
              }),
              columnHelper.accessor("address.state", {
                header: "State",
              }),
        ]
      }),
      
     
    //   columnHelper.accessor("date_of_birth", {
    //     header: "DOB",
    //   }),
  ];
  
  return (
<ToggleExpandTable
data={data}
column={columnDef}
subRowKey="subRows"
/>
  );
};
export default ToggleStudentTable;
