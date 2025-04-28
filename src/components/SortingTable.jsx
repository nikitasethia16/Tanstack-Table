import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import data from "../students.json";
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
} from "@mui/material";
import { StyledTableCell, StyledTableRow } from "../styles";
import { useState } from "react";
//  sorting table with pagination
const SortingTable = () => {
  const columnHelper = createColumnHelper();
  const columnDef = [
    columnHelper.accessor("id", {
      header: "Id",
    }),

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

    //   columnHelper.accessor("date_of_birth", {
    //     header: "DOB",
    //   }),
  ];

  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const tableInstance = useReactTable({
    data: data,
    columns: columnDef,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
      pagination,
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ maxWidth: "700" }} border={1}>
          <TableHead>
            {tableInstance.getHeaderGroups().map((headerEl) => (
              <StyledTableRow key={headerEl.id}>
                {headerEl.headers.map((columnEl) => (
                  <StyledTableCell
                    key={columnEl.id}
                    colSpan={columnEl.colSpan}
                    align="center"
                  >
                    {columnEl.isPlaceholder ? null : (
                      <>
                        {flexRender(
                          columnEl.column.columnDef.header,
                          columnEl.getContext()
                        )}
                        {columnEl.column.getCanSort() && (
                          <TableSortLabel
                            active={columnEl.column.getIsSorted()}
                            direction={columnEl.column.getIsSorted() || "asc"}
                            onClick={columnEl.column.getToggleSortingHandler()}
                            sx={{
                              "&.Mui-active .MuiTableSortLabel-icon": {
                                color: "white",
                              },
                            }}
                          />
                        )}
                      </>
                    )}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableHead>
          <TableBody>
            {tableInstance.getRowModel().rows.length > 0 ? (
              tableInstance.getRowModel().rows.map((rowEl) => (
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
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columnDef.length }
                  align="center"
                  style={{ fontStyle: "italic", color: "#999" }}
                >
                  No data found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          {/* <TableFooter>
            {tableInstance.getFooterGroups().map((footerGroup) => (
              <StyledTableRow key={footerGroup.id}>
                {footerGroup.headers.map((footer) => (
                  <StyledTableCell
                    key={footer.id}
                    colSpan={footer.colSpan}
                    component="th"
                    scope="row"
                    sx={{ width: footer.getSize() }}
                  >
                    {flexRender(
                      footer.isPlaceholder
                        ? null
                        : footer.column.columnDef.footer,
                      footer.getContext()
                    )}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableFooter> */}
        </Table>
      </TableContainer>
      <Box
        sx={{
          marginTop: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Button
            sx={{ marginRight: 2 }}
            variant="outlined"
            onClick={() => tableInstance.setPageIndex(0)}
            disabled={!tableInstance.getCanPreviousPage()}
          >
            &lt;&lt;
          </Button>
          <Button
            sx={{ marginRight: 2 }}
            variant="outlined"
            onClick={() => tableInstance.previousPage()}
            disabled={!tableInstance.getCanPreviousPage()}
          >
            &lt;
          </Button>
          <Button
            sx={{ marginRight: 2 }}
            variant="outlined"
            onClick={() => tableInstance.nextPage()}
            disabled={!tableInstance.getCanNextPage()}
          >
            &gt;
          </Button>
          <Button
            sx={{ marginRight: 2 }}
            variant="outlined"
            onClick={() =>
              tableInstance.setPageIndex(tableInstance.getPageCount() - 1)
            }
            disabled={!tableInstance.getCanNextPage()}
          >
            &gt;&gt;
          </Button>
        </Box>
        <span>
          Page{" "}
          <strong style={{ marginRight: 3 }}>
            {tableInstance.getState().pagination.pageIndex + 1} of{" "}
            {tableInstance.getPageCount()} go to page
          </strong>
          <input
            type="number"
            defaultValue={tableInstance.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              tableInstance.setPageIndex(
                e.target.value ? Number(e.target.value) - 1 : 0
              );
            }}
          />
        </span>
        <FormControl size="small">
          <Select
            value={tableInstance.getState().pagination.pageSize}
            onChange={(e) => tableInstance.setPageSize(Number(e.target.value))}
          >
            {[5, 10, 20, 50].map((size) => (
              <MenuItem key={size} value={size}>
                Show {size}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </>
  );
};
export default SortingTable;
