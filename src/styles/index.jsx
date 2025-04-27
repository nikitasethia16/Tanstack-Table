import { Box, styled, TableCell, tableCellClasses, TableRow } from "@mui/material";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      border: "1px solid #e0e0e0",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      border: "1px solid #e0e0e0",
    },
    [`&.${tableCellClasses.footer}`]: {
      fontSize: 15,
      fontWeight: "bold",
      color: theme.palette.text.primary,
    },
  }));

  export const StyledTableRow = styled(TableRow)(() => ({
    '&:hover': {
      backgroundColor: '#f5f5f5',
    },
  }));

  export const StyledResize = styled(Box)(({ resize }) => {
    return {
      position: 'absolute',
      right: 0,
      top: 0,
      height: '100%',
      width: '2px',
      cursor: 'col-resize',
      zIndex: 1,
      touchAction: 'none',
      backgroundColor: resize ? '#e0e0e0' : 'transparent',
    };
  });
  