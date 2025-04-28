import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import data from "../students.json";
import {
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableFooter,
  TableHead,
} from "@mui/material";
import { StyledResize, StyledTableCell, StyledTableRow } from "../styles";


const Basictable = () => {
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
  const tableInstance = useReactTable({
    data: data,
    columns: columnDef,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ maxWidth:'700' }} border={1}>
          <TableHead>
            {tableInstance.getHeaderGroups().map((headerEl) => (
              <StyledTableRow key={headerEl.id}>
                {headerEl.headers.map((columnEl) => (
                  <StyledTableCell key={columnEl.id} colSpan={columnEl.colSpan} align="center">
                   {columnEl.isPlaceholder ? null : flexRender(columnEl.column.columnDef.header, columnEl.getContext())}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableHead>
          <TableBody>
            {tableInstance.getRowModel().rows.map((rowEl) => (
              <StyledTableRow key={rowEl.id}>
                {rowEl.getVisibleCells().map((cellEl) => (
                  <StyledTableCell component="th" scope="row" key={cellEl.id}>
                    {flexRender(
                      cellEl.column.columnDef.cell,
                      cellEl.getContext()
                    )}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
          <TableFooter>
      {tableInstance.getFooterGroups().map(footerGroup => (
        <StyledTableRow key={footerGroup.id}>
          {footerGroup.headers.map(footer => (
            <StyledTableCell key={footer.id} colSpan={footer.colSpan} component="th" scope="row" sx={{width:footer.getSize()}}>
              {flexRender(
                footer.isPlaceholder ? null : footer.column.columnDef.footer,
                footer.getContext()
              )}
            </StyledTableCell>
          ))}
        </StyledTableRow>
      ))}
    </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
};
export default Basictable;
