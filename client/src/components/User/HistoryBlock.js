import React from "react";

const HistoryBlock = props => {
  const renderHistory = () =>
    props.products
      ? props.products.map((product, i) => (
          <tr key={i}>
            <td>{product.purchaseOrder}</td>
            <td>{product.name}</td>
            <td>$ {product.price * product.quantity}</td>
            <td>{product.quantity}</td>
          </tr>
        ))
      : null;
  return props.products && props.products.length > 0 ? (
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
  ) : (
    "You have no history of purchases."
  );
};

export default HistoryBlock;
