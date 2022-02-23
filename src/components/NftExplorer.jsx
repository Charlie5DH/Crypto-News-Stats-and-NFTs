import React, { useEffect, useState } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input, Typography } from "antd";
import { Tag } from "antd";

import { useGetNftsQuery } from "../services/nftApi";
import Loader from "./Loader";
import { CalendarFilled, DollarCircleOutlined, RiseOutlined } from "@ant-design/icons/lib/icons";

const NftExplorer = ({ simplified }) => {
  const count = simplified ? 8 : 100;
  const { data: nftList, isFetching } = useGetNftsQuery(count);
  const [nfts, setNfts] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setNfts(nftList?.result);

    const filteredData = nftList?.result.slice(0, count);

    setNfts(filteredData);
  }, [nftList, searchTerm, count]);

  if (isFetching) return <Loader />;

  //{"id":50417,"name":"Grape Ape","generation":7,"created_at":"2017-12-04T00:51:47.000Z","birthday":"2017-12-04T00:00:00.000Z","image_url":"https://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/50417.svg","image_url_cdn":"https://img.cn.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/50417.svg","color":"sizzurp","kitty_type":null,"is_fancy":false,"is_exclusive":false,"is_special_edition":false,"fancy_type":null,"language":"en","is_prestige":false,"prestige_type":null,"prestige_ranking":null,"prestige_time_limit":null,"status":{"is_ready":true,"is_gestating":false,"cooldown":1518108720046,"dynamic_cooldown":1515931994632,"cooldown_index":5,"cooldown_end_block":4717550,"pending_tx_type":null,"pending_tx_since":null},"purrs":{"count":1,"is_purred":false},"watchlist":{"count":0,"is_watchlisted":false},"hatcher":{"address":"0x72cb30c078df02f16c695233bc70917f9cb16d94","image":"17","nickname":"PurpleSuede","hasDapper":false,"twitter_id":null,"twitter_image_url":null,"twitter_handle":null},"auction":{},"offer":{},"owner":{"address":"0x72cb30c078df02f16c695233bc70917f9cb16d94","hasDapper":false,"twitter_id":null,"twitter_image_url":null,"twitter_handle":null,"image":"17","nickname":"PurpleSuede"}
  //metadata(pin):"{"image":"https://www.larvalabs.com/cryptopunks/cryptopunk8219.png","name":"CryptoPunk 8219","attributes":["Knitted Cap"],"description":"Ape"}"
  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input placeholder="Search NFTs" onChange={(e) => setSearchTerm(e.target.value.toLowerCase())} />
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {nfts?.map((nft, id) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={id}>
            {/* Note: Change nft.metadata.id to nft.metadata.uuid  */}
            <Card
              title={`Name: ${JSON.parse(nft.metadata).name}`}
              cover={
                JSON.parse(nft.metadata).image ? (
                  <img className="nft-image" alt="nft" src={JSON.parse(nft.metadata).image} />
                ) : (
                  <img className="nft-image" alt="nft" src={JSON.parse(nft.metadata).image_url} />
                )
              }
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
                Contract Type: {nft.contract_type}
              </Tag>

              <Tag
                color={"#82CA8A"}
                icon={<CalendarFilled />}
                style={{
                  borderRadius: "10px",
                  marginBottom: "10px",
                  fontSize: "13px",
                  boxShadow: "10px 5px 10px rgba(0, 0, 0, 0.2)",
                }}
              >
                Synced At: {nft.synced_at}
              </Tag>
              <Tag
                color={"#A2A5D2"}
                style={{
                  borderRadius: "10px",
                  marginBottom: "10px",
                  fontSize: "11px",
                  boxShadow: "10px 5px 10px rgba(0, 0, 0, 0.2)",
                }}
              >
                Token Adress: {nft.token_address}
              </Tag>
              <Tag
                color={"#ECA790"}
                style={{
                  borderRadius: "10px",
                  marginBottom: "10px",
                  fontSize: "11px",
                  boxShadow: "10px 5px 10px rgba(0, 0, 0, 0.2)",
                }}
              >
                Token URi: {nft.token_uri}
              </Tag>
              <Tag
                color={"#2F2E41"}
                style={{
                  display: "flex",
                  borderRadius: "10px",
                  marginBottom: "10px",
                  fontSize: "12px",
                  boxShadow: "10px 5px 10px rgba(0, 0, 0, 0.2)",
                }}
              >
                Minter: {nft.minter_address}
              </Tag>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default NftExplorer;
