import React from "react";
import UserLayout from "../Hoc/UserLayout";
import PropTypes from "prop-types";

const HistoryBlock = props => {
  const renderHistory = () =>
    props.products &&
    props.products.map((product, i) => (
      <tr key={i}>
        <td>{product.purchaseOrder}</td>
        <td>{product.name}</td>
        <td>$ {product.price * product.quantity}</td>
        <td>{product.quantity}</td>
      </tr>
    ));
  return props.products && props.products.length > 0 ? (
    <UserLayout>
      <div className="user_nfo_panel">
        <div className="user_product_block_wrapper">
          <h3>History Purchases</h3>
          <div className="history_blocks">
            <table>
              <thead>
                <tr>
                  <th>Order Number</th>
                  <th>Product name</th>
                  <th>Price paid</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>{renderHistory()}</tbody>
            </table>
          </div>
        </div>
      </div>
    </UserLayout>
  ) : (
    <UserLayout>
      <div className="user_nfo_panel">
        <div className="user_product_block_wrapper">
          <h3>History Purchases</h3>
          You have no history of purchases.
        </div>
      </div>
    </UserLayout>
  );
};

HistoryBlock.propTypes = {
  products: PropTypes.array.isRequired
};

export default HistoryBlock;
