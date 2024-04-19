import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";
import CarouselWithLinks from "../components/CarouselWithLinks";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {
  FaHeartbeat,
  FaThumbsUp,
  FaUniversalAccess,
  FaUserMd,
  FaUserPlus,
  FaBlind,
  FaHeart,
} from "react-icons/fa";
import { MdWaterDrop } from "react-icons/md";
import { FaGears } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";

import ProductListSectionHome from "../components/ProductListSectionHome";
import {
  Container,
  Flex,
  Image,
  Heading,
  Stat,
  StatNumber,
  StatHelpText,
  SimpleGrid,
  Box,
  Link,
  Center,
  useMediaQuery,
  Text,
  Grid,
  GridItem,
  LinkBox,
  LinkOverlay,
  useBreakpointValue,
  Card,
  Skeleton,
  Button,
} from "@chakra-ui/react";
import client from "../setup/axiosClient";
import CheckOrSetUDID from "../utils/checkOrSetUDID";
import { useNavigate, NavLink as RouterLink } from "react-router-dom";
import { ChevronRightIcon } from "@chakra-ui/icons";
import Testimonials from "../components/testimonials";

const Diseases = [
  {
    icon: <FaHeartbeat />,
    title: "Prevents Heart Diseases",
  },
  {
    icon: <FaThumbsUp />,
    title: "Increases Good Cholesterol",
  },
  {
    icon: <FaUniversalAccess />,
    title: "Increases Bone Density",
  },
  {
    icon: <MdWaterDrop />,
    title: "Kills Water Bacteria",
  },
  {
    icon: <FaUserMd />,
    title: "Reduces Amoebiasis",
  },
  {
    icon: <FaUserPlus />,
    title: "Builds Immunity",
  },
  {
    icon: <FaGears />,
    title: "Maintain Digestive System",
  },
  {
    icon: <FaBlind />,
    title: "Slow Down Ageing",
  },
];
const banner = [
  {
    id: 11,
    alt_text: "Image2",
    image: require("../assets/Home Page Banners/01.jpg"),
    display_status: true,
    image_url: "/products/1635",
  },
  {
    id: 12,
    alt_text: "Image3",
    image: require("../assets/Home Page Banners/02.jpg"),
    display_status: true,
    image_url: "/products/1641",
  },
  {
    id: 13,
    alt_text: "Image3",
    image: require("../assets/Home Page Banners/03.jpg"),
    display_status: true,
    image_url: "/products/1639",
  },
  {
    id: 14,
    alt_text: "Image4",
    image: require("../assets/Home Page Banners/04.jpg"),
    display_status: true,
    image_url: "/products/1640",
  },
];





export default function Home() {
  const [isFullScreen] = useMediaQuery("(min-width: 768px)");
  const width = useBreakpointValue({ base: "100%", lg: "100%" });
  const height = useBreakpointValue({ base: "300", lg: "400" });
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile] = useMediaQuery("(max-width: 480px)");
  const [homeData, setHome] = useState({});
  // let [isFull] = useMediaQuery("(max-width:1920px)");
  const [blogs, setBlogs] = useState([]);
  const isMobiles = width <= 768;
  const navigate = useNavigate();
  const [mustTry, setMustTry] = useState([]);
  useEffect(() => {
    CheckOrSetUDID();
    //getHomePageData();
    getBlogs();
    getMustTry();
  }, []);

  // async function getHomePageData() {
  //   const response = await client.get("/home");
  //   if (response.data.status === true) {
  //     setBanners(response.data.banners);
  //     setHome(response.data);
  //   }
  //   setLoading(false);
  // }
  async function getMustTry() {
    const response = await client.get("musttry/list");
    if (response) {
      setMustTry(response.data.data);
    }
    setLoading(false);
  }
  async function getBlogs() {
    const params = {};
    const response = await client.get("/home/blogs/", {
      params: params,
    });
    if (response.data.status === true) {
      setBlogs(response.data.blogs);
    }
  }

  return (
    <>
      {/* {loading === true ? (
        <Center h="100vh" w="100vw" backgroundColor={"bg.500"}>
          <Loader site={true} />
        </Center>
      ) : (
        <> */}
      <Navbar />
      <Container maxW={"container.xl"} px={0}>
        {loading === true ? (
          <Skeleton h={489}></Skeleton>
        ) : (
           <Carousel banners={banner} />
         
        )}
       
      </Container>

      <Container maxW={"container.xl"} mb={8} mt={2} px={0}>
        <Text
          fontSize={{ base: "xl", sm: "2xl", xl: "2xl" }}
          fontWeight={500}
          color={"text.500"}
          bgColor={"bg.500"}
          textAlign={{ base: "center", md: "start" }}
          px={{ base: 2, md: 8 }}
          py={4}
          my={7}
        >
          WHY KAPITA ?
        </Text>
        <Text
          color={"text.300"}
          align={{ base: "justify" }}
          px={{ base: 15, lg: 20 }}
          fontSize={{ base: "sm", lg: "lg" }}
        >
          Water is the essential component of any living being to survive. A
          person should drink minimum 2.5 to 3 liters of water every day to keep
          him/her healthy. In simple words, a person must consume 2 to 3 bottles
          of water every day. You may purchase some plastic bottles from the nearby shop to store the water and carry with you wherever you go.Nowadays, we get colorful plastic water bottles. They may help you to
          carry water with you. But, it causes adverse effects on our health. As
          they are made of plastic, they contain chemicals which may turn
          poisonous. So, keeping our health in mind, using a plastic water
          bottle is not preferred.
          <br />
          <br/>
          
        </Text>
       
        <Link
          fontWeight={700}
          color={"brand.500"}
          as={RouterLink}
          to={"/about-us"}
          mx={{lg:"45%",base:"33%",md:"42%"}}
          border={"1px"}
          borderColor={"brand.500"}
          p={3}
          borderRadius={"10px"}
          _hover={{
            textDecoration: "none",
            color: "white",
            bgColor: "text.500",
          }}
        >
          Read more
        </Link>
      </Container>

      <Container mb={5} px={0} maxW={"container.xl"} centerContent>
        <Image
          src={require("../assets/Home/Kapita_certificate.jpg")}
          alt=""
          style={{
            opacity: 1,
            transition: "opacity 0.7s", // Note the corrected syntax here
          }}
        />
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
          }}
          gap={4}
          my={6}
          px={{ base: 7, md: 15, xl: "10%" }}
        >
          <GridItem>
            <Image src={require("../assets/Home/V5kf29fiII.jpg")} />
          </GridItem>
          <GridItem>
            <Flex flexDirection={"column"} gap={4} px={{md:10}} pt={{md:20}}>
              <Heading fontSize={{md:28,base:24}} color={"brand.500"}>Copper Water Bottle 900 ML</Heading>
              <Text fontSize={"19px"} color="text.300">
                <span style={{ fontSize: "24px", fontWeight: 600 }}>RS</span> .
                760.00/-
              </Text>
              <Text fontSize={"19px"} color="text.300">
                {" "}
                Quality
              </Text>
              <Flex alignItems={"center"}>
                {[0, 1, 2, 3].map(() => (
                  <FaHeart style={{ marginRight: 3 }} />
                ))}
                <CiHeart fontSize={"22px"} />
              </Flex>
              <Button
                borderColor={"text.500"}
                w={150}
                _hover={{ bgColor: "text.500", color: "white" }}
                color="text.500"
                variant="outline"
                onClick={()=>navigate("/products/1645")}
                cursor={"pointer"}
              >
                Buy Now
              </Button>
            </Flex>
          </GridItem>
        </Grid>
      </Container>

      <Container maxW={"container.xl"} mb={5} px={0}>
        <Box
          bgColor={"bg.500"}
          px={{ base: 2, md: 8 }}
          py={4}
          my={7}
          textAlign={{ base: "center", md: "start" }}
        >
          <Text
            fontSize={{ base: "xl", sm: "2xl", xl: "3xl" }}
            fontWeight={500}
            color={"text.500"}
          >
            Advantages Of Copper Bottle
          </Text>
        </Box>
        <Grid
          templateColumns={{
            base: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          }}
          gap={4}
          my={6}
          px={{ base: 9, md: 15, xl: "10%" }}
        >
          {Diseases.map((data) => (
            <GridItem cursor={"pointer"}>
              <Flex flexDirection={"column"} gap={4} my={5}>
                <Box fontSize={"45px"}>{data.icon}</Box>
                <Text fontSize={"17px"} fontWeight={700}>
                  {data.title}
                </Text>
              </Flex>
            </GridItem>
          ))}
        </Grid>
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
          }}
          gap={4}
          my={6}
          px={{ base: 7, md: 15, xl: "10%" }}
        >
          <GridItem>
            <Image src={require("../assets/Home/HZSIirCVHj.jpg")} />
          </GridItem>
          <GridItem cursor={"pointer"}>
            <Flex flexDirection={"column"} gap={6} my={{md:"20%"}}>
              <Heading fontSize={{md:"28px",base:24}}color={"text.500"}>
                History Of Copper Utensils
              </Heading>
              <Text color={"text.300"} fontSize={"19px"} textAlign={"justify"}>
                Scientifically proven to be effective . Copper utensils were
                used as tradition in our country from hundreds of years.
              </Text>
              <Link
                fontWeight={700}
                color={"brand.500"}
                size={"md"}
                as={RouterLink}
                to={"/about-us"}
                textAlign={"center"}
                w={120}
                border={"1px"}
                borderColor={"brand.500"}
                p={2}
                borderRadius={"10px"}
                _hover={{textDecoration:"none" ,bgColor:"brand.500",color:"#fff"}}
              >
                Read More
              </Link>
            </Flex>
          </GridItem>
          <GridItem>
            <Flex flexDirection={"column"} gap={6} my={{md:"20%"}}>
              <Heading fontSize={{md:"28px",base:24}} color={"text.500"}>
                Environmentally Friendly
              </Heading>
              <Text color={"text.300"} fontSize={"19px"} textAlign={"justify"}>
                Good for you and good for the environment. Join us in the battle
                against plastic.
              </Text>
              <Link
                fontWeight={700}
                color={"brand.500"}
                size={"md"}
                as={RouterLink}
                to={"/about-us"}
                textAlign={"center"}
                w={120}
                border={"1px"}
                borderColor={"brand.500"}
                p={2}
                borderRadius={"10px"}
                _hover={{textDecoration:"none" ,bgColor:"brand.500",color:"#fff"}}
              >
                Read More
              </Link>
            </Flex>
          </GridItem>
          <GridItem cursor={"pointer"}>
            <Image src={require("../assets/Home/gFADb6goeQ.jpg")} />
          </GridItem>
        </Grid>
      </Container>

      <ProductListSectionHome
        title="Must Try : KAPITA Products"
        loading={loading}
        products={mustTry}
      />

      <Container maxW={{ base: "100vw", md: "container.xl" }}>
        <Box
          backgroundSize="100%"
          backgroundPosition="50% 100%"
          backgroundRepeat={"no-repeat"}
        >
          <Heading
            color="brand.500"
            fontSize={{md:33,base:20}}
            mx="auto"
            align={"center"}
            mt={3}
           
          >
            OUR CERTIFICATIONS & AWARDS
          </Heading>
        </Box>
        <Text my={5} textAlign={"center"} color="text.300">
          We are committed to quality and each of our facilities is
          independently certified by an industry-accredited agency.
        </Text>
        <Flex
          justifyContent="space-evenly"
          direction={{ base: "column", md: "row" }}
          align="center"
          gap={12}
          pt={1}
          pb={6}
        >
          <LazyLoadImage
            src={
              "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/HomePage/global-certificate.jpg"
            }
            alt="global-certificate"
            style={{
              opacity: 1,
              transition: "opacity 0.7s", // Note the corrected syntax here
            }}
          />
          <LazyLoadImage
            src={
              "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/HomePage/ciolook-certificate.jpg"
            }
            alt="ciolook-certificate"
            style={{
              opacity: 1,
              transition: "opacity 0.7s", // Note the corrected syntax here
            }}
          />
        </Flex>
      </Container>

      <Container backgroundColor={"bg.500"} maxW={"container.xl"} py={2}>
        <SimpleGrid
          columns={[2, 3, null, 5]}
          px={6}
          maxW={"container.xl"}
          my={6}
          backgroundColor={"bg.500"}
          align="center"
          spacingX={{ base: "10vw", md: "30px" }}
          spacingY="40px"
        >
          <Stat>
            <StatNumber color="text.300" fontSize={{ base: "3xl", md: "3xl" }}>
              9+
            </StatNumber>
            <StatHelpText color="gray.600">Natural Products</StatHelpText>
          </Stat>

          <Stat>
            <StatNumber color="text.300" fontSize={{ base: "3xl", md: "3xl" }}>
              13125+
            </StatNumber>
            <StatHelpText color="gray.600">Satisfied Clients</StatHelpText>
          </Stat>

          <Stat>
            <StatNumber color="text.300" fontSize={{ base: "3xl", md: "3xl" }}>
              1485+
            </StatNumber>
            <StatHelpText color="gray.600">Cities & Towns</StatHelpText>
          </Stat>
          <Stat>
            <StatNumber color="text.300" fontSize={{ base: "3xl", md: "3xl" }}>
              7+
            </StatNumber>
            <StatHelpText color="gray.600">Countries</StatHelpText>
          </Stat>

          <Stat>
            <StatNumber color="text.300" fontSize={{ base: "3xl", md: "3xl" }}>
              14+
            </StatNumber>
            <StatHelpText color="gray.600">Stores</StatHelpText>
          </Stat>
        </SimpleGrid>
      </Container>
      <Container maxW={{ base: "100vw", md: "container.xl" }} centerContent>
      <Heading
            color="brand.500"
            fontSize={{md:33,base:20}}
            mx="auto"
            align={"center"}
            mt={4}
            
          >
           LICENSES & AFFILIATIONS
          </Heading>
          <Flex justify="center" align="center" >
          <Image
            src={require("../assets/Home/fssai.png")}
            boxSize={{md:160,base:130}}
            alt="Coffee Board"
            style={{
              opacity: 1,
              transition: "opacity 0.7s", // Note the corrected syntax here
            }}
          />
        </Flex>
        
        <Image
          my={10}
          src={require("../assets/Home/kapita_icon.jpg")}
          w={{ md: "65%" }}
        />

        <Box
          w="100%"
          backgroundSize="100%"
          backgroundPosition="50% 100%"
          backgroundRepeat={"no-repeat"}
        >
          <Heading
            color="brand.500"
            fontSize={{md:33,base:20}}
            mx="auto"
            align={"center"}
            mb={"5"}
          >
            OUR SERVICES ARE AVAILABLE IN
          </Heading>
        </Box>
        <Box display={"flex"} justifyContent={"center"}>
          <LazyLoadImage
            src={
              "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/Map.webp"
            }
            w={{ base: "100%", md: "100%" }}
            alt=""
            py={4}
            style={{
              opacity: 1,
              transition: "opacity 0.7s", // Note the corrected syntax here
            }}
          />
        </Box>
        <Box
          w="100%"
          backgroundSize="100%"
          backgroundPosition="50% 100%"
          backgroundRepeat={"no-repeat"}
        >
          <Heading
            color="brand.500"
            fontSize={{md:33,base:22}}
            mx="auto"
            align={"center"}
            my={"5"}
            pb={"10px"}
          >
            AVAILABLE AT
          </Heading>
        </Box>
        <Container maxW={"container.xl"} mb={5} px={0} centerContent>
          <Image
            src={
              "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/01.jpg"
            }
            w={"container.xl"}
            alt=""
            style={{
              opacity: 1,
              transition: "opacity 0.7s", // Note the corrected syntax here
            }}
          />
        </Container>
      </Container>
      <Footer />
      {/* </>
      )} */}
    </>
  );
}
