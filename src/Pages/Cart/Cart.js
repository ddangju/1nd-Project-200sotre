import React, { Component } from 'react';
import CartItem from './Components/CartItem/CartItem';
import './Cart.scss';

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      selectAll: false,
      cartList: [],
      checkList: [],
      itemDeliveryFee: 0,
      selected: true,
    };
  }
  componentDidMount() {
    fetch('192.168.0.46:8000/order/cart')
      .then(res => res.json())
      .then(res => {
        console.log(res.result);
        this.setState({
          cartList: res.result,
        });
      });

    // this.setState({
    //   cartList: this.state.cartList.map(item => (item['value'] = true)),
    // });
  }

  handleIncrement = item => {
    console.log('올라가닝...');
    const cartList = [...this.state.cartList];
    const index = cartList.indexOf(item);
    cartList[index].quantity++;
    this.setState({ cartList: cartList });
  };

  handleDecrement = item => {
    console.log('좀 내려가봐...');
    const cartList = [...this.state.cartList];
    const index = cartList.indexOf(item);
    const quantity = cartList[index].quantity - 1;
    cartList[index].quantity = quantity < 0 ? 0 : quantity;
    this.setState({ cartList: cartList });
  };

  handleChange = e => {
    const id = e.target.id;
    this.setState(prevState => {
      return {
        cartList: prevState.cartList.map(item =>
          item.id === +id ? { ...item, value: !item.value } : item
        ),
      };
    });
  };

  handleDelete = () => {
    this.setState(prevState => {
      return {
        cartList: prevState.cartList.filter(item => !item.value),
      };
    });
  };

  handleAllCheck = () => {
    this.state.cartList.reduce(
      (result, item) => (result = result && item.value),
      true
    )
      ? this.state.cartList.map(item => {
          item.value = false;
          return this.setState({ selectAll: false });
        })
      : this.state.cartList.map(item => {
          item.value = true;
          return this.setState({ selectAll: true });
        });
    this.setState({ cartList: this.state.cartList });
  };

  sendCheckedList = () => {
    this.setState({
      checkList: this.state.cartList.filter(item => item.value),
    });
  };

  // selectedToPayment = () => {
  //   this.state.checkList
  // }
  // selectedToPayment = () => {
  //   this.state.cartList.forEach(item => {
  //     item.value &&
  //       fetch(``, {
  //         method: 'POST',
  //         headers: {
  //           Authorization: localStorage.getItem('token'),
  //         },
  //         body: JSON.stringify({
  //           cart_item_id: item.id,
  //           select: 'True',
  //         }),
  //       })
  //         .then(res => res.json())
  //         .then(result => console.log(result));
  //   });
  // };

  // allToPayment = () => {
  //   this.state.cartList.forEach(item => {
  //     item.value &&
  //       fetch(``, {
  //         method: 'POST',
  //         headers: {
  //           Authorization: localStorage.getItem('token'),
  //         },
  //         body: JSON.stringify({
  //           cart_item_id: item.id,
  //           select: 'True',
  //         }),
  //       })
  //         .then(res => res.json())
  //         .then(result => console.log(result));
  //   });
  // };

  render() {
    const selectedItems = this.state.cartList.filter(item => item.value);
    const sumPrice = Math.floor(
      selectedItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    );
    const deliveryFee = sumPrice < 30000 ? 2500 : 0;
    const totalPrice = sumPrice + deliveryFee;
    console.log('선택된 상품입니다 >>>>>>', selectedItems);
    console.log('체크리스트 업뎃 >>>>>>>>>', this.state.checkList);
    console.log('선택된 상품만 결제로 보내기>>>>', this.state.cartList);
    return (
      <div className="Cart">
        <div className="cartTitleContainer">
          <h1>장바구니</h1>
          <ul>
            <li>01 장바구니</li>
            <i id="currentSection" class="fas fa-chevron-right" />
            <li>02 주문서작성/결제</li>
            <i class="fas fa-chevron-right" />
            <li>03 주문완료</li>
          </ul>
        </div>
        <form>
          <table>
            <thead>
              <tr className="headRow">
                <th>
                  <input
                    type="checkbox"
                    name="checkAll"
                    checked={this.state.selectAll}
                    onClick={this.handleAllCheck}
                  />
                </th>
                <th className="productInfo">상품/옵션 정보</th>
                <th className="productQty">수량</th>
                <th className="productPrice">상품금액</th>
                {/* <th className="deliveryFee">배송비</th> */}
              </tr>
            </thead>
            <tbody className="cartItemContainer">
              {this.state.cartList.map((item, idx) => {
                return (
                  <CartItem
                    cartItem={item}
                    key={idx}
                    id={idx}
                    imgSrc={item.url_image}
                    name={item.product}
                    quantity={item.quantity}
                    price={item.total_price}
                    onIncrement={this.handleIncrement}
                    onDecrement={this.handleDecrement}
                    onChecked={this.handleChange}
                    itemDeliveryFee={this.state.itemDeliveryFee}
                  />
                );
              })}
            </tbody>
          </table>
        </form>
        <p className="continueShop">
          <i class="fas fa-chevron-left" />
          쇼핑 계속하기
        </p>
        <section>
          <div className="productPrice">
            <p>
              총<strong>{selectedItems.length}</strong>개의 상품금액
            </p>
            <p>
              <strong>{sumPrice.toLocaleString()}</strong>원
            </p>
          </div>
          <i class="fas fa-plus-circle" />
          <div className="deliveryFee">
            <p>배송비</p>
            <p>
              <strong>{deliveryFee.toLocaleString()}</strong>원
            </p>
          </div>
          <i class="fas fa-equals" />
          <div className="totalPrice">
            <p>합계</p>
            <p>
              <strong className="totalColor">
                {totalPrice.toLocaleString()}
              </strong>
              원
            </p>
          </div>
        </section>
        <div className="buttonContainer">
          <div className="leftButtonContainer">
            <button className="selectItemDelete" onClick={this.handleDelete}>
              선택 상품 삭제
            </button>
            {/* <button className="selectItemWish">선택 상품 찜</button> */}
          </div>
          <div className="rightButtonContainer">
            <button className="selectItemOrder" onClick={this.sendCheckedList}>
              선택 상품 주문
            </button>
            <button className="allItemOrder">전체 상품 주문</button>
          </div>
        </div>
        <span>주문서 작성단계에서 할인/적립금 적용을 하실 수 있습니다.</span>
      </div>
    );
  }
}

export default Cart;
