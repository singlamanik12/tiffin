import React, { useEffect, useState } from "react";
import MenuChoice from "./MenuChoice";
import { getMenuById } from "../api/customer";
import { useParams } from "react-router-dom";
const MenuSelection = () => {
  const [values, setValues] = useState({});
  const { id } = useParams();
  const onLoad = async () => {
    const { data } = await getMenuById(id);
    console.log(data);
    setValues(data);
  };
  useEffect(() => {
    onLoad();
  }, []);
  return values.rsOpt ? <MenuChoice values={values} /> : <></>;
};

export default MenuSelection;
