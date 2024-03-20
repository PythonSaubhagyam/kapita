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
  FaHeart
} from "react-icons/fa";
import { MdWaterDrop } from "react-icons/md";
import { FaGears } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";

import ProductListSection from "../components/ProductListSection";
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
const NewArrival = [
  { id: 1645, image1: require("../assets/home/bootle.jpg") },
  { id: 1641, image1: require("../assets/home/sipper_bottle.jpg") },
  { id: 1646, image1: require("../assets/home/lacquer_jug.jpg") },
  { id: 1635, image1: require("../assets/home/coated_glass.jpg") },
  { id: 1638, image1: require("../assets/home/coated.jpg") },
  { id: 1637, image1: require("../assets/home/glass_spoon.jpg") },
];

const imageInfo = [
  {
    src:require("../assets/Home/01.jpg"),
    name: "NON-GMO Product",
  },
  {
    src:require("../assets/Home/02.jpg"),
    name: "Ethical & Natural",
  },
  {
    src:require("../assets/Home/03.jpg"),
    name: "Vegetarian",
  },
  {
    src:require("../assets/Home/04.jpg"),
    name: "Quality you'll Love Guaranteed",
  },
  {
    src:require("../assets/Home/05.jpg"),
    name: "Minimum Order Value Rs.250",
  },
  {
    src:require("../assets/Home/06.jpg"),
    name: "Best Service",
  },
];

const Details = [
  {
    id: 1,
    image: require("../assets/Home/HZSIirCVHj.jpg"),
    title: "History Of Copper Utensils",
    content:
      "Scientifically proven to be effective . Copper utensils were used as tradition in our country from hundreds of years.",
  },
  {
    id: 2,
    image: require("../assets/Home/gFADb6goeQ.jpg"),
    title: "Environmentally friendly",
    content:
      "Good for you and good for the environment. Join us in the  battle against plastic.",
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
  useEffect(() => {
    CheckOrSetUDID();
    getHomePageData();
    getBlogs();
  }, []);

  async function getHomePageData() {
    const response = await client.get("/home");
    if (response.data.status === true) {
      setBanners(response.data.banners);
      setHome(response.data);
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
        {/* {loading === true ? (
          <Skeleton h={489}></Skeleton>
        ) : (
           <Carousel banners={banners} />
         
        )} */}
        <Image w={"100%"} h={489} src={require("../assets/Home/1.jpg")} />
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
          of water every day. You may purchase some plastic bottles from the
          <br />
        </Text>
        <Text
          color={"text.300"}
          align={"center"}
          px={{ base: 15, lg: 20 }}
          fontSize={{ base: "sm", lg: "lg" }}
        >
          nearby shop to store the water and carry with you wherever you go.
          <br />
          <br />
        </Text>
        <Text
          color={"text.300"}
          align={{ base: "justify" }}
          px={{ base: 15, lg: 20 }}
          fontSize={{ base: "sm", lg: "lg" }}
        >
          Nowadays, we get colorful plastic water bottles. They may help you to
          carry water with you. But, it causes adverse effects on our health. As
          they are made of plastic, they contain chemicals which may turn
          poisonous. So, keeping our health in mind, using a plastic water
          bottle is not
        </Text>
        <Text
          color={"text.300"}
          align={"center"}
          px={{ base: 15, lg: 20 }}
          fontSize={{ base: "sm", lg: "lg" }}
        >
          preferred.
          <br />
          <br />
        </Text>

        <Link
          fontWeight={700}
          color={"brand.500"}
          as={RouterLink}
          to={"/about-us"}
          mx={"45%"}
          border={"1px"}
          borderColor={"brand.500"}
          p={3}
          borderRadius={"10px"}
          _hover={{textDecoration:"none",color:"white",bgColor:"text.500"}}
        >
          Read more
        </Link>
      </Container>

      <Container mb={5} px={0} maxW={"container.xl"} centerContent>
        <LazyLoadImage
          src={
            "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/03.jpg"
          }
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
          px={{ base: 7, md: 15, xl: 20 }}
        >
          <GridItem>
            <Image src={require("../assets/Home/V5kf29fiII.jpg")} />
          </GridItem>
          <GridItem>
            <Flex flexDirection={"column"} gap={4} px={10} pt={20}>
              <Heading color={"brand.500"}>Copper Water Bottle 900 ML</Heading>
              <Text fontSize={"19px"} color="text.300">
                <span style={{ fontSize: "24px", fontWeight: 600 }}>RS</span> .
                690.00/-
              </Text>
              <Text fontSize={"19px"} color="text.300">
                {" "}
                Quality
              </Text>
              <Flex alignItems={"center"}>
                {[0,1,2,3].map(()=>(
                <FaHeart style={{marginRight:3}}/>
                ))}
                <CiHeart fontSize={"22px"} />
              </Flex>
              <Button
                borderColor={"text.500"}
                w={150}
                _hover={{ bgColor: "text.500", color: "white" }}
                color="text.500"
                variant="outline"
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
          px={{ base: 7, md: 15, xl: "10%" }}
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
            <Flex flexDirection={"column"} gap={6} my={"20%"}>
              <Heading fontSize={"28px"} color={"text.300"}>
                History Of Copper Utensils
              </Heading>
              <Text color={"text.300"} fontSize={"19px"} textAlign={"justify"}>
                Scientifically proven to be effective . Copper utensils were
                used as tradition in our country from hundreds of years.
              </Text>
              <Link
                fontWeight={700}
                color={"brand.500"}
                as={RouterLink}
                to={"/about-us"}
                w={120}
                border={"1px"}
                borderColor={"brand.500"}
                p={3}
                borderRadius={"10px"}
              >
                Read More
              </Link>
            </Flex>
          </GridItem>
          <GridItem>
            <Flex flexDirection={"column"} gap={6} my={"20%"}>
              <Heading fontSize={"28px"} color={"text.300"}>
                Environmentally friendly
              </Heading>
              <Text color={"text.300"} fontSize={"19px"} textAlign={"justify"}>
                Good for you and good for the environment. Join us in the battle
                against plastic.
              </Text>
              <Link
                fontWeight={700}
                color={"brand.500"}
                as={RouterLink}
                to={"/about-us"}
                w={120}
                border={"1px"}
                borderColor={"brand.500"}
                p={3}
                borderRadius={"10px"}
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

      <ProductListSection
        title="Must Try : KAPITA Products"
        loading={loading}
        products={NewArrival}
      />

      <Container maxW={{ base: "100vw", md: "container.xl" }}>
        <Box
          backgroundSize="100%"
          backgroundPosition="50% 100%"
          backgroundRepeat={"no-repeat"}
        >
          <Heading
            color="brand.500"
            size="lg"
            mx="auto"
            align={"center"}
            mt={3}
            pb={"10px"}
          >
            OUR CERTIFICATIONS & AWARDS
          </Heading>
        </Box>
        <Text my={5} textAlign={"center"} color="text.300">
          We are committed to quality and each of our facility is independently
          certified by an industry-accredited agency.
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
              15+
            </StatNumber>
            <StatHelpText color="gray.600">Stores</StatHelpText>
          </Stat>
        </SimpleGrid>
      </Container>
      <Container maxW={{ base: "100vw", md: "container.xl" }}>
        {/* <Box
          w="100%"
          backgroundImage={
            "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/HomePage/line.png"
          }
          backgroundSize="100%"
          backgroundPosition="50% 100%"
          backgroundRepeat={"no-repeat"}
        >
          <Heading
            color="brand.500"
            size="lg"
            mx="auto"
            align={"center"}
            mb={"5"}
            mt={3}
            pb={"10px"}
          >
            BRAND PARTNERS
          </Heading>
        </Box>
        <Grid
          templateColumns={{
            base: "repeat(2,1fr)",
            md: "repeat(3,1fr)",
            xl: "repeat(6,1fr)",
          }}
          spacing={{ base: 10, md: 14 }}
          py={3}
          px={{ base: 15, md: 20, lg: 24 }}
        >
          {brands?.map((brand, index) => (
            <GridItem as={RouterLink} to={brand?.href ?? "#"}>
              <Image
                as={LazyLoadImage}
                key={index}
                src={brand.src}
                boxSize={{
                  base: "150px",
                  md: "150px",
                  lg: "180px",
                }}
                alt={brand.alt}
                style={{
                  opacity: 1,
                  transition: "opacity 0.7s", // Note the corrected syntax here
                }}
              />
            </GridItem>
          ))}
        </Grid> */}

        <LazyLoadImage
          w="100%"
          mx="auto"
          style={{
            opacity: 1,
            transition: "opacity 0.7s", // Note the corrected syntax here
          }}
        />
        <Grid
          templateColumns={{
            base: "repeat(3, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(6,1fr)",
          }}
          gap={2}
          my={6}
          mx={{ md: "15%", base: 3 }}
        >
          {imageInfo?.map((data) => (
            <GridItem>
              <Flex
                flexDirection={"column"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <LazyLoadImage
                  cursor={"pointer"}
                  transition="all 1s ease"
                  _hover={{
                    transform: "scale(1.25)",
                  }}
                  src={data.src}
                  alt={data.name}
                  style={{
                    opacity: 1,
                    transition: "opacity 0.7s",
                    width: "100px",
                    // Note the corrected syntax here
                  }}
                />
                <Text textAlign={"center"} fontSize={"14px"} mt={2}>
                  {data.name}
                </Text>
              </Flex>
            </GridItem>
          ))}
        </Grid>
        <Box
          w="100%"
          backgroundSize="100%"
          backgroundPosition="50% 100%"
          backgroundRepeat={"no-repeat"}
        >
          <Heading
            color="brand.500"
            size="lg"
            mx="auto"
            align={"center"}
            my={"5"}
            pb={"10px"}
          >
            SERVING TO THE COUNTRIES
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
            size="lg"
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
