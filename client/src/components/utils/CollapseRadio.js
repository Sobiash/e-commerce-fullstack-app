import React, { Component } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

export class CollapseRadio extends Component {
  state = {
    open: false,
    value: "0"
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

  // handleAngle = () =>
  //   this.state.open ? (
  //     <FontAwesomeIcon icon="angle-up" className="icon" />
  //   ) : (
  //     <FontAwesomeIcon icon="angle-down" className="icon" />
  //   );

  renderList = () =>
    this.props.list &&
    this.props.list.map(value => (
      <FormControlLabel
        key={value._id}
        value={`${value._id}`}
        control={<Radio />}
        label={value.name}
      />
    ));

  handleChange = event => {
    this.props.handleFilters(event.target.value);
    this.setState({
      value: event.target.value
    });
    // console.log(this.state.value);
  };

  render() {
    return (
      <div>
        <List style={{ borderBottom: "1px solid #dbdbdb" }}>
          <ListItem
            onClick={this.handleClick}
            style={{ padding: "10px 23px 10px 0" }}
          >
            <ListItemText
              primary={this.props.title}
              className="collapse_title"
            />
            {/* {this.handleAngle()} */}
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <RadioGroup
                aria-label="prices"
                name="price"
                value={this.state.value}
                onChange={this.handleChange}
              >
                {this.renderList()}
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
