import React from "react";
import layout from "../../images/icons/layout.png";
import squares from "../../images/icons/squares.png";

class Sorting extends React.Component {
  state = {
    open: false,
    value: "0"
  };

  handleGrid = () => {
    const { handleGrid } = this.props;
    handleGrid();
  };

  renderList = () => {
    const { list } = this.props;
    const { value } = this.state;
    const { handleChange } = this;
    return (
      list &&
      list.map(val => {
        const { _id, name } = val;
        return (
          <option onClick={handleChange(value)} key={_id}>
            {name}
          </option>
        );
      })
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
    const { grid } = this.props;
    const { handleGrid } = this;
    return (
      <div>
        <div className="shop_options">
          <div className="shop_grids clear">
            <div
              className={`grid_btn ${grid ? "" : "active"}`}
              onClick={() => handleGrid()}
            >
              <img
                src={squares}
                style={{ width: "20px", height: "20px" }}
                alt=""
              />
            </div>
            <div
              className={`grid_btn ${!grid ? "" : "active"}`}
              onClick={() => handleGrid()}
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
