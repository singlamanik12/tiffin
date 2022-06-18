import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function Order({ order }) {
  const {
    tname,
    startDate,
    endDate,
    price,
    menuOpt,
    rrOpt,
    rsOpt,
    date,
    address,
    CreatedAt,
  } = order;

  return (
    <Box sx={{ minWidth: 275, marginBlock: 1 }}>
      <Card variant="outlined">
        <React.Fragment>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {new Date(startDate).toDateString() + " "}-
              {" " + new Date(endDate).toDateString()}
            </Typography>
            <Typography variant="h5" component="div">
              {tname}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              C${price}
            </Typography>
            <Typography variant="body2">
              {menuOpt}
              <br />
              {rrOpt}
              <br />
              {rsOpt}
              <br />
              Delivers to - {address}
              <br />
              Ordered on - {new Date(date).toDateString()}
            </Typography>
          </CardContent>
        </React.Fragment>
      </Card>
    </Box>
  );
}
