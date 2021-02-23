import React, { Component } from 'react';
import './CartItem.scss';

class CartItem extends Component {
  render() {
    const {
      price,
      quantity,
      id,
      onChecked,
      cartItem,
      name,
      imgSrc,
      onDecrement,
      onIncrement,
    } = this.props;
    const eachPrice = price / quantity;

    console.log('productPrice', eachPrice);

    return (
      <tr className="CartItem">
        <td className="checkbox">
          <input
            type="checkbox"
            id={id}
            onChange={onChecked}
            checked={cartItem.value}
          />
        </td>
        <td className="productInfoContainer">
          <div className="productInfo">
            <img alt={name} src={imgSrc} />
            <p className="productName">{name}</p>
          </div>
        </td>
        <td className="productQtyContainer">
          <div className="productQty">
            <i class="fas fa-minus" onClick={() => onDecrement(cartItem)} />
            <p>{quantity}</p>
            <i class="fas fa-plus" onClick={() => onIncrement(cartItem)} />
          </div>
        </td>
        <td className="productPrice">
          {(price * quantity).toLocaleString()}원
        </td>
      </tr>
    );
  }
}

export default CartItem;
