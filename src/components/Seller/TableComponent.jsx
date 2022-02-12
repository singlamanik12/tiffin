import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import IconButton from "@mui/material/IconButton";
const styleHead = {
  backgroundColor: "black",
  color: "white",
  fontWeight: "bold",
  whiteSpace: "nowrap",
};
const styleCell = { whiteSpace: "nowrap" };

export default function TableComponent({ rows, action }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" style={styleHead}>
              Name
            </TableCell>
            <TableCell align="center" style={styleHead}>
              Type
            </TableCell>
            <TableCell align="center" style={styleHead}>
              City
            </TableCell>
            <TableCell align="center" style={styleHead}>
              Payment Mode
            </TableCell>
            <TableCell align="center" style={styleHead}>
              Amount Paid
            </TableCell>
            <TableCell align="center" style={styleHead}>
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center" style={styleCell}>
                {row.name}
              </TableCell>
              <TableCell align="center" style={styleCell}>
                {row.calories}
              </TableCell>
              <TableCell align="center" style={styleCell}>
                {row.fat}
              </TableCell>
              <TableCell align="center" style={styleCell}>
                {row.carbs}
              </TableCell>
              <TableCell align="center" style={styleCell}>
                {row.protein}
              </TableCell>
              <TableCell align="center" style={styleCell}>
                {(action === "review" || action === "confirm") && (
                  <IconButton style={{ padding: "10px" }}>
                    <DoneIcon color="success" />
                  </IconButton>
                )}
                {action === "review" && (
                  <IconButton style={{ padding: "10px" }}>
                    <CloseIcon color="error" />
                  </IconButton>
                )}

                <Button variant="outlined" style={{ marginLeft: "10px" }}>
                  Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
