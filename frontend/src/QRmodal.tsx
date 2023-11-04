import React, { useState } from "react";
import styles from "../styles/QRmodal.module.css";
import { useEffect, useRef } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  getParsedNftAccountsByOwner,
  isValidSolanaAddress,
  createConnectionConfig,
} from "@nfteyez/sol-rayz";
import { Col, Row, Button, Form } from "react-bootstrap";
//@ts-ignore
import AlertDismissible from "./components/alert/alertDismissible";
//@ts-ignore
import PreLoader from "./components/preloader";
//@ts-ignore
import Collections from "./components/collections";
//@ts-ignore
import GalleryView from "./components/galleryview";
import styled from "styled-components";

const ButtonStyled = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 18px 24px;
  gap: 10px;
  width: 80%;
  height: 3rem;
  background-color: var(--primary) !important;
  border-radius: 4px;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 150%;
  color: var(--white) !important;
  transition: 0.2s;
  :hover {
    opacity: 0.9;
  }
`;
const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
  color: white;
`;
const QRmodal = ({ connection, cluster }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
    getNfts();
  };

  const closeModal = () => {
    setIsOpen(false);
    setView("collection");
  };
  const { publicKey } = useWallet();

  // input ref

  // state change
  useEffect(() => {
    setNfts([]);
    setView("collection");
    setGroupedNfts([]);
    setShow(false);
  }, [publicKey, connection]);

  const [nfts, setNfts] = useState([]);
  const [groupedNfts, setGroupedNfts] = useState<any[]>([]);
  const [view, setView] = useState("collection");
  //alert props
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);

  //loading props
  const [loading, setLoading] = useState(false);

  const getNfts = async () => {
    setShow(false);

    let address = publicKey.toString();

    if (!isValidSolanaAddress(address)) {
      setTitle("Invalid address");
      setMessage("Please enter a valid Solana address or Connect your wallet");
      setLoading(false);
      setShow(true);
      return;
    }

    const connect = createConnectionConfig(connection);

    setLoading(true);
    const nftArray = await getParsedNftAccountsByOwner({
      publicAddress: address,
      connection: connect,
    });

    if (nftArray.length === 0) {
      setTitle("No NFTs found");
      setMessage("");
      setLoading(false);
      setView("collection");
      setShow(true);
      return;
    }

    const metadatas = await fetchMetadata(nftArray);
    var group: any[] = [];

    for (const nft of metadatas) {
      if (group.hasOwnProperty(nft.data.symbol)) {
        group[nft.data.symbol].push(nft);
      } else {
        group[nft.data.symbol] = [nft];
      }
    }
    setGroupedNfts(group);
    setLoading(false);
    return setNfts(metadatas);
  };

  const fetchMetadata = async (nftArray) => {
    let metadatas = [];
    for (const nft of nftArray) {
      try {
        await fetch(nft.data.uri)
          .then((response) => response.json())
          .then((meta) => {
            metadatas.push({ ...meta, ...nft });
          });
      } catch (error) {
        console.log(error);
      }
    }
    return metadatas;
  };

  return (
    <div>
      <button
        className="generateqr"
        onClick={openModal}
        style={{
          fontSize: "20px",
          height: "80px",
          width: "700px",
          backgroundColor: "var(--primary)",
          color: "white",
          border: "none",
        }}
      >
        Generate QR code
      </button>
      {isOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2 style={{ margin: "30px", fontSize: "50px" }}>
              Generate a QR code for your NFT ticket
            </h2>
            <div>
              <div className="main">
                {loading || nfts.length === 0 ? (
                  <div className="loading">
                    <PreLoader  />
                  </div>
                ) : view === "collection" ? (
                  <Collections
                    groupedNfts={groupedNfts}
                    setNfts={setNfts}
                    setView={setView}
                  />
                ) : (
                  <GalleryView nfts={nfts} />
                )}
                {nfts.length === 0 && (
                  <AlertDismissible
                    title={title}
                    message={message}
                    setShow={setShow}
                  />
                )}
              </div>
            </div>

            <CloseButton onClick={closeModal}>⛌</CloseButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default QRmodal;
