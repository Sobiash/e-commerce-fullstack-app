import React from "react";
// import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import layout from "../../images/icons/layout.png";
import squares from "../../images/icons/squares.png";

class Sorting extends React.Component {
  state = {
    open: false,
    value: "0"
  };

  handleGrid = () => {
    this.props.handleGrid();
  };

  renderList = () =>
    this.props.list &&
    this.props.list.map(value => (
      <option onClick={this.handleChange(this.state.value)} key={value._id}>
        {value.name}
      </option>
    ));

  handleChange = event => {
    this.props.handleFilters(event.target.value);
    this.setState({
      value: event.target.value
    });
  };

  render() {
    return (
      <div>
        <div className="shop_options">
          <div className="shop_grids clear">
            <div
              className={`grid_btn ${this.props.grid ? "" : "active"}`}
              onClick={() => this.handleGrid()}
            >
              <img
                src={squares}
                style={{ width: "20px", height: "20px" }}
                alt=""
              />
            </div>
            <div
              className={`grid_btn ${!this.props.grid ? "" : "active"}`}
              onClick={() => this.handleGrid()}
            >
              <img
                src={layout}
                style={{ width: "20px", height: "20px" }}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Sorting;
