import React, { Component } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Collapse from "@material-ui/core/Collapse";
import arrowUp from "../../images/icons/up-arrow.png";
import arrowDown from "../../images/icons/down-arrow.png";
import PropTypes from "prop-types";

class CollapseList extends Component {
  state = {
    open: false,
    checked: this.props.check ? [this.props.check] : []
  };
  componentDidMount() {
    if (this.props.initState) {
      this.setState({
        open: this.props.initState
      });
    }
  }

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  renderList = () =>
    this.props.list &&
    this.props.list.map(product => (
      <ListItem key={product._id} style={{ padding: "0px 0px" }}>
        <ListItemText primary={product.name} style={{ fontSize: "5px" }} />
        <ListItemSecondaryAction>
          <Checkbox
            style={{ fontSize: "5px" }}
            color="primary"
            onChange={this.handleToggle(product._id)}
            checked={this.state.checked.indexOf(product._id) !== -1}
          />
        </ListItemSecondaryAction>
      </ListItem>
    ));

  handleToggle = value => () => {
    const checked = this.state.checked;

    const currentIndex = checked.indexOf(value);
    let newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState(
      {
        checked: newChecked
      },
      () => {
        this.props.handleFilters(newChecked);
      }
    );
  };
  handleAngle = () =>
    this.state.open ? (
      <img style={{ width: "20px", height: "20px" }} src={arrowUp} alt="" />
    ) : (
      <img style={{ width: "20px", height: "20px" }} src={arrowDown} alt="" />
    );
  render() {
    return (
      <div className="collapse_items_wrapper">
        <List style={{ borderBottom: "1px solid #dbdbdb" }}>
          <ListItem
            onClick={this.handleClick}
            style={{ padding: "5px 23px 10px 0" }}
          >
            <ListItemText
              primary={this.props.title}
              className="collapse_title"
            />
            {this.handleAngle()}
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {this.renderList()}
            </List>
          </Collapse>
        </List>
      </div>
    );
  }
}

CollapseList.propTypes = {
  title: PropTypes.string.isRequired,
  initState: PropTypes.bool.isRequired,
  list: PropTypes.array,
  handleFilters: PropTypes.func.isRequired
};

export default CollapseList;
