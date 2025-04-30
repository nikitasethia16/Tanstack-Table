import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import data from "../students.json";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableFooter,
  TableHead,
} from "@mui/material";
import { StyledTableCell, StyledTableRow } from "../styles";
import { useState } from "react";
import { CheckBox } from "@mui/icons-material";

const VisibilityTable = () => {
  const columnHelper = createColumnHelper();
  const columnDef = [
    // columnHelper.display({
    //   id: "actions",
    //   cell: (props) => <Checkbox />,
    // }),

    columnHelper.accessor("id", {
      header: "Id",
      footer: "id",
    }),
    columnHelper.group({
      header: "Personal Details",
      columns: [
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
      ],
    }),

    columnHelper.group({
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
      ],
    }),
  ];
  const [columnVisibility, setColumnVisibility] = useState({});
  const tableInstance = useReactTable({
    data: data,
    columns: columnDef,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
    // getVisibleCells:
  });
  console.log("jkkl", tableInstance.getAllLeafColumns())
  return (
    <>
      <Box>
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked={tableInstance.getIsAllColumnsVisible()}
              onChange={tableInstance.getToggleAllColumnsVisibilityHandler()}
            />
          }
          label="Toggle All"
        />
        {
            tableInstance.getAllLeafColumns().map((e, index)=>{
              return (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      defaultChecked={e.getIsVisible()}
                      onChange={e.getToggleVisibilityHandler()}
                    />
                  }
                  label={
                    e.id
                      .replace(/_/g, ' ')            
                      .replace(/\b\w/g, char => char.toUpperCase()) 
                  }
                />
              );
            })
        }
      </Box>
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
export default VisibilityTable;
