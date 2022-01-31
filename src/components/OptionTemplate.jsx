import React from "react";
import Grid from "@mui/material/Grid";
import { Typography, Divider } from "@mui/material";
const OptionTemplate = ({ data, type, color, price }) => {
  const items = data.split("/");
  return (
    <>
      <Grid
        item
        xs={6}
        container
        spacing={0}
        //direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "20vh" }}
      >
        <Grid
          item
          xs={12}
          container
          alignItems="center"
          justifyContent="center"
        >
          <Typography
            style={{
              fontSize: 17,
              backgroundColor: color,
              paddingInline: 10,
              paddingBlock: 2,
              borderRadius: 20,
            }}
          >
            {type}
          </Typography>
        </Grid>
        <Grid item xs={12} style={{ paddingInline: 40, marginBlock: 10 }}>
          <Divider>CA${price}</Divider>
        </Grid>
        <Grid
          item
          xs={12}
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          {items.map((item, index) => (
            <Grid item>
              <Typography>{item}</Typography>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default OptionTemplate;
