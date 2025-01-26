import React, { useState, useEffect } from "react";
import axios from "axios";
import { Carousel, Card, Button, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import slider1 from "../../icons/world-map.jpg";
import slider2 from "../../icons/flags.jpg";
import slider4 from "../../icons/image-2.jpg";
import Logo from "../../icons/icons.JPG";

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [visible, setVisible] = useState(10);
  const [filter, setFilter] = useState("All");


  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          "https://restcountries.com/v2/all?fields=name,region,flag"
        );
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    };
    fetchCountries();
  }, []);


  const loadMore = () => {
    setVisible((prev) => prev + 10);
  };

  const filteredCountries = countries.filter((country) => {
    if (filter === "All") return true;
    return country.region === filter;
  });

  return (
    <div>
      {/* Header */}
      <header className="text-center py-4">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "1rem 7rem",
          }}
        >
          <p style={{ fontSize: "24px", fontWeight: "bold", margin: 0 }}>
            Countries
          </p>
          {/* Navigation Bar */}
          <nav>
            <ul
              style={{
                display: "flex",
                listStyle: "none",
                gap: "1rem",
                margin: 0,
                padding: 0,
                cursor: "pointer",
              }}
            >
              <li
                style={{
                  fontWeight: filter === "All" ? "bold" : "normal",
                }}
                onClick={() => setFilter("All")}
              >
                All
              </li>
              <li
                style={{
                  fontWeight: filter === "Asia" ? "bold" : "normal",
                }}
                onClick={() => setFilter("Asia")}
              >
                Asia
              </li>
              <li
                style={{
                  fontWeight: filter === "Europe" ? "bold" : "normal",
                }}
                onClick={() => setFilter("Europe")}
              >
                Europe
              </li>
            </ul>
          </nav>
        </div>
        <div style={{ margin: "0 7rem", display: "flex" }}>
          <div
            style={{
              borderTop: "2px solid black",
              width: "45%",
              marginRight: "1rem",
            }}
          ></div>
          <h1>WELCOME</h1>
          <div
            style={{
              borderBottom: "2px solid black",
              width: "45%",
              marginLeft: "1rem",
            }}
          ></div>
        </div>

        <hr />
      </header>

      {/* Slider */}
      <Container>
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={slider1}
              alt="Slide 1"
              style={{ height: "400px" }}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={slider2}
              alt="Slide 2"
              style={{ height: "400px" }}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={slider4}
              alt="Slide 2"
              style={{ height: "400px" }}
            />
          </Carousel.Item>
        </Carousel>
      </Container>

      {/* Country List */}
      <Container className="mt-4">
        <Row>
          {filteredCountries.slice(0, visible).map(
            (country, index) => (
              console.log(country),
              (
                <Col xs={12} sm={6} md={4} lg={6} key={index} className="mb-4">
                  <Card>
                    <Card.Body
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <Card.Img
                        variant="top"
                        src={country.flag}
                        alt={`${country.name} flag`}
                        style={{
                          height: "100px",
                          width: "200px",
                          margin: "0 1rem",
                        }}
                      />
                      <Card.Title>
                        {country.name}
                        <br />
                        <span style={{ fontSize: "14px" }}>
                          {country.region}
                        </span>
                      </Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              )
            )
          )}
        </Row>
        {visible < countries.length && (
          <div className="text-center mt-3">
            <Button onClick={loadMore}>Load More</Button>
          </div>
        )}
      </Container>

      {/* Footer */}
      <footer className="text-center mt-4">
        <div className="text-center mt-3">
          <img src={Logo} alt="Logo" style={{ cursor: "pointer" }} />
        </div>
        <p>Example@email.com</p>
        <p>Copyright &copy; 2020 Name. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
