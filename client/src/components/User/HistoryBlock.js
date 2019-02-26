import React from "react";
import moment from "moment";
const HistoryBlock = props => {
  const renderHistory = () =>
    props.products
      ? props.products.map((product, i) => (
          <tr key={i}>
            <td>{moment(product.dateOfPurchase).format("MM-DD-YYYY")}</td>
            <td>{product.name}</td>
            <td>$ {product.price * product.quantity}</td>
            <td>{product.quantity}</td>
          </tr>
        ))
      : null;
  return (
    <div className="history_blocks">
      <table>
        <thead>
          <tr>
            <th>Date of Purchase</th>
            <th>Product name</th>
            <th>Price paid</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>{renderHistory()}</tbody>
      </table>
    </div>
  );
};

export default HistoryBlock;
