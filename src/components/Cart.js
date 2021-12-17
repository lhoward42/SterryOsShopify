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
import Client from "shopify-buy";


const Cart = () => {
  let { handle } = useParams();

  const [quantity, setQuantity] = useState(0);
  const [variantId, setVariantId] = useState("")
  

  const {
    isCartOpen,
    closeCart,
    checkout,
    removeLineItem,
    updateCheckoutQuantity,
    fetchAllProducts,
    fetchProductWithHandle,
    addItemToCheckout,
    product,
  } = useContext(ShopContext);

  const client = Client.buildClient({
    domain: process.env.REACT_APP_SHOPIFY_DOMAIN,
    storefrontAccessToken: process.env.REACT_APP_SHOPIFY_API,
  });

  useEffect(() => {
    fetchAllProducts();
    return () => {};
  }, [fetchAllProducts]);


  const onChangeQuantity = (e, item) => {
    
    
  console.log(item.id, quantity);
  updateCheckoutQuantity(item.id, e.target.value);
  };

  console.log(quantity, variantId);
  

  const populateQuantities = (start, end) => {
    console.log(checkout);
    return (
      <>
      { checkout.lineItems?.length ? 
        checkout.lineItems.map((item) => {
        console.log(item.variant.id, checkout);
        const id = item.id
        return (
        <Select
          key={id}
          optionFilterProp='children'
          placeholder={item.quantity}
          value={item.quantity}
          id={id}
          onChange={(e) => onChangeQuantity(e, item)}
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
        ) }
        ) : <></>
        }
      </>
    )

    
  };
  // if (checkout.lineItems) {console.log(checkout.lineItems.map(item => item.variant.id)) }
  
  // console.log(product);

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
<Flex alignItems='center' justifyContent='center'>
                    {populateQuantities(1, 100)}
                  </Flex>
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
