import React, { Component } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import arrowUp from "../../images/icons/up-arrow.png";
import arrowDown from "../../images/icons/down-arrow.png";
import PropTypes from "prop-types";

export class CollapseRadio extends Component {
  state = {
    open: false,
    value: "0"
  };
  componentDidMount() {
    const { initState } = this.props;
    if (initState) {
      this.setState({
        open: initState
      });
    }
  }

  handleClick = () => {
    const { open } = this.state;

    this.setState({ open: !open });
  };

  handleAngle = () =>
    this.state.open ? (
      <img style={{ width: "20px", height: "20px" }} src={arrowUp} alt="" />
    ) : (
      <img style={{ width: "20px", height: "20px" }} src={arrowDown} alt="" />
    );

  renderList = () => {
    const { list } = this.props;
    return (
      list &&
      list.map(value => (
        <FormControlLabel
          key={value._id}
          value={`${value._id}`}
          control={<Radio />}
          label={value.name}
        />
      ))
    );
  };

  handleChange = event => {
    const { handleFilters } = this.props;

    handleFilters(event.target.value);
    this.setState({
      value: event.target.value
    });
  };

  render() {
    const { handleClick, handleAngle, handleChange, renderList } = this;
    const { title } = this.props;
    const { open, value } = this.state;
    return (
      <div>
        <List style={{ borderBottom: "1px solid #dbdbdb" }}>
          <ListItem
            onClick={handleClick}
            style={{ padding: "10px 23px 10px 0" }}
          >
            <ListItemText primary={title} className="collapse_title" />
            {handleAngle()}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <RadioGroup
                aria-label="prices"
                name="price"
                value={value}
                onChange={handleChange}
              >
                {renderList()}
              </RadioGroup>
            </List>
          </Collapse>
        </List>
      </div>
    );
  }
}

CollapseRadio.propTypes = {
  title: PropTypes.string.isRequired,
  initState: PropTypes.bool.isRequired,
  list: PropTypes.array.isRequired,
  handleFilters: PropTypes.func.isRequired
};

export default CollapseRadio;
