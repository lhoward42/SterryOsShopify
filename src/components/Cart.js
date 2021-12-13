import React, { useContext, useState, useEffect } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Grid,
  Text,
  Flex,
  Button,
  Image,
  Link,
  Box,
  Select,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/shopContext";

const Cart = () => {
  let { handle } = useParams();

  const [quantity, setQuantity] = useState(0);

  const {
    isCartOpen,
    closeCart,
    checkout,
    removeLineItem,
    updateLineItem,
    fetchAllProducts,
    fetchProductWithHandle,
    addItemToCheckout,
    product,
  } = useContext(ShopContext);

  useEffect(() => {
    fetchAllProducts();
    return () => {};
  }, [fetchAllProducts]);

  useEffect(() => {
    fetchProductWithHandle(handle);
  }, [fetchProductWithHandle, handle]);

  const onChangeQuantity = (e) => {
    setQuantity(e.target.value);
    updateLineItem(checkout.lineItems[0].variant.id, quantity);
  };

  const populateQuantities = (start, end) => {
    return (
      <>
        <Select
          optionFilterProp='children'
          placeholder={checkout.lineItems.map(item => item.quantity)}
          value={checkout.lineItems.map(item => item.quantity)}
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
  // if (checkout.lineItems.map(item => item.id)) {console.log(checkout.lineItems.map(item => item.variant.id)) }
  
  console.log(product);

  return (
    <>
      <Drawer
        isOpen={isCartOpen}
        placement='right'
        onClose={closeCart}
        size='sm'
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>You Shopping Cart</DrawerHeader>

          <DrawerBody>
            {checkout.lineItems?.length ? (
              checkout.lineItems.map((item) => (
                <Grid templateColumns='repeat(4, 1fr)' gap={1} key={item.id}>
                  <Flex alignItems='center' justifyContent='center'>
                    <CloseIcon
                      cursor='pointer'
                      onClick={() => removeLineItem(item.id)}
                    />
                  </Flex>
                  <Flex alignItems='center' justifyContent='center'>
                    <Image src={item.variant.image.src} />
                  </Flex>
                  <Flex alignItems='center' justifyContent='center'>
                    <Text>{item.title}</Text>
                  </Flex>
                  <Flex alignItems='center' justifyContent='center'>
                    <Text>{item.variant.price}</Text>
                  </Flex>

                  <Flex alignItems='center' justifyContent='center'>
                    {populateQuantities(1, 100)}
                  </Flex>
                </Grid>
              ))
            ) : (
              <Box h='100%' w='100%'>
                <Text
                  h='100%'
                  display='flex'
                  flexDir='column'
                  alignItems='center'
                  justifyContent='center'
                >
                  Your Cart is Empty!
                </Text>
              </Box>
            )}
          </DrawerBody>

          {checkout.lineItems?.length ? (
            <DrawerFooter>
              <Button>
                <Link href={checkout.webUrl}>Checkout</Link>
              </Button>
              <Button colorScheme='blue'>Save</Button>
            </DrawerFooter>
          ) : null}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Cart;
