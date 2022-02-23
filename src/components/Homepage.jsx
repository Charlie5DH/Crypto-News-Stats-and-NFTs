import React from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";
import { Alert } from "antd";
import Loader from "./Loader";

import { useGetCryptosQuery } from "../services/cryptoApi";

import Cryptocurrencies from "./Cryptocurrencies";
import News from "./News";
import NftExplorer from "./NftExplorer";

const { Title } = Typography;

const Homepage = () => {
  const { data, error, isLoading } = useGetCryptosQuery(10);

  const globalStats = data?.data?.stats;

  if (isLoading) return <Loader />;

  return (
    <>
      <Title level={2} className="heading">
        Global Crypto Stats
      </Title>
      <div className="homepage-crypto-header">
        <Row gutter={[32, 32]}>
          {error ? (
            <Alert message={`Error ${error.name}`} type="error" showIcon description={error.message} />
          ) : isLoading ? (
            <Loader />
          ) : data ? (
            <>
              <Col span={12}>
                <Statistic title="Total Cryptocurrencies" value={globalStats.total} />
              </Col>
              <Col span={12}>
                <Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)} />
              </Col>
              <Col span={12}>
                <Statistic title="Total Market Cap:" value={`$${millify(globalStats.totalMarketCap)}`} />
              </Col>
              <Col span={12}>
                <Statistic title="Total 24h Volume" value={`$${millify(globalStats.total24hVolume)}`} />
              </Col>
              <Col span={12}>
                <Statistic title="Total Cryptocurrencies" value={globalStats.total} />
              </Col>
              <Col span={12}>
                <Statistic title="Total Markets" value={millify(globalStats.totalMarkets)} />
              </Col>
            </>
          ) : null}
        </Row>
      </div>
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 Cryptos In The World
        </Title>
        <Title level={3} className="show-more">
          <Link to="/cryptocurrencies" className="show-more-text">
            Show more
          </Link>
        </Title>
      </div>
      <Cryptocurrencies simplified />

      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Latest Crypto News
        </Title>
        <Title level={3}>
          <Link to="/news">Show more</Link>
        </Title>
      </div>
      <News simplified />

      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Best NFTs
        </Title>
        <Title level={3}>
          <Link to="/nft">Show more</Link>
        </Title>
      </div>
      <NftExplorer simplified />
    </>
  );
};

export default Homepage;
