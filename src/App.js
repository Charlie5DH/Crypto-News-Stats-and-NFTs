import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Layout, Typography, Space } from "antd";

import { Navbar, Homepage, Cryptocurrencies, CryptoDetails, News, NftExplorer } from "./components";

import "./App.css";

const App = () => {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout style={{ backgroundColor: "#E5E6F3" }}>
          <div className="routes">
            <Routes>
              <Route exact path="/" element={<Homepage />} />
              <Route path="/nft" element={<NftExplorer />} />
              <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
              <Route path="/crypto/:coinId" element={<CryptoDetails />} />
              <Route path="/news" element={<News />} />
            </Routes>
          </div>
        </Layout>
        <div className="footer">
          <Typography.Title level={5} style={{ color: "white", textAlign: "center" }}>
            Copyright © 2022
            <Link to="/">CryptoDashboard Inc.</Link> <br />
            All Rights Reserved.
          </Typography.Title>
          <Space>
            <Link to="/">Home</Link>
            <Link to="/exchanges">Exchanges</Link>
            <Link to="/news">News</Link>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default App;
