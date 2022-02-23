import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURL = "https://coinranking1.p.rapidapi.com";

const createRequest = (url) => ({
  url,
  headers: {
    "x-rapidapi-host": "coinranking1.p.rapidapi.com",
    "x-rapidapi-key": process.env.REACT_APP_RAPID_API_COINRANKING_KEY,
  },
});

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),

    // Note: Change the coin price history endpoint from this - `coin/${coinId}/history/${timeperiod} to this - `coin/${coinId}/history?timeperiod=${timeperiod}`
    getCryptoHistory: builder.query({
      query: ({ coinId, timeperiod }) => createRequest(`/coin/${coinId}/history?timeperiod=${timeperiod}`),
    }),
  }),
});

export const { useGetCryptosQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } = cryptoApi;
