import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableFooter,
  TableHead,
} from "@mui/material";
import {StyledTableCell, StyledTableRow } from "../styles";
import { useState } from "react";


const ToggleExpandTable = ({data, column, subRowKey}) => {
    const [expanded, setExpanded]=useState({})
  const tableInstance = useReactTable({
    data: data,
    columns: column,
    getCoreRowModel: getCoreRowModel(),
    state:{
        expanded
    },
   getSubRows: (row) => row[subRowKey],
    onExpandedChange:setExpanded,
    getExpandedRowModel:getExpandedRowModel()

});
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ maxWidth:'700'}} border={1}>
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
                <>
              <StyledTableRow key={rowEl.id} sx={{backgroundColor: rowEl.depth==1 ? "#E0F7FA" : rowEl.depth==2 ? '#F8BBD0' : "transparent" }}>
                {rowEl.getVisibleCells().map((cellEl) => (
                  <StyledTableCell component="th" scope="row" key={cellEl.id}>
                    {flexRender(
                      cellEl.column.columnDef.cell,
                      cellEl.getContext()
                    )}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
    {/* if customize view of expanded data  */}
    {/* {rowEl.getIsExpanded() && rowEl.subRows.map((subRow) => (
        <StyledTableRow key={subRow.id}>
          {subRow.getVisibleCells().map((cellEl) => (
            <StyledTableCell key={cellEl.id}>
              {flexRender(
                cellEl.column.columnDef.cell,
                cellEl.getContext()
              )}
            </StyledTableCell>
          ))}
        </StyledTableRow>
      ))} */}
      </>

            ))}
          </TableBody>
          <TableFooter>
      {tableInstance.getFooterGroups().map(footerGroup => (
        <StyledTableRow key={footerGroup.id}>
          {footerGroup.headers.map(footer => (
            <StyledTableCell key={footer.id} colSpan={footer.colSpan} component="th" scope="row">
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
export default ToggleExpandTable;
