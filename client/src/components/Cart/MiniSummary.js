import PropTypes from "prop-types";
import React, { Fragment } from "react";
import {
  Typography,
  Button,
  Popover,
  makeStyles,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Avatar,
  IconButton
} from "@material-ui/core";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import cancel from "../../images/icons/cancel.png";
import { Link } from "react-router-dom";
import Payment from "./Payment";
import { calculateTotal } from "../utils/helper";

const useStyles = makeStyles(theme => ({
  typography: {
    margin: theme.spacing(2)
  },
  demo: {
    backgroundColor: theme.palette.background.paper
  },
  title: {
    margin: theme.spacing(4, 0, 2)
  }
}));

const MiniSummary = ({
  cart,
  cartLength,
  item,
  email,
  onTransactionSuccess,
  empty,
  removeItem
}) => {
  const classes = useStyles();
  const CardPreview = (
    <Grid item xs={12}>
      <div className={classes.demo}>
        <List dense={dense}>
          {!empty ? (
            <Fragment>
              {cart &&
                cart.map(item => (
                  <ListItem key={item._id}>
                    <ListItemAvatar>
                      <Avatar>
                        <img
                          style={{ width: "50px" }}
                          src={item.product.images[0].url}
                          alt=""
                        />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={`x${item.quantity} ${item.product.name} ${
                        item.product.price
                      }$ size:
                      ${item.selectedSize} color: ${item.selectedColor}`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => removeItem(item._id)}
                      >
                        <img
                          style={{ width: "10px" }}
                          src={cancel}
                          alt="cancel"
                        />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              <ListItem>
                <Link to="/user/cart">
                  <Button>Edit Cart</Button>
                </Link>
                <Payment
                  amount={calculateTotal(cart)}
                  email={email}
                  cart={cart[0].product.images[0].url}
                  onSuccess={data => onTransactionSuccess(data)}
                >
                  <Button>Checkout</Button>
                </Payment>
              </ListItem>
            </Fragment>
          ) : (
            <Typography>Your shopping cart is empty</Typography>
          )}
        </List>
      </div>
    </Grid>
  );
  const [dense] = React.useState(false);

  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {popupState => (
        <div>
          <Button variant="contained" {...bindTrigger(popupState)}>
            <span className="cart_link_span">{cart && cartLength}</span>
            <img src={item.icon} alt="MY_CART" style={{ cursor: "pointer" }} />
          </Button>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center"
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center"
            }}
          >
            <Typography className={classes.typography}>
              {CardPreview}
            </Typography>
          </Popover>
        </div>
      )}
    </PopupState>
  );
};

MiniSummary.propTypes = {
  cart: PropTypes.array.isRequired,
  empty: PropTypes.bool.isRequired
};

export default MiniSummary;
