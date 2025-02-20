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
import ScrollToTop from "../components/ScrollToTop";
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
import { useNavigate, NavLink as RouterLink, Link as ReactRouterLink } from "react-router-dom";
import { ChevronRightIcon } from "@chakra-ui/icons";
import Testimonials from "../components/testimonials";
import LoginModal from "../components/LoginModal";
import checkLogin from "../utils/checkLogin";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux"
import CountUp from 'react-countup';
import ScrollTrigger from 'react-scroll-trigger';

import {
  initializeAppData
} from "../redux/slices/homeApi";
import MetaHome from "../components/MetaHome";
import BlogSliderHome from "../components/BlogSliderHome";
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
export default function Home() {
  const [isFullScreen] = useMediaQuery("(min-width: 768px)");
  const width = useBreakpointValue({ base: "100%", lg: "100%" });
  const height = useBreakpointValue({ base: "300", lg: "400" });
  const [isMobile] = useMediaQuery("(max-width: 480px)");
  const [homeData, setHome] = useState({});
  const [sections, setSections] = useState([]);
  const loginInfo = checkLogin();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const checkOrSetUDIDInfo = CheckOrSetUDID();
  const [countUp, setCountUp] = useState()
  const [showPopup, setShowPopup] = useState(
    sessionStorage.getItem("hasShownPopup")
  );
  const isMobiles = width <= 768;
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const {
    banners,
    upperSection,
    mustTry,
    loader,
    blogs,
    statistics,
    lowerSection,
    hasFetched,
  } = useSelector((state) => state.home);

  const {
    ourAboutSection,
    ourMainProductSection,
    ourCertificateSection,
    ourSmallBannerSection,
    ourNonGmoSection,
  } = upperSection;

  const {
    awardsSection,
    servicesSection,
    availableSection,
  } = lowerSection;

  useEffect(() => {
    const init = async () => {
      await CheckOrSetUDID();
    };
    init();
    if (showPopup === null && !loginInfo.isLoggedIn) {
      setIsLoginModalOpen(true);
    }
  }, []);

  useEffect(() => {
    if (!hasFetched) {
      dispatch(initializeAppData());
    }
  }, [dispatch, hasFetched]);

  const pageUrl = "/";

  return (
    <>
      <MetaHome pageUrl={pageUrl} />


      {/* {Loader === true ? (
        <Center h="100vh" w="100vw" backgroundColor={"bg.500"}>
          <Loader site={true} />
        </Center>
      ) : (
        <> */}
      <Navbar />
      <Container maxW={"container.xl"} px={0}>
        {loader === true ? (
          <Skeleton h={489}></Skeleton>
        ) : (
          <Carousel banners={banners?.length > 0 && banners} />
        )}
      </Container>

      {ourAboutSection?.length > 0 &&
        ourAboutSection[0]?.is_visible_on_website === true && (
          <Container maxW={"container.xl"} mb={8} px={0}>
            <Text
              fontSize={{ base: "xl", sm: "2xl", xl: "2xl" }}
              fontWeight={500}
              color={"text.500"}
              bgColor={"bg.500"}
              textAlign={{ base: "center", md: "start" }}
              px={{ base: 2, md: 8 }}
              py={4}
            //my={3}
            >
              {ourAboutSection[0]?.label}
            </Text>
            <Text
              color={"text.300"}
              mt={2}
              align={{ base: "justify" }}
              px={{ base: 15, lg: 20 }}
              fontSize={{ base: "sm", lg: "lg" }}
              whiteSpace={"pre-line"}
            >
              {ourAboutSection[0]?.description}
              <br />
              <br />
            </Text>

            <Link
              fontWeight={700}
              color={"brand.500"}
              as={RouterLink}
              to={"/about-us"}
              mx={{ lg: "45%", base: "33%", md: "42%" }}
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
        )}

      {ourCertificateSection?.length > 0 &&
        ourCertificateSection[0]?.is_visible_on_website === true && (
          <Container mb={5} px={0} maxW={"container.xl"} centerContent>
            <Image
              src={ourCertificateSection[0]?.image}
              alt=""
              style={{
                opacity: 1,
                transition: "opacity 0.7s", // Note the corrected syntax here
                width: "100%"
              }}
            />
          </Container>
        )}
      {ourMainProductSection?.length > 0 &&
        ourMainProductSection[0]?.is_visible_on_website === true && (
          <Container mb={5} px={0} maxW={"container.xl"} centerContent>
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
                <Image
                  src={
                    ourMainProductSection[0]?.images?.length > 0 &&
                    ourMainProductSection[0]?.images[0]?.image
                  }
                />
              </GridItem>
              <GridItem>
                <Flex
                  flexDirection={"column"}
                  gap={4}
                  px={{ md: 10 }}
                  pt={{ md: 20 }}
                >
                  <Heading
                    fontSize={{ md: 28, base: 24 }}
                    color={"brand.500"}
                    lineHeight={10}
                  >
                    {ourMainProductSection[0]?.images?.length > 0 &&
                      ourMainProductSection[0]?.images[0]?.product_name}
                  </Heading>
                  <Text fontSize={"19px"} color="text.300">
                    <span style={{ fontSize: "24px", fontWeight: 600 }}>
                      RS
                    </span>{" "}
                    . 760.00/-
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
                    onClick={() =>
                      navigate(
                        `/products/${ourMainProductSection[0]?.images[0]?.product}/${ourMainProductSection[0]?.images[0]?.product_name.replace(/\s+/g, "-")}`
                      )
                    }
                    cursor={"pointer"}
                  >
                    Buy Now
                  </Button>
                </Flex>
              </GridItem>
            </Grid>
          </Container>
        )}

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
      </Container>
      {ourSmallBannerSection?.length > 0 &&
        ourSmallBannerSection[0]?.is_visible_on_website === true && (
          <Container maxW={"container.xl"} mb={5} px={0}>
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
                <Image
                  src={
                    ourSmallBannerSection[0]?.images?.length > 0 &&
                    ourSmallBannerSection[0]?.images[0]?.image
                  }
                />
              </GridItem>
              <GridItem cursor={"pointer"}>
                <Flex flexDirection={"column"} gap={6} my={{ md: "20%" }}>
                  <Heading
                    fontSize={{ md: "28px", base: 24 }}
                    color={"text.500"}
                  >
                    History Of Copper Utensils
                  </Heading>
                  <Text
                    color={"text.300"}
                    fontSize={"19px"}
                    textAlign={"justify"}
                  >
                    {ourSmallBannerSection[0]?.images?.length > 0 &&
                      ourSmallBannerSection[0]?.images[0]?.description}
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
                    _hover={{
                      textDecoration: "none",
                      bgColor: "brand.500",
                      color: "#fff",
                    }}
                  >
                    Read More
                  </Link>
                </Flex>
              </GridItem>
              <GridItem>
                <Flex flexDirection={"column"} gap={6} my={{ md: "20%" }}>
                  <Heading
                    fontSize={{ md: "28px", base: 24 }}
                    color={"text.500"}
                  >
                    Environmentally Friendly
                  </Heading>
                  <Text
                    color={"text.300"}
                    fontSize={"19px"}
                    textAlign={"justify"}
                  >
                    {ourSmallBannerSection[0]?.images?.length > 0 &&
                      ourSmallBannerSection[0]?.images[1]?.description}
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
                    _hover={{
                      textDecoration: "none",
                      bgColor: "brand.500",
                      color: "#fff",
                    }}
                  >
                    Read More
                  </Link>
                </Flex>
              </GridItem>
              <GridItem cursor={"pointer"}>
                <Image
                  src={
                    ourSmallBannerSection[0]?.images?.length > 0 &&
                    ourSmallBannerSection[0]?.images[1]?.image
                  }
                />
              </GridItem>
            </Grid>
          </Container>
        )}

      {mustTry?.length > 0 && 
      <ProductListSectionHome
        title="Must Try : KAPITA Products"
        loader={loader}
        products={mustTry}
        type={isMobile && "carousal"}
      />}

      <BlogSliderHome blogs={blogs} />


      {awardsSection?.length > 0 &&
        awardsSection[0]?.is_visible_on_website === true && (
          <Container maxW={{ base: "100vw", md: "container.xl" }}>
            <Heading
              color="brand.500"
              fontSize={{ md: 33, base: 20 }}
              mx="auto"
              align={"center"}
              mt={3}
              pb={"10px"}
            >
              {awardsSection?.length > 0 && awardsSection[0]?.label}
            </Heading>

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
                  awardsSection[0]?.images?.length > 0 &&
                  awardsSection[0]?.images[0]?.image
                }
                alt="global-certificate"
                style={{
                  opacity: 1,
                  transition: "opacity 0.7s", // Note the corrected syntax here
                }}
              />
              <LazyLoadImage
                src={
                  awardsSection[0]?.images?.length > 0 &&
                  awardsSection[0]?.images[1]?.image
                }
                alt="ciolook-certificate"
                style={{
                  opacity: 1,
                  transition: "opacity 0.7s", // Note the corrected syntax here
                }}
              />
            </Flex>
          </Container>
        )}

      {statistics?.length > 0 && (
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
            {statistics?.length > 0 &&
              statistics?.map((data) => (
                <Stat key={data.id}>
                  <StatNumber fontSize={{ base: "3xl", md: "3xl" }}>
                    <ScrollTrigger
                      onEnter={() => setCountUp(true)}
                      // onExit={() => setCountUp(false)}
                    >
                      {countUp ? (
                        <CountUp
                          start={0}
                          end={Number(data.value.replace('+', ''))}
                          duration={2}
                          delay={0}
                        />
                      ) : null}
                      {data?.name === "Positive Feedback" ? "%+" : "+"}
                      </ScrollTrigger>
                    
                  </StatNumber>
                  <StatHelpText color="gray.600">{data?.name}</StatHelpText>
                </Stat>
              ))}
          </SimpleGrid>
        </Container>
      )}
      <Container maxW={{ base: "100vw", md: "container.xl" }} centerContent>
        {/* <Heading
            color="brand.500"
            fontSize={{md:33,base:20}}
            mx="auto"
            align={"center"}
            mt={4}
            
          >
           LICENSES & AFFILIATIONS
          </Heading> */}
        {/* <Flex justify="center" align="center" >
          <Image
            src={require("../assets/Home/fssai.png")}
            boxSize={{md:160,base:130}}
            alt="Coffee Board"
            style={{
              opacity: 1,
              transition: "opacity 0.7s", // Note the corrected syntax here
            }}
          />
        </Flex> */}
        {ourNonGmoSection?.length > 0 &&
          ourNonGmoSection[0]?.is_visible_on_website === true && (
            <Container maxW={"container.xl"} centerContent>
              <Image
                my={10}
                src={ourNonGmoSection[0]?.image}
                w={{ md: "65%" }}
              />
            </Container>
          )}
        {servicesSection?.length > 0 &&
          servicesSection[0]?.is_visible_on_website === true && (
            <Container maxW={{ base: "100vw", md: "container.xl" }}>
              <Heading
                color="brand.500"
                fontSize={{ md: 33, base: 20 }}
                mx="auto"
                align={"center"}
                my={"5"}
                pb={"10px"}
              >
                {servicesSection?.length > 0 && servicesSection[0].label}
              </Heading>

              <Box display={"flex"} justifyContent={"center"}>
                <LazyLoadImage
                  src={
                    servicesSection?.length > 0 &&
                    servicesSection[0]?.images[0].image
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
            </Container>
          )}
        {availableSection?.length > 0 &&
          availableSection[0]?.is_visible_on_website === true && (
            <Container maxW={"container.xl"} mb={5} px={0} centerContent>
              <Heading
                color="brand.500"
                fontSize={{ md: 33, base: 22 }}
                mx="auto"
                align={"center"}
                my={"5"}
                pb={"10px"}
              >
                {availableSection?.length > 0 && availableSection[0].label}
              </Heading>

              <Image
                src={
                  availableSection?.length > 0 &&
                  availableSection[0]?.images[0].image
                }
                w={"container.xl"}
                alt=""
                style={{
                  opacity: 1,
                  transition: "opacity 0.7s", // Note the corrected syntax here
                }}
              />
            </Container>
          )}
      </Container>
      {!checkLogin().isLoggedIn && (
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
        />
      )}
      <ScrollToTop />
      <Footer />
      {/* </>
      )} */}
    </>
  );
}
