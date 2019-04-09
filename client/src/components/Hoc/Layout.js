import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { connect } from "react-redux";
import { getSiteData } from "../../actions/site_actions";
import PropTypes from "prop-types";

class Layout extends React.Component {
  componentDidMount() {
    if (Object.keys(this.props.site).length === 0) {
      this.props.getSiteData();
    }
  }
  render() {
    return (
      <div>
        <Header />
        <div className="page_container">{this.props.children}</div>
        <Footer data={this.props.site} />
      </div>
    );
  }
}

Layout.propTypes = {
  site: PropTypes.object.isRequired,
  getSiteData: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    site: state.site
  };
};

export default connect(
  mapStateToProps,
  { getSiteData }
)(Layout);
