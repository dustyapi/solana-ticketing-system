import { Card, Row, Col, Container } from "react-bootstrap";
import crypto from "crypto";
import QRCode from "qrcode";
import { useState, useEffect } from "react";
import { db } from "../helpers/firebaseConfig";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";
import { createHmac } from "crypto";
import Confetti from "react-confetti";

function GalleryView({ nfts }) {
  const [generatedQRcode, setGeneratedQRcode] = useState(null);
  const [hashes, setHashes] = useState([]);
  const hashCollectionRef = collection(db, "qrHashes");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [emailError, setEmailError] = useState("");

  const validateEmail = () => {
    console.log("email ws alidaeted");
    if (!email) {
      setEmailError("Email is required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email");
      return false;
    }

    setEmailError("");
    return true;
  };
  useEffect(() => {
    const getHashes = async () => {
      const snapshot = await getDocs(hashCollectionRef);
      const hashData = snapshot.docs.map((doc) => doc.data());
      setHashes(hashData);
    };

    getHashes();
  }, []);

  const handleQrGeneration = async (mint) => {
    if (!validateEmail()) {
      return;
    }
    const nameValue = name.trim();
    const emailValue = email.trim();
    const privateKey = "pass@123"; // Put this in an environment file and use a safer method to store secrets
    const hmac = createHmac("sha256", privateKey);
    const hash = hmac.update(mint).digest("hex");

    try {
      const q = query(hashCollectionRef, where("email", "==", emailValue)); // Query to check if email is already used
      const querySnapshot = await getDocs(q);
      console.log(nameValue, emailValue, mint, querySnapshot.empty);

      if (!querySnapshot.empty) {
        console.log("Email already used");
        alert("Email already in use");

        return; // Return early if the email is already used
      }

      const q2 = query(hashCollectionRef, where("mintId", "==", mint));
      const querySnapshot2 = await getDocs(q2);
      console.log(nameValue, emailValue, mint, querySnapshot2.empty);

      if (!querySnapshot2.empty) {
        const docId = querySnapshot2.docs[0].id;
        await setDoc(doc(hashCollectionRef, docId), {
          mintId: mint,
          hash: hash,
          visited: false,
          name: nameValue,
          email: emailValue,
        });
      } else {
        await addDoc(hashCollectionRef, {
          mintId: mint,
          hash: hash,
          visited: false,
          name: nameValue,
          email: emailValue,
        });
      }

      console.log("Ticket created successfully");
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
      }, 8000);
      QRCode.toDataURL(hash, (error, qrCodeData) => {
        if (error) {
          console.error("Error generating QR code:", error);
          return;
        }
        setGeneratedQRcode(qrCodeData);
      });
    } catch (error) {
      console.error("Error inserting document:", error);
    }
  };

  const handleFormSubmit = (metadata) => {
    validateEmail();
    handleQrGeneration(metadata);
  };

  return (
    <Container style={{ padding: "20px", backgroundColor: "#212121" }}>
      {generatedQRcode ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            margin: "3px 5px 30px",
          }}
        >
          <img
            src={generatedQRcode}
            alt="QR Code"
            style={{ height: "150px" }}
          />
          <h2 style={{ marginLeft: "30px" }}>
            Here's your generated QR code ticket. Save it and show it to at entry of the venue!
          </h2>
          {showConfetti && (
            <Confetti
              width={window.innerWidth}
              height={window.innerHeight}
              recycle={false}
            />
          )}
        </div>
      ) : (
        <div>
          <div>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
            {emailError && (
              <p style={{ margin: "0px 8px 8px", color: "white" }}>
                {emailError}
              </p>
            )}
          </div>
          <Row style={{ display: "flex", flexWrap: "wrap" }}>
            {nfts.length > 0 &&
              nfts.map((metadata, index) => (
                <Col
                  xs="12"
                  md="6"
                  lg="3"
                  key={index}
                  style={{ marginBottom: "30px" }}
                >
                  <Card
                    className="imageGrid"
                    style={{
                      width: "180px",
                      backgroundColor: "var(--primary)",
                      margin: "5px",
                      padding: "10px",
                      borderRadius: "10px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      boxShadow: "rgba(100, 100, 111, 0.6) 0px 7px 29px 0px",
                    }}
                  >
                    <Card.Img
                      variant="top"
                      src={metadata?.image}
                      alt={metadata?.name}
                      style={{
                        borderRadius: "10px",
                        width: "180px",
                      }}
                    />
                    <Card.Body
                      style={{
                        textAlign: "left",
                        display: "flex",
                        flexDirection: "row",
                        verticalAlign: "bottom",
                      }}
                    >
                      <Card.Title
                        style={{
                          color: "#fff",
                          fontSize: "14px",
                          margin: "8px 0px 8px 8px",
                          paddingRight: "3px",
                        }}
                      >
                        {metadata?.name}
                      </Card.Title>
                    </Card.Body>
                    <button
                      type="submit"
                      className="btn"
                      style={{ margin: "0 0 8px 5px", cursor: "pointer" }}
                      onClick={() => handleFormSubmit(metadata)}
                    >
                      Generate QR
                    </button>
                  </Card>
                </Col>
              ))}
          </Row>
        </div>
      )}
    </Container>
  );
}

export default GalleryView;
