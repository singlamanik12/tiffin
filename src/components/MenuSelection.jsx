import React, { useContext, useEffect, useState } from "react";
import MenuChoice from "./MenuChoice";
import { getMenuById } from "../api/customer";
import { useNavigate, useParams } from "react-router-dom";
import DataContext from "../api/context";
import { getMenuByCode } from "../api/menu";
const MenuSelection = () => {
  const [values, setValues] = useState({});
  const { id, code } = useParams();
  const { setLoading } = useContext(DataContext);
  const navigate = useNavigate();
  const onLoad = async () => {
    setLoading(true);
    if (id) {
      const { data } = await getMenuById(id);
      setValues(data);
    } else {
      const { data } = await getMenuByCode(code);
      if (data._id) {
        navigate(`/menu/${data._id}`);

        setValues(data);
      } else {
        window.location.href = "/";
      }
    }
    setLoading(false);
  };
  useEffect(() => {
    onLoad();
  }, []);
  return values.SelID ? <MenuChoice values={values} /> : <></>;
};

export default MenuSelection;
