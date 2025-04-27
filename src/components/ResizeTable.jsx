import { 
  flexRender,
  getCoreRowModel,
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
import { StyledResize, StyledTableCell, StyledTableRow } from "../styles";


const ResizeTable = ({data, column, enableColumnResizing}) => {
  const tableInstance = useReactTable({
    data: data,
    columns: column,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode:'onChange' | 'onEnd',
    enableColumnResizing:enableColumnResizing
  });
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ width:enableColumnResizing ? tableInstance.getTotalSize() : '100%'  }} border={1}>
          <TableHead>
            {tableInstance.getHeaderGroups().map((headerEl) => (
              <StyledTableRow key={headerEl.id}>
                {headerEl.headers.map((columnEl) => (
                  <StyledTableCell key={columnEl.id} colSpan={columnEl.colSpan} align="center"  sx={{width:columnEl.getSize(),position: 'relative', 
                    overflow: 'visible'}}>
                   {columnEl.isPlaceholder ? null : flexRender(columnEl.column.columnDef.header, columnEl.getContext())}
                   {columnEl.column.getCanResize() && (
                   <StyledResize resize={columnEl.column.getIsResizing() ? true : false} onMouseDown={columnEl.getResizeHandler()} onTouchStart={columnEl.getResizeHandler()}
                   style={{
                    transform:columnEl.column.getIsResizing() ? `translateX(${tableInstance.getState().columnSizingInfo.deltaOffset}px)` : ''
                   }}
                   ></StyledResize>
                )}
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
export default ResizeTable;
