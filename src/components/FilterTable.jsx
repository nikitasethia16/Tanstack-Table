import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import data from "../students.json";
import {
  Checkbox,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TextField,
} from "@mui/material";
import { StyledResize, StyledTableCell, StyledTableRow } from "../styles";
import { useState } from "react";
import dayjs from "dayjs";

const FilterTable = () => {
  const columnHelper = createColumnHelper();
  const columnDef = [
    // columnHelper.display({
    //     id: 'actions',
    //     cell: props => <Checkbox/>,
    // }),

    columnHelper.accessor("id", {
      header: "Id",
      // footer:"id"
      filterFn: (row, columnId, filterValue) => {
        const cellValue = row.getValue(columnId);
        return String(cellValue).includes(String(filterValue));
      },
    }),
    // columnHelper.group( {
    //     header: "Personal Details",
    //     columns:[
    columnHelper.accessor("name", {
      header: "Name",  
      // enableColumnFilter: false
      
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
      meta: { filterType: "select", option: ["A", "B","C","D"] },
    }),
    // columnHelper.accessor(row=>`${row.standard} ${row.section}`, {
    //     header: "Standard",
    //   }),
    columnHelper.accessor("age", {
      header: "Age",
    }),
    //     ]
    // }),

    // columnHelper.group( {
    //     header: "Address",
    //     columns: [
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
    //     ]
    // }),

      columnHelper.accessor("date_of_birth", {
        header: "DOB",
        cell: ({ getValue }) => dayjs(getValue()).format('DD/MM/YYYY'),
        filterFn: (row, columnId, filterValue) => {
          debugger;
          const rowDate = dayjs(row.getValue(columnId))
          const { from, to } = filterValue || {}
          if (from && rowDate.isBefore(dayjs(from), 'day')) return false
          if (to && rowDate.isAfter(dayjs(to), 'day')) return false
          return true
        },
        meta: { filterType: "dateRange" },
        
      }),
  ];
  const [columnFilters, setColumnFilters] = useState([]);
  const tableInstance = useReactTable({
    data: data,
    columns: columnDef,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
  });

  console.log("ndkdnklasdn", tableInstance.getState().columnFilters);
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
                    {columnEl.isPlaceholder
                      ? null
                      : flexRender(
                          columnEl.column.columnDef.header,
                          columnEl.getContext()
                        )}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            ))}
            <StyledTableRow>
              {tableInstance.getHeaderGroups()[0].headers.map((columnEl) => {
                return (
                  <TableCell key={columnEl.column.id}>
                    {columnEl.column.getCanFilter() ? (
                      columnEl.column.columnDef.meta?.filterType == "select" ? (
                        <Select
                          value={columnEl.column.getFilterValue() ?? ""}
                          onChange={(e) =>
                            columnEl.column.setFilterValue(
                              e.target.value || undefined
                            )
                          }
                          fullWidth
                          size="small"
                        >
                          <MenuItem value="">All</MenuItem>
                          {columnEl.column.columnDef.meta.option.map((val) => (
                            <MenuItem key={val} value={val}>
                              {val}
                            </MenuItem>
                          ))}
                        </Select>
                      ) :  columnEl.column.columnDef.meta?.filterType == 'dateRange' ? (
                        <div style={{ display: 'flex', gap: 8 }}>
                          <TextField
                            type="date"
                            size="small"
                            value={columnEl.column.getFilterValue()?.from || ''}
                            onChange={e => {
                              const prev = columnEl.column.getFilterValue() || {}
                              columnEl.column.setFilterValue({
                                ...prev,
                                from: e.target.value || undefined,
                              })  
                            }}
                          />
                          <TextField
                            type="date"
                            size="small"
                            value={columnEl.column.getFilterValue()?.to || ''}
                            onChange={e => {
                              const prev = columnEl.column.getFilterValue() || {}
                              columnEl.column.setFilterValue({
                                ...prev,
                                to: e.target.value || undefined,
                              })
                            }}
                          />
                        </div>
                      ) : (
                        <TextField
                          value={columnEl.column.getFilterValue() ?? ""}
                          onChange={(e) =>
                            columnEl.column.setFilterValue(e.target.value)
                          }
                          placeholder={`Filter ${columnEl.column.id}`}
                          size="small"
                          fullWidth
                        />
                      )
                    ) : null}
                  </TableCell>
                );
              })}
            </StyledTableRow>
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
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
};
export default FilterTable;
