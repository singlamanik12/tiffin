import React, { useState, useContext, useEffect } from "react";
import { Grid } from "@mui/material";
import Layout from "../shared/Layout";
import DataContext from "../api/context";
import Loading from "./../shared/Loading";
import { getSellerById } from "../api/menu";
import OrderForm from "./OrderForm";
import ImageCarousel from "./Carousel";
import orderNow from "./../resources/ordernow.gif";
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
    banner,
    gallery,
    serviceTypes,
    city,
    pics,
    isVerified,
    phoneNumber,
    interacEmail,
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
        </Grid>
        <div id="imgcarousel">
          <ImageCarousel pics={pics} />
        </div>
        <Grid item xs={12} container>
          <img
            src={orderNow}
            alt="orderNow"
            style={{ width: "50%", height: "auto", marginLeft: 10 }}
          />
        </Grid>
        <OrderForm
          SelID={SelID}
          tname={tname}
          menuOptions={menuOptions}
          rr={rr}
          rs={rs}
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
