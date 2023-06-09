import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import moment from "moment";
export default function AutoData({ sDate, setEDate }) {
  const [endDate, setEndDate] = React.useState();
  React.useEffect(() => {
    if (endDate) {
      setEDate("eDate", moment(endDate).format("YYYY-MM-DD"));
    }
  }, [endDate]);
  return (
    <Stack spacing={2} direction="row">
      <Button
        variant="outlined"
        onClick={() => setEndDate(moment(sDate, "YYYY-MM-DD").add(27, "days"))}
      >
        Monthly
      </Button>
      <Button
        variant="outlined"
        onClick={() => setEndDate(moment(sDate, "YYYY-MM-DD").add(6, "days"))}
      >
        Weekly
      </Button>
    </Stack>
  );
}
