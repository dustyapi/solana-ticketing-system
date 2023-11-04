import { Badge, Card, Col, Container, Row } from "react-bootstrap";

function Collections({ groupedNfts, setNfts, setView }) {
  return (
    <Container
      style={{ padding: "50px 0px 50px 0px", backgroundColor: "#212121" }}
    >
      <Row style={{ display: "flex", flexDirection: "row" }}>
        {Object.keys(groupedNfts).map((metadata, index) => (
          <Col xs="12" md="6" lg="3" key={index} style={{ margin: "20px" }}>
            <Card
              onClick={() => {
                setNfts(groupedNfts[metadata]);
                setView("nft-grid");
              }}
              className="imageGrid"
              lg="3"
              style={{
                width: "180px",
                margin: "30px 0px 30px 0px",
                backgroundColor: "var(--primary)",
                padding: "10px",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between", // Add vertical spacing between the image and the title/badge
                alignItems: "flex-start", // Align content to the left
                boxShadow: "rgba(100, 100, 111, 0.6) 0px 7px 29px 0px",
              }}
            >
                <Card.Img
                  src={groupedNfts[metadata][0]?.image}
                  alt={groupedNfts[metadata][0]?.name}
                  style={{
                    borderRadius: "10px",
                    width: "180px",
                    height: "180px", // Adjust the height to maintain the aspect ratio of the image
                  }}
                />
                <Card.Body
                  style={{
                    textAlign: "left",
                    marginLeft: "3px",
                    display: "flex",
                    flexDirection: "row",
                    verticalAlign: "bottom",
                  }}
                >
                  <Card.Title
                    style={{
                      color: "#fff",
                      fontSize: "14px",
                      marginBottom: "5px",
                      paddingRight: "3px",
                    }}
                  >
                    {metadata.length > 0 ? metadata : "Unknown"}
                  </Card.Title>
                  <Badge pill  text="light">
                    <h6
                      style={{
                        fontSize: "12px",
                        paddingLeft: "2px",
                        paddingTop: "1px",
                      }}
                    >
                      [{groupedNfts[metadata].length}]
                    </h6>
                  </Badge>
                </Card.Body>
            </Card>
          </Col>  
        ))}
      </Row>
    </Container>
  );
}
export default Collections;