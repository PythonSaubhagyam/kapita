import Footer from "../components/Footer";
import BreadCrumbCom from "../components/BreadCrumbCom";
import Navbar from "../components/Navbar";
import { Box, Container, VStack, Image, Text, Heading } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
const Aboutus = () => {
  let { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const IsMobileView = searchParams.get("mobile") ?? "false";
  return (
    <>
      {IsMobileView !== "true" && <Navbar />}
      <Container maxW={"container.xl"} alignContent={"flex-start"}>
        <BreadCrumbCom second={"About Us"} secondUrl={"/about-us"} />{" "}
      </Container>
      <Container maxW={"container.xl"} mb={4} px={0} centerContent>
        <Box
          w={"100%"}
          bgImage={
            "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/aboutUs.jpg"
          }
          bgSize="cover"
          bgPosition="center"
          display="flex"
          justifyContent="center"
          alignItems="center"
          mt={"-10px"}
          py={20}
          boxShadow={"0px 0px 0px 0px"}
          height={"550px"}
          mb={10}
          // filter="brightness(200%)"
          // style={{ backdropFilter: "blur(10px)" }}
        >
          <Text
            pb={2}
            color={"brand.100"}
            textAlign={"center"}
            fontSize="7xl"
            fontWeight="600"
          >
            About Us
          </Text>

          {/* <Text
            pb={2}
            color={"brand.100"}
            textAlign={"center"}
            textShadow={"1px 1px 2px lightgreen"}
            fontSize="7xl"
            fontWeight="black"
          >
            About us
          </Text> */}
        </Box>
        <VStack maxW={"6xl"} my={8}>
          <Text fontWeight={600} fontSize={"2xl"} color={"text.300"}>
            Kapita.in is a marketplace to "discover unique indian products"
            including handmade, vintage, ethnic and natural products from india.
          </Text>
          <Box color={"text.300"} textAlign={"justify"}>
            India is a beautiful assortment of diversity reflected in our
            clothing, food, lifestyle, language, music, books etc. This
            diversity is so rich and diverse that an attempt to capture it on a
            single platform was never made. Kapita.in is that sincere attempt by
            bunch of young insane guys and gals who think this is possible now
            with the internet.
            <br />
            <br />
            Kapita.in uses a marketplace model to capture the regional
            variations of india. We connect local artisans & designers directly
            to global customers and thereby increase their livelihood, remove
            middlemen, help them create/promote their brand and thereby preserve
            our culture, traditions and values. We believe this journey will not
            only help artisans of india but also help customers discover and buy
            products which they otherwise are not able to do today.
            <br />
            <br />
            As they say starting kapita.in was fate, reaching out to artisans
            was a choice, but falling in love with the idea of india was beyond
            our control. Lets relive that old india together again.
            <br />
            <br />
            Kapita.in has "hottest young company in handicrafts in india" which
            is bringing positive change in the livelihood of base level artisans
            and designers.
            <br />
            <br />
            Customer delight is our motto. Please write to us directly if you
            have any feedback, questions, concerns or suggestions.
          </Box>

          <br />
        </VStack>
      </Container>
      {IsMobileView !== "true" && <Footer />}
    </>
  );
};

export default Aboutus;
