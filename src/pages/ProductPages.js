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
  Select,
  Center,
} from "@chakra-ui/react";

import { ShopContext } from "../context/shopContext";

const ProductPage = () => {
  let { handle } = useParams();

  const {
    fetchProductWithHandle,
    fetchAllProducts,
    addItemToCheckout,
    product,
    products,
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
        <Select
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
        </Select>
      </>
    );
  };

  if (!product.title) return <div>Loading...</div>;

  return (
    <Box p='2rem'>
      <Grid templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)"]} m='auto'>
        <Flex justifyContent='center' alignItems='center'>
          <Image src={product.images[0].src} />
        </Flex>
        <Box
          px='2rem'
          display='flex'
          flexDir='column'
          alignItems='center'
          justifyContent='center'
        >
          <Heading pb='2rem'>{product.title}</Heading>
          <Text fontWeight='bold' pb='2rem'>
            {product.variants[0].price}
          </Text>
          <Text pb='2rem' color='gray.500'>
            {product.description}
          </Text>

          <Text>{populateQuantities(1, 100)}</Text>
          {quantity}
          <Button
            _hover={{ opacity: "70%" }}
            w="10rem"
            rounded='0'
            shadow='3'
            bg='black'
            color="teal"
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
