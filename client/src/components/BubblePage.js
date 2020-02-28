import React, { useState, useEffect } from "react";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import axiosWithAuth from "../utils/axiosWithAuth";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  const getData = () => {
    axiosWithAuth()
      .get("colors")
      .then(res => {
        console.log("BubblePage async .get", res)
        setColorList(res.data)
      })
      .catch(err => {
        console.log("Get fail", err)
      })
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
