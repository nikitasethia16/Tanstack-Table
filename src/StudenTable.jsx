import {
  createColumnHelper,
} from "@tanstack/react-table";
import data from "./students.json";
import {
  Checkbox,
} from "@mui/material";
import ResizeTable from "./components/ResizeTable";


const StudentTable = () => {
  const columnHelper = createColumnHelper();
  const columnDef = [
    columnHelper.display({
        id: 'actions',
        cell: props => <Checkbox/>,
      }),
      columnHelper.accessor("id", {
        header: "Id",
        footer:"id"
      }),
      columnHelper.group( {
        header: "Personal Details",
        columns:[
            columnHelper.accessor("name", {
                header: "Name",
              }),
              columnHelper.accessor("email", {
                  header: "Email",
                }),
                columnHelper.accessor("phone", {
                  header: "Phone",
                }),
                columnHelper.accessor("standard", {
                  header: "Standard",
                }),
                columnHelper.accessor("section", {
                  header: "Section",
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
<ResizeTable
data={data}
column={columnDef}
enableColumnResizing={true}
/>
  );
};
export default StudentTable;
