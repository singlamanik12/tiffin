import React, { useState, useContext, useEffect } from "react";
import {
  Alert,
  Button,
  Chip,
  Divider,
  Grid,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import Layout from "../shared/Layout";
import DataContext from "../api/context";
import Loading from "./../shared/Loading";
import { getSellerById } from "../api/menu";
import OrderForm from "./OrderForm";
import StarRateIcon from "@mui/icons-material/StarRate";
import ImageCarousel from "./Carousel";
import orderNow from "./../resources/ordernow.gif";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import IosShareIcon from "@mui/icons-material/IosShare";
import KitchenIcon from "@mui/icons-material/Kitchen";
export default function MenuChoice({ values }) {
  const { setOpen } = useContext(DataContext);
  const [done, setDone] = useState(false);
  const [selected, setSelected] = useState({});
  const [phNum, setPhNum] = useState();
  const initialValues = JSON.parse(localStorage.getItem("selected"));

  useEffect(() => {
    setDone(true);
  }, []);

  const {
    _id,
    SelID,
    tname,
    overview,
    veg,
    nveg,
    rrOpt,
    rsOpt,
    vegPrice,
    nvegPrice,
    products,
    address,
    logo,
    coord,
    banner,
    gallery,
    serviceTypes,
    city,
    pics,
    isVerified,
    additional_info,
    phoneNumber,
    notifyEmail,
    interacEmail,
    delArea,
    delAreaNote,
    code,
    paymentModesEnabled,
  } = values;
  const getPhoneNumber = async () => {
    const { data } = await getSellerById(SelID);
    setPhNum(data.PhoneNumber);
  };
  useEffect(() => getPhoneNumber(), [SelID]);
  const overviewHeading = "What's special about us";
  const rr = rrOpt.split("/").filter((n) => n);
  const rs = rsOpt.split("/").filter((n) => n);
  const menuOptions =
    nveg === "NA" ? ["Veg Menu"] : ["Veg Menu", "Non-Veg Menu"];
  const handleChange = (event) => {
    setSelected(
      Object.assign({}, selected, { [event.target.name]: event.target.value })
    );
  };
  const allGradients = [
    "linear-gradient(to right, #FF5F6D , #FFC371)",
    "linear-gradient(to right, #BFF098 , #6FD6FF)",
    "linear-gradient(to right, #C33764 , #1D2671)",
    "linear-gradient(to right, #009245 , #FCEE21)",
    "linear-gradient(to right, #EE9CA7 , #FFDDE1)",
  ];
  const handleSubmit = () => {
    localStorage.setItem("selected", JSON.stringify(selected));
  };
  return !done ? (
    <Loading />
  ) : (
    <Layout>
      <Grid container direction="row">
        <Grid
          item
          xs={12}
          container
          style={{ marginTop: 10, paddingInline: 20 }}
          alignItems="center"
        >
          {logo !== "" && (
            <img
              src={logo}
              alt="orderNow"
              style={{
                width: 40,
                height: 40,
              }}
            />
          )}
          <Typography
            style={{ fontSize: 35, fontWeight: "bolder", marginLeft: 15 }}
          >
            {tname}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          style={{ paddingInline: 20 }}
          justifyContent="right"
          container
        >
          <IconButton
            onClick={() => window.open("tel:+1" + phoneNumber, "_self")}
          >
            <PhoneIcon style={{ color: "#4169E1" }} />
          </IconButton>
          <IconButton
            onClick={() => {
              window.location.href = `https://www.google.com/maps/dir/?api=1&destination=${coord.lat},${coord.lng}`;
            }}
          >
            <LocationOnIcon style={{ color: "#00A36C" }} />
          </IconButton>
          <IconButton
            onClick={async () => {
              await navigator.share({
                title: "DT Meals",
                text: `Book your tiffin from ${tname} on DT Meals.`,
                url: `https://dtmeals.com/${code}`,
              });
            }}
          >
            <IosShareIcon />
          </IconButton>
        </Grid>

        <Grid item xs={12} style={{ marginBlock: 20 }}>
          <img src={banner} style={{ width: "100%" }} />
        </Grid>
        <Grid item xs={12} direction="row">
          {/* <Divider>
            <Chip
              label="Meal Plans"
              style={{ fontSize: 23, fontWeight: "bolder" }}
            />
          </Divider> */}
          {products?.map((product, key) => (
            <Grid
              item
              xs={12}
              key={product.prodName}
              container
              direction="column"
              alignItems="center"
              justifyContent="center"
              style={{ padding: 20 }}
            >
              <Paper elevation={3} style={{ borderRadius: 15, width: "100%" }}>
                <Grid
                  item
                  xs={12}
                  container
                  style={{
                    backgroundImage: allGradients[key],
                    color: "white",
                    padding: 15,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                  }}
                >
                  <Typography
                    fontSize={20}
                    fontWeight="bold"
                    style={{ textTransform: "uppercase" }}
                  >
                    {product.prodName}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  container
                  style={{
                    padding: 15,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography style={{ fontWeight: "bold" }}>
                    {product.description}
                  </Typography>
                </Grid>
                {/* <Grid
                  item
                  xs={12}
                  container
                  style={{
                    padding: 15,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      backgroundImage: allGradients[key],
                      padding: 6,
                      borderRadius: 20,
                      paddingInline: 20,
                      marginBottom: 15,
                    }}
                  >
                    <Typography style={{ color: "white" }}>Book now</Typography>
                  </div>
                </Grid> */}
              </Paper>
            </Grid>
          ))}
        </Grid>
        {/* <Grid
          item
          xs={12}
          style={{ backgroundColor: "black" }}
          container
          justifyContent="center"
        >
          <img
            src={banner}
            alt="orderNow"
            style={{
              width: "70%",
              height: "auto",
              marginLeft: 10,
              marginBlock: 10,
            }}
          />
        </Grid> */}
        {/* <div id="imgcarousel">
          <ImageCarousel pics={pics} />
        </div> */}
        <Grid
          item
          xs={12}
          direction="row"
          style={{ marginTop: 20, padding: 20 }}
        >
          <hr />
          <List>
            {additional_info?.map((info) => (
              <ListItem key={info}>
                <ListItemIcon>
                  <KitchenIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>
                  <Typography>{info}</Typography>
                </ListItemText>
              </ListItem>
            ))}
            <ListItem>
              <ListItemIcon>
                <KitchenIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>
                <Typography>{delAreaNote}</Typography>
              </ListItemText>
            </ListItem>
          </List>

          <hr />
        </Grid>
        <Alert severity="info" style={{ width: "100%" }}>
          If you find anything wrong on this page, please contact{" "}
          <strong>{tname}</strong>
        </Alert>
        <Grid item xs={12} style={{ paddingInline: "8px", marginTop: 20 }}>
          <Typography style={{ fontSize: 25, fontWeight: "bold" }} gutterBottom>
            Let's Order
          </Typography>
        </Grid>

        <OrderForm
          SelID={SelID}
          tname={tname}
          menuOptions={menuOptions}
          rr={rr}
          rs={rs}
          delArea={delArea}
          products={products}
          logo={logo}
          gallery={gallery}
          serviceTypes={serviceTypes}
          isVerified={isVerified}
          handleChange={handleChange}
          selected={selected}
          handleSubmit={handleSubmit}
          setOpen={setOpen}
          vegPrice={vegPrice}
          nvegPrice={nvegPrice}
          interacEmail={interacEmail}
          notifyEmail={notifyEmail}
          delAreaNote={delAreaNote}
          paymentModesEnabled={paymentModesEnabled}
        />
      </Grid>
    </Layout>
    // <Layout>
    //   <Grid container direction="row">
    //     <Grid item xs={12}>
    //       <img
    //         style={{ width: "100%", height: "200px" }}
    //         src={pics[0].url}
    //         alt="logo"
    //       />
    //       {window.innerWidth < 767 && (
    //         <IconButton
    //           style={{
    //             position: "absolute",
    //             top: "70px",
    //             right: "16px",
    //             backgroundColor: "white",
    //           }}
    //           alignItems="center"
    //           justifyContent="center"
    //           onClick={async () =>
    //             await navigator.share({
    //               title: tname,
    //               text: `Order your tiffin from ${tname} today on DT Meals`,
    //               url: window.location.href,
    //             })
    //           }
    //         >
    //           <ShareOutlinedIcon fontSize="small" style={{ color: "black" }} />
    //         </IconButton>
    //       )}
    //     </Grid>
    //     <Grid item xs={12} style={{ padding: "8px" }}>
    //       <Grid
    //         item
    //         xs={12}
    //         style={{ marginBottom: 20 }}
    //         container
    //         justifyContent="center"
    //         direction={"column"}
    //       >
    //         <Grid item xs={12} container alignItems="center">
    //           <img
    //             style={{
    //               height: "45px",
    //               width: "45px",
    //               borderRadius: 20,
    //               marginRight: 10,
    //             }}
    //             src={logo}
    //             alt="logo"
    //           />
    //           <Typography
    //             style={{
    //               fontWeight: "700",
    //               fontSize: "39px",
    //             }}
    //           >
    //             {tname}
    //           </Typography>
    //         </Grid>
    //         <Grid
    //           item
    //           xs={12}
    //           container
    //           style={{
    //             backgroundColor: "whitesmoke",
    //             padding: 10,
    //             borderRadius: 20,
    //           }}
    //         >
    //           <Grid item xs={12}>
    //             <Typography variant="caption" style={{ color: "gray" }}>
    //               +1{phoneNumber}
    //             </Typography>
    //           </Grid>
    //           <Grid item xs={12}>
    //             <Typography variant="caption" style={{ color: "gray" }}>
    //               {address}
    //             </Typography>
    //           </Grid>
    //         </Grid>
    //       </Grid>
    //       <Grid item xs={12} style={{ marginBottom: 10, marginTop: 20 }}>
    //         <Typography
    //           style={{
    //             fontSize: "24px",
    //             fontWeight: "700",
    //           }}
    //         >
    //           {overviewHeading}
    //         </Typography>
    //       </Grid>
    //       <Grid item xs={12} container>
    //         <Typography align="center">{overview}</Typography>
    //       </Grid>
    //       <Grid item xs={12} style={{ marginBottom: 20, marginTop: 20 }}>
    //         <Divider>
    //           <Typography
    //             variant="h6"
    //             style={{
    //               backgroundColor: "#ffd0de",
    //               paddingInline: 10,
    //               borderRadius: 20,
    //             }}
    //           >
    //             Menu Options
    //           </Typography>
    //         </Divider>
    //       </Grid>
    //       <Grid
    //         item
    //         xs={12}
    //         container
    //         alignItems="center"
    //         justifyContent="center"
    //       >
    //         {products.map((product) => (
    //           <>
    //             <Grid item xs={12} container justifyContent="center">
    //               <Typography
    //                 variant="h6"
    //                 style={{ fontWeight: "bolder", marginBottom: 5 }}
    //               >
    //                 {product?.prodName}
    //               </Typography>
    //             </Grid>
    //             <Grid item xs={12} container justifyContent="center">
    //               <Typography style={{ marginBottom: 10 }}>
    //                 {product?.description}
    //               </Typography>
    //             </Grid>
    //           </>
    //         ))}
    //       </Grid>
    //       {/* <OptionTemplate
    //       data={veg}
    //       type="Veg Menu"
    //       color="#00e600"
    //       price={vegPrice}
    //     />
    //     <OptionTemplate
    //       data={nveg}
    //       type="Non-Veg Menu"
    //       color="orange"
    //       price={nvegPrice}
    //     /> */}
    //       <Grid item xs={12} style={{ marginBottom: 20, marginTop: 20 }}>
    //         <Divider>
    //           <Typography
    //             variant="h6"
    //             style={{
    //               backgroundColor: "#ffd0de",
    //               paddingInline: 10,
    //               borderRadius: 20,
    //             }}
    //           >
    //             Cities Available
    //           </Typography>
    //         </Divider>
    //       </Grid>
    //       {city.map((item) => (
    //         <Chip
    //           key={item}
    //           style={{ marginRight: 10 }}
    //           label={<Typography>{item}</Typography>}
    //         />
    //       ))}
    //       <Grid item xs={12} style={{ marginTop: 50, marginBottom: 10 }}>
    //         <Typography
    //           style={{
    //             fontSize: "24px",
    //             fontWeight: "700",
    //           }}
    //         >
    //           Place your order
    //         </Typography>
    //       </Grid>
    //     </Grid>
    //     <OrderForm
    //       SelID={SelID}
    //       tname={tname}
    //       menuOptions={menuOptions}
    //       rr={rr}
    //       rs={rs}
    //       products={products}
    //       logo={logo}
    //       gallery={gallery}
    //       serviceTypes={serviceTypes}
    //       isVerified={isVerified}
    //       handleChange={handleChange}
    //       selected={selected}
    //       handleSubmit={handleSubmit}
    //       setOpen={setOpen}
    //       vegPrice={vegPrice}
    //       nvegPrice={nvegPrice}
    //       interacEmail={interacEmail}
    //     />
    //   </Grid>
    // </Layout>
  );
}
