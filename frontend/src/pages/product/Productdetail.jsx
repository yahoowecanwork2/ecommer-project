import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productApi } from "../../apis/product";

const Productdetail = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [activeImg, setActiveImg] = useState("");
  console.log("slug", slug);

  // single
  const getSingleProduct = async () => {
    try {
      const res = await productApi.getSingle(slug);
      console.log("detail", res);
      setProduct(res.product);
      setActiveImg(res.product.image[0]?.url);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (slug) getSingleProduct();
  }, [slug]);
  return (
    <div>
      <h2>Product detail</h2>
    </div>
  );
};

export default Productdetail;
