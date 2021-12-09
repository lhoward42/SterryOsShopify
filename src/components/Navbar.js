import React, { useContext } from "react";
import { Flex, Text, Icon, Image } from "@chakra-ui/react";
import { ShopContext } from "../context/shopContext";
import { MdMenu, MdShoppingBag } from "react-icons/md";
import OutsideLogo from "../assets/OutsideLogo.png";

const Navbar = () => {
  const { openCart, openMenu, checkout } = useContext(ShopContext);
  return (
    <div>
      <Flex backgroundColor="lightblue" flexDir='row' justifyContent='space-between' p='2rem'>
        <Icon fill='blue' as={MdMenu} w={50} h={50}></Icon>
        <Image src={OutsideLogo} w={100} h={100} />
        <Icon fill='blue' as={MdShoppingBag} w={50} h={50} 
        onClick={() => openCart()} 
        />
      </Flex>
    </div>
  );
};

export default Navbar;
