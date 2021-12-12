import React, { useEffect, useContext, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Box,
  Grid,
  Image,
  Text,
  Button,
  Heading,
  Flex,
  Center,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Select,
} from "@chakra-ui/react";

import { ShopContext } from "../context/shopContext";

const ProductPage = () => {
  let { handle } = useParams();

  const {
    fetchProductWithHandle,
    fetchAllProducts,
    addItemToCheckout,
    product,
  } = useContext(ShopContext);

  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    fetchProductWithHandle(handle);
  }, [fetchProductWithHandle, handle]);

  useEffect(() => {
    fetchAllProducts();
    return () => {};
  }, [fetchAllProducts]);

  const onChangeQuantity = (e) => {
    setQuantity(e.target.value);
  };

  const populateQuantities = (start, end) => {
    return (
      <>
        <select
          optionFilterProp='children'
          placeholder='Qty'
          value={quantity ? quantity : "Qty"}
          onChange={onChangeQuantity}
        >
          {Array(end - start + 1)
            .fill()
            .map((_, idx) => (
              <option key={start + idx} value={start + idx}>
                {" "}
                {start + idx}{" "}
              </option>
            ))}
        </select>
      </>
    );
  };

  if (!product.title) return <div>Loading...</div>;

  return (
    <Box>
      <Grid templateColumns='repeat(2, 1fr)'>
        <Image src={product.images[0].src} />
        <Box>
          <Heading>{product.title}</Heading>
          <Text>{product.variants[0].price}</Text>
          <Text>{product.description}</Text>
          <Text>{product.variants[0].id}</Text>
          <div>{populateQuantities(1, 100)}</div>
          {quantity}
          <Button
            rounded='0'
            shadow='3'
            bg='black500'
            m={{ y: "2rem" }}
            onClick={() => addItemToCheckout(product.variants[0].id, quantity)}
          >
            Add To Cart
          </Button>
        </Box>
      </Grid>
    </Box>
  );
};

export default ProductPage;
