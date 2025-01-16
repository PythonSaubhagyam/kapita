import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import client from "../../setup/axiosClient";

// Initial state for banners
const initialState = {
    banners: [],
    upperSection: {
        ourAboutSection: [],
        ourMainProductSection: [],
        ourCertificateSection: [],
        ourSmallBannerSection:[],
        ourNonGmoSection: [],
    },
    mustTrySection: [],
    blogs: [],
    statisticsSection: {},
    lowerSection: {
        awardsSection: [],
        servicesSection: [],
        availableSection: [],
    },
    loader: false,
    error: null,
}

const getResponseData = (res, key) => {
    if (!res || !res.status) return [];
    return res[key] || res.data || [];
};

//1 Async thunk for fetching banners
export const fetchBanner = createAsyncThunk("banners/fetchBanner", async () => {
    const res = await client.get("/ecommerce/banners/?sequence=Upper");
    return res.data
}
)

//2 Async thunk for fetching UpperSection
export const fetchUpperSection = createAsyncThunk("home/fetchUpperSection", async () => {
    const response = await client.get("/kapita-section/?type=Upper");
    return response.data;
}
);

//3 Async thunk for fetching Must Try Section Section
export const fetchMustTry = createAsyncThunk("home/fetchMustTry", async () => {
    const response = await client.get("/musttry/list");
    return response.data;
});

//4 Async thunk for fetching Blog Section
export const fetchBlogs = createAsyncThunk("home/fetchBlogs", async () => {
    const response = await client.get("/home/blogs/");
    console.log("first",response)
    return response.data;
});

//5 Async thunk for fetching Statistics Section Section
export const fetchStatisticsSection = createAsyncThunk("home/fetchStatisticsSection", async () => {
    const response = await client.get("/statistics-section/");
    return response.data;
});

//6 Async thunk for fetching Lower Section 2 Section
export const fetchLowerSection = createAsyncThunk("home/fetchLowerSection", async () => {
    const response = await client.get("/lower-section/");
    return response.data;
});


const bannerSlice = createSlice({
    name: "home",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            //1 Banners 
            .addCase(fetchBanner.pending, (state) => {
                state.loader = true;
            })
            .addCase(fetchBanner.fulfilled, (state, action) => {
                state.loader = false;
                if (action.payload.status === true) {
                    state.banners = getResponseData(action.payload, "banner");
                }
            })
            .addCase(fetchBanner.rejected, (state, action) => {
                state.loader = false;
                state.error = action.error.message;
            })

            //2 Upper Section
            .addCase(fetchUpperSection.pending, (state) => {
                state.loader = true;
            })
            .addCase(fetchUpperSection.fulfilled, (state, action) => {
                state.loader = false;
                if (action.payload.status === true) {
                    const data = getResponseData(action.payload, "data");
                    console.log(data)
                    state.upperSection = {
                        ourAboutSection: data.filter((section) => section.id === 1),
                        ourCertificateSection: data.filter((section) => section.id === 2),
                        ourMainProductSection : data.filter((section) => section.id === 3),
                        ourSmallBannerSection : data.filter((section) => section.id === 4),
                        ourNonGmoSection: data.filter((section) => section.id === 5),
                    }
                }
            })
            .addCase(fetchUpperSection.rejected, (state, action) => {
                state.loader = false,
                    state.error = action.error.message;
            })

            //3 Must Try Product
            .addCase(fetchMustTry.pending, (state) => {
                state.loader = true
            })
            .addCase(fetchMustTry.fulfilled, (state, action) => {
                state.loader = false
                if (action.payload.status === true) {
                    state.mustTrySection = getResponseData(action.payload, "data")
                }
            })
            .addCase(fetchMustTry.rejected, (state, action) => {
                state.loader = false;
                state.error = action.error.message;
            })
            
            //4 Blogs Section
            .addCase(fetchBlogs.pending, (state) => {
                state.loader = true
            })
            .addCase(fetchBlogs.fulfilled, (state,action) => {
                state.loader = false
                if (action.payload.status === true) {
                    state.blogs = getResponseData(action.payload,"blogs")
                    console.log("blogs",state.blogs)

                }
            })
            .addCase(fetchBlogs.rejected, (state, action) => {
                state.loader = false;
                state.error = action.error.message;
            })

            //5 Statistics Section
            .addCase(fetchStatisticsSection.pending, (state) => {
                state.loader = true
            })
            .addCase(fetchStatisticsSection.fulfilled, (state, action) => {
                state.loader = false
                if (action.payload.status === true) {
                    state.statisticsSection = getResponseData(action.payload, "data")
                }
            })
            .addCase(fetchStatisticsSection.rejected, (state, action) => {
                state.loader = false;
                state.error = action.error.message;
            })

            //6 Lower Section 2
            .addCase(fetchLowerSection.pending, (state) => {
                state.loader = true
            })
            .addCase(fetchLowerSection.fulfilled, (state, action) => {
                state.loader = false
                if (action.payload.status === true) {
                    const data = getResponseData(action.payload, "data")
                    console.log("ls2", data)
                    state.lowerSection = {
                        awardsSection: data.filter((section) => section.id === 1),
                        servicesSection: data.filter((section) => section.id === 2),
                        availableSection: data.filter((section) => section.id === 3)
                    }
                }
            })
            .addCase(fetchLowerSection.rejected, (state, action) => {
                state.loader = false;
                state.error = action.error.message;
            })
    }
});
export default bannerSlice.reducer;