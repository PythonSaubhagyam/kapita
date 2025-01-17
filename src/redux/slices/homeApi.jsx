import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import client from "../../setup/axiosClient";

export const initializeAppData = createAsyncThunk("app/initializeData", async (_, { rejectWithValue }) => {
    try {
        const [bannersResponse, upperSectionResponse, mustTryResponse, blogsResponse, statisticsResponse, lowerSectionResponse] = await Promise.all([
            client.get("/ecommerce/banners/?sequence=Upper"),
            client.get("/kapita-section/?type=Upper"),
            client.get("/musttry/list"),
            client.get("/home/blogs/"),
            client.get("/statistics-section/"),
            client.get("/lower-section/"),
        ]);

        return {
            banners: bannersResponse.data.banner || [],
            upperSection: upperSectionResponse.data.data || [],
            mustTry: mustTryResponse.data.data || [],
            blogs: blogsResponse.data.blogs || [],
            statistics: statisticsResponse.data.data || {},
            lowerSection: lowerSectionResponse.data.data || [],
        };
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const bannerSlice = createSlice({
    name: "home",
    initialState: {
        banners: [],
        upperSection: {
            ourAboutSection: [],
            ourMainProductSection: [],
            ourCertificateSection: [],
            ourSmallBannerSection: [],
            ourNonGmoSection: [],
        },
        mustTry: [],
        blogs: [],
        statistics: {},
        lowerSection: {
            awardsSection: [],
            servicesSection: [],
            availableSection: [],
        },
        loader: false,
        error: null,
        hasFetched: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(initializeAppData.pending, (state) => {
                state.loader = true;
            })
            .addCase(initializeAppData.fulfilled, (state, action) => {
                state.loader = false;
                const { banners, upperSection, mustTry, blogs, statistics, lowerSection } = action.payload;

                state.banners = banners;

                // Organize upperSection data
                state.upperSection = {
                    ourAboutSection: upperSection.filter((section) => section.id === 1),
                    ourCertificateSection: upperSection.filter((section) => section.id === 2),
                    ourMainProductSection: upperSection.filter((section) => section.id === 3),
                    ourSmallBannerSection: upperSection.filter((section) => section.id === 4),
                    ourNonGmoSection: upperSection.filter((section) => section.id === 5),
                };

                state.mustTry = mustTry;
                state.blogs = blogs;
                state.statistics = statistics;

                // Organize lowerSection data
                state.lowerSection = {
                    awardsSection: lowerSection.filter((section) => section.id === 1),
                    servicesSection: lowerSection.filter((section) => section.id === 2),
                    availableSection: lowerSection.filter((section) => section.id === 3),
                };
                state.hasFetched = true
            })
            .addCase(initializeAppData.rejected, (state, action) => {
                state.loader = false;
                state.error = action.payload;
            });
    },
});

export default bannerSlice.reducer;
