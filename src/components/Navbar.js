import React, { useContext } from "react";
import { Flex, Text, Icon, Image, Badge, Box } from "@chakra-ui/react";
import { ShopContext } from "../context/shopContext";
import { MdMenu, MdShoppingBag } from "react-icons/md";
import { Link } from "react-router-dom";
import OutsideLogo from "../assets/OutsideLogo.png";

const Navbar = () => {
  const { openCart, openMenu, checkout } = useContext(ShopContext);
  
  return (
    <div>
      <Flex
        backgroundColor='lightblue'
        flexDir='row'
        alignItems="center"
        justifyContent='space-between'
        p='2rem'
      >
        <Icon fill='blue' as={MdMenu} w={50} h={50} onClick={() => openMenu()} ></Icon>
        <Link to='/'>
          <Image src={OutsideLogo} w={100} h={100} />
        </Link>
        <Box>
        <Icon
          fill='blue'
          as={MdShoppingBag}
          w={30}
          h={30}
          onClick={() => openCart()}
        />
        <Badge backgroundColor="darkblue" borderRadius="50%" color="white">{checkout.lineItems?.length}</Badge>
        </Box>
      </Flex> 
    </div>
  );
};

export default Navbar;
