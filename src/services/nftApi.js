import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURL = "https://nft-explorer.p.rapidapi.com";

const createRequest = (url) => ({
  url,
  headers: {
    "x-rapidapi-host": "nft-explorer.p.rapidapi.com",
    "x-rapidapi-key": process.env.REACT_APP_RAPID_API_NFTEXPLORER_KEY,
  },
});

export const nftApi = createApi({
  reducerPath: "nftApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    getNfts: builder.query({
      query: () => createRequest(`/search?chain=eth&filter=global&offset=20&q=ape`),
    }),
    getNftDetails: builder.query({
      query: (nftId) => createRequest(`/search/${nftId}`),
    }),
  }),
});

export const { useGetNftsQuery, useGetNftDetailsQuery } = nftApi;
