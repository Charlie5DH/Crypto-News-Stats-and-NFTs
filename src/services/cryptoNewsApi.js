import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURL = "https://bing-news-search1.p.rapidapi.com";

const createRequest = (url) => ({
  url,
  headers: {
    "x-bingapis-sdk": "true",
    "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
    "x-rapidapi-key": process.env.REACT_APP_RAPID_API_BINGSEARCH_KEY,
  },
});

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) =>
        createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
