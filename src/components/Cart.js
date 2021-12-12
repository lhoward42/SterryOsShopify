import React, { useContext } from "react";
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
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { ShopContext } from "../context/shopContext";

const Cart = () => {
  const { isCartOpen, closeCart, checkout, removeLineItem } =
    useContext(ShopContext);

  console.log(checkout);

  return (
    <>
      <Drawer isOpen={isCartOpen} placement='right' onClose={closeCart} size="sm">
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
