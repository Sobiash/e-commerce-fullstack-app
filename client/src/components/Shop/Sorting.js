import React from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";

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
    this.props.list.map(
      value => (
        <option onClick={this.handleChange(this.state.value)} key={value._id}>
          {value.name}
        </option>
      )

      // <FormControlLabel
      //   key={value._id}
      //   value={`${value._id}`}
      //   control={<Radio />}
      //   label={value.name}
      // />
    );

  handleChange = event => {
    this.props.handleFilters(event.target.value);
    this.setState({
      value: event.target.value
    });
    console.log(this.state.value);
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
              <FontAwesomeIcon icon="th" className="icon" />
            </div>
            <div
              className={`grid_btn ${!this.props.grid ? "" : "active"}`}
              onClick={() => this.handleGrid()}
            >
              <FontAwesomeIcon icon="th-large" className="icon" />
            </div>
          </div>
        </div>

        {/* <div className="flex-sb-m flex-w p-b-35">
          <div className="flex-w">
            <div className="rs2-select2 bo4 of-hidden w-size12 m-t-5 m-b-5 m-r-10">
              <select className="selection-2" name="sorting">
                <option>Default Sorting</option>
                <option>Popularity</option>
                <option>Price: low to high</option>
                <option>Price: high to low</option>
              </select>
            </div>

            <div className="rs2-select2 bo4 of-hidden w-size12 m-t-5 m-b-5 m-r-10">
              <select className="selection-2" name="sorting">
                {this.renderList()}
                <option>$0.00 - $50.00</option>
              <option>$50.00 - $100.00</option>
              <option>$100.00 - $150.00</option>
              <option>$150.00 - $200.00</option>
              <option>$200.00+</option>
              </select>
            </div>
          </div>

          <span className="s-text8 p-t-5 p-b-5">
            Showing 1–12 of 16 results
          </span>
        </div> */}
      </div>
    );
  }
}

export default Sorting;
