import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { ListGroup, ListGroupItem, Col, Row, Button } from "reactstrap";
import { Link } from "react-router-dom";
import Payment from "./Payment";
import { calculateTotal } from "../utils/helper";

const MiniSummary = ({ cart, email, onTransactionSuccess, empty }) => {
  const CardPreview = (
    <ListGroup>
      {!empty ? (
        <Fragment>
          <ListGroupItem style={{ listStyle: "none" }}>
            {cart &&
              cart.map(item => (
                <Row key={item._id}>
                  <Col xs="9">
                    <p style={{ fontSize: "13px" }}>
                      x{item.quantity} {item.title} {item.price}$ size:{" "}
                      {item.selectedSize} color: {item.selectedColor}
                    </p>
                  </Col>
                  <Col xs="3">
                    <img
                      style={{ width: "50px" }}
                      src={item.images[0].url}
                      alt=""
                    />
                  </Col>
                </Row>
              ))}
          </ListGroupItem>
          <ListGroupItem style={{ listStyle: "none" }}>
            <Link to="/user/cart">
              <Button className="link_default" style={{ marginTop: "10px" }}>
                Edit Cart
              </Button>
            </Link>
          </ListGroupItem>
          <ListGroupItem style={{ listStyle: "none" }}>
            <Payment
              amount={calculateTotal(cart)}
              email={email}
              cart={cart[0].images[0].url}
              onSuccess={data => onTransactionSuccess(data)}
            >
              <Button
                className="link_default"
                style={{ margin: "10px 0px 20px 20px" }}
              >
                Checkout
              </Button>
            </Payment>
          </ListGroupItem>
        </Fragment>
      ) : (
        <ListGroupItem style={{ listStyle: "none" }}>
          Your shopping cart is empty
        </ListGroupItem>
      )}
    </ListGroup>
  );
  return CardPreview;
};

MiniSummary.propTypes = {
  cart: PropTypes.array.isRequired,
  empty: PropTypes.bool.isRequired
};

export default MiniSummary;
