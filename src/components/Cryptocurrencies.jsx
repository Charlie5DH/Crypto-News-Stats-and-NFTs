import React, { useEffect, useState } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";
import { Tag } from "antd";

import { useGetCryptosQuery } from "../services/cryptoApi";
import Loader from "./Loader";
import { CaretDownOutlined, CaretUpOutlined, DollarCircleOutlined, RiseOutlined } from "@ant-design/icons/lib/icons";

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setCryptos(cryptosList?.data?.coins);

    const filteredData = cryptosList?.data?.coins.filter((item) => item.name.toLowerCase().includes(searchTerm));

    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  if (isFetching) return <Loader />;

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input placeholder="Search Cryptocurrency" onChange={(e) => setSearchTerm(e.target.value.toLowerCase())} />
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.uuid}>
            {/* Note: Change currency.id to currency.uuid  */}
            <Link key={currency.uuid} to={`/crypto/${currency.uuid}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={<img className="crypto-image" alt="coins" src={currency.iconUrl} />}
                hoverable
                style={{ borderRadius: "30px" }}
              >
                <Tag
                  color="#3b5999"
                  icon={<DollarCircleOutlined />}
                  style={{
                    borderRadius: "10px",
                    marginBottom: "10px",
                    fontSize: "13px",
                    boxShadow: "10px 5px 10px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  Price: {millify(currency.price)}
                </Tag>

                <Tag
                  color={currency.change < 0 ? "#DB8B8B" : "#82CA8A"}
                  icon={currency.change < 0 ? <CaretDownOutlined /> : <CaretUpOutlined />}
                  style={{
                    borderRadius: "10px",
                    marginBottom: "10px",
                    fontSize: "13px",
                    boxShadow: "10px 5px 10px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  Daily Change: {currency.change}%
                </Tag>

                <Tag
                  color="#3b5999"
                  icon={<RiseOutlined />}
                  style={{
                    borderRadius: "10px",
                    marginBottom: "10px",
                    fontSize: "13px",
                    boxShadow: "10px 5px 10px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  Market Cap: {millify(currency.marketCap)}
                </Tag>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
