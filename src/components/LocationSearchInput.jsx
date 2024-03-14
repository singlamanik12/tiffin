import React, { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material/styles";
import { Alert, AlertTitle, Grid, Typography } from "@mui/material";
const LocationSearchInput = ({
  delArea,
  setAddress,
  error,
  setCoord,
  address,
  delAreaNote,
  tname,
  selectedAdd,
  setSelectedAdd,
  setFieldValue,
}) => {
  const [locAddress, setLocAddress] = useState(address);
  const [open, setOpen] = React.useState(false);
  const [touched, setTouched] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (address) => {
    setAddress(address);
    setTouched(true);
  };

  const handleSelect = async (address) => {
    try {
      const results = await geocodeByAddress(address);
      const address_array = results[0].address_components;
      setSelectedAdd(address);
      if (
        address_array[address_array.length - 1].types[0] === "postal_code" &&
        delArea?.includes(
          address_array[address_array.length - 1].long_name.split(" ")[0]
        )
      ) {
        setFieldValue(
          "postalCode",
          address_array[address_array.length - 1].long_name.split(" ")[0]
        );
        setAddress(address);
        setCoord(await getLatLng(results[0]));
      } else {
        handleClickOpen();
        setAddress("");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const errorShow = (selectedAdd !== address && touched) || (error && touched);
  return (
    <>
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogContent>
            <DialogContentText>
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {delAreaNote}
              </Alert>
              {/* <br />
              <Typography variant="caption">
                If you think that this error is wrong, please contact{" "}
                <strong>{tname}</strong>
              </Typography> */}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Ok</Button>
          </DialogActions>
        </Dialog>
      </div>
      <PlacesAutocomplete
        value={address}
        id="address"
        onChange={handleChange}
        onSelect={handleSelect}
        searchOptions={{ componentRestrictions: { country: "ca" } }}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <>
            <TextField
              style={{ marginBlock: 10 }}
              fullWidth
              {...getInputProps({
                placeholder: "Address",
                className: "location-search-input",
              })}
              error={error}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div style={{ padding: "10px" }}>Loading...</div>}
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: "#fafafa", cursor: "pointer" }
                  : { backgroundColor: "#ffffff", cursor: "pointer" };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                    style={{ padding: "10px", cursor: "pointer" }}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </PlacesAutocomplete>
      <Grid item xs={12}>
        {errorShow && (
          <div style={{ color: "red" }}>Please select from suggestions.</div>
        )}
      </Grid>
    </>
  );
};
export default LocationSearchInput;
