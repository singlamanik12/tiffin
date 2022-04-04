import React from "react";
import Layout from "../shared/Layout";
import LocationSearchInput from "./LocationSearchInput";
import ServicesList from "./ServicesList";
function Home() {
  return (
    <Layout >
      <LocationSearchInput />
      <ServicesList/>
    </Layout>
  );
}

export default Home;
