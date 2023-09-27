import React, { useEffect } from "react";

const FetchData = () => {
  useEffect(() => {
    fetch()
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  });
  return <div></div>;
};

export default FetchData;
