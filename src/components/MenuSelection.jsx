import React, { useContext, useEffect, useState } from "react";
import MenuChoice from "./MenuChoice";
import { getMenuById } from "../api/customer";
import { useParams } from "react-router-dom";
import DataContext from "../api/context";
const MenuSelection = () => {
  const [values, setValues] = useState({});
  const { id } = useParams();
  const { setLoading } = useContext(DataContext);
  const onLoad = async () => {
    setLoading(true);
    const { data } = await getMenuById(id);
    setValues(data);
    setLoading(false);
  };
  useEffect(() => {
    onLoad();
  }, []);
  return values.rsOpt ? <MenuChoice values={values} /> : <></>;
};

export default MenuSelection;
