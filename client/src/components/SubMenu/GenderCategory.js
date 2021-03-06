// import React, { Component } from "react";
// import { connect } from "react-redux";
// import {
//   getProducts,
//   getDresses,
//   dressName
// } from "../../actions/products_actions";
// import { Link } from "react-router-dom";

// class GenderCategory extends Component {
//   componentDidMount() {
//     const category = this.props.match.params.category;
//     const filters = {
//       category: [category]
//     };
//     this.props.getProducts(0, 0, filters);
//     this.props.getDresses();
//   }

//   getArticles = (dress, category) => {
//     const filters = { dress: [dress], category: [category] };
//     this.props.getProducts(0, 0, filters);
//   };

//   render() {
//     const products = this.props.products;
//     const category = this.props.match.params.category;

//     let articles = products.articles;
//     let dresses = products.dresses;

//     let dressArr = [];
//     let articleArr = [];
//     let finalarray = [];
//     let dressNames = [];
//     let output;

//     dresses && dresses.forEach(item => dressArr.push(item._id));

//     articles && articles.forEach(item => articleArr.push(item.dress));

//     dressArr.forEach(e1 =>
//       articleArr.forEach(e2 => {
//         if (e1 === e2) {
//           finalarray.push(e1);
//         }
//       })
//     );

//     finalarray.forEach(item =>
//       dresses.forEach(e2 => {
//         if (e2._id === item) {
//           dressNames.push(e2);

//           output = [...new Set(dressNames)];
//         }
//       })
//     );

//     const categories =
//       output &&
//       output.map(item => (
//         <div
//           className="col-sm-10 col-md-8 col-lg-4"
//           style={{ display: "inline-block" }}
//         >
//           <div className="block1 hov-img-zoom pos-relative m-t-30 m-r-30">
//             <img
//               src={item.images && item.images[0].url}
//               alt={item.name}
//               style={{ width: "320px", height: "400px" }}
//             />

//             <div className="block1-wrapbtn w-size2">
//               <Link
//                 className="flex-c-m size2 m-text2 bg3 hov1 trans-0-4"
//                 to={{
//                   pathname: `/shop/dress/${item._id}`,
//                   state: { category: category }
//                 }}
//                 key={item._id}
//                 onClick={() => this.getArticles(item._id, category)}
//               >
//                 {item.name}
//               </Link>
//             </div>
//           </div>
//         </div>
//       ));

//     return (
//       <div className="container">
//         <div style={{ minHeight: "100vh" }}>
//           <div style={{ display: "block" }}>{categories} </div>
//         </div>
//       </div>
//     );
//   }
// }

// const mapStateToProps = state => {
//   return {
//     products: state.products
//   };
// };

// export default connect(
//   mapStateToProps,
//   { getProducts, getDresses, dressName }
// )(GenderCategory);

import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getProducts,
  getDresses,
  dressName
} from "../../actions/products_actions";
import { Link } from "react-router-dom";

class GenderCategory extends Component {
  componentDidMount() {
    const { match, getProducts, getDresses } = this.props;
    const category = match.params.category;
    const filters = {
      category: [category]
    };
    getProducts(0, 0, filters);
    getDresses();
  }

  getArticles = (dress, category) => {
    const { getProducts } = this.props;
    const filters = { dress: [dress], category: [category] };
    getProducts(0, 0, filters);
  };

  render() {
    const { products, match } = this.props;
    const { category } = match.params;
    const { articles, dresses } = products;

    let dressArr = [];
    let articleArr = [];
    let finalarray = [];
    let dressNames = [];
    let output;

    dresses && dresses.forEach(item => dressArr.push(item._id));

    articles && articles.forEach(item => articleArr.push(item.dress));

    dressArr.forEach(e1 =>
      articleArr.forEach(e2 => {
        if (e1 === e2) {
          finalarray.push(e1);
        }
      })
    );

    finalarray.forEach(item =>
      dresses.forEach(e2 => {
        if (e2._id === item) {
          dressNames.push(e2);

          output = [...new Set(dressNames)];
        }
      })
    );

    const categories =
      output &&
      output.map(item => {
        const { images, name, _id } = item;
        return (
          <div
            className="col-sm-10 col-md-8 col-lg-4"
            style={{ display: "inline-block" }}
          >
            <div className="block1 hov-img-zoom pos-relative m-t-30 m-r-30">
              <img
                src={images && images[0].url}
                alt={name}
                style={{ width: "320px", height: "400px" }}
              />

              <div className="block1-wrapbtn w-size2">
                <Link
                  className="flex-c-m size2 m-text2 bg3 hov1 trans-0-4"
                  to={{
                    pathname: `/shop/dress/${_id}`,
                    state: { category: category }
                  }}
                  key={_id}
                  onClick={() => this.getArticles(_id, category)}
                >
                  {name}
                </Link>
              </div>
            </div>
          </div>
        );
      });

    return (
      <div className="container">
        <div style={{ minHeight: "100vh" }}>
          <div style={{ display: "block" }}>{categories} </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  };
};

export default connect(
  mapStateToProps,
  { getProducts, getDresses, dressName }
)(GenderCategory);
