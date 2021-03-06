import React from 'react';
import Reviews from './Components/review';
import AdminMsg from './Components/admin_msg';
import Itemgoodstab from './Components/Itemgoodstab';
import ProductdetailTable from './Components/productdetailtable';
import ItemPhotoInfoSec from './Components/itemphotoinfosec';
import './ProductDetail.scss';

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
      isModalView: false,
      productDetail: {},
      productImage: [],
      productReview: [],
    };
  }

  handleModal = () => {
    this.setState({ isModalView: !this.state.isModalView });
  };

  componentDidMount() {
    // fetch('http://10.58.2.240:8000/product/7', { method: 'GET' })
    // fetch('/data/productdetaildata.json')
    fetch(`http://10.58.2.240:8000/product/${this.props.match.params.id}`)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.setState({
          productDetail: res.data.product,
          productImage: res.data.product.imageUrls,
          productReview: res.data.product.reviews,
        });
      });
    window.scrollTo(0, 0);
  }

  countUp = () => {
    const { count } = this.state;
    this.setState({
      count: count + 1,
    });
  };

  countDown = () => {
    const { count } = this.state;
    this.setState({
      count: count === 0 ? count : count - 1,
    });
  };

  countZero = () => {
    this.setState({
      count: 0,
    });
  };

  goToHeart = () => {
    fetch('http://10.58.0.63:8000/product/product_like', {
      method: 'POST',
      headers: {
        Authorization: localStorage.getItem('accessToken'),
      },
      body: JSON.stringify({
        productId: this.state.productDetail[0].id,
      }),
    })
      .then(response => response.json())
      .then(result => {
        result.message === 'SUCCESS'
          ? this.props.history.push('/mypage')
          : this.props.history.push('/login');
      });
  };

  goToCart = () => {
    fetch('http://10.58.2.240:8000/order/cart', {
      method: 'POST',
      headers: {
        Authorization: localStorage.getItem('accessToken'),
      },
      body: JSON.stringify({
        productId: this.state.productDetail.id,
        totalPrice:
          this.state.count *
          Math.round(
            (this.state.productDetail.price *
              (1 - this.state.productDetail.sale)) /
              100
          ) *
          100,
        quantity: this.state.count,
      }),
    })
      .then(response => response.json())
      .then(result =>
        result.message === 'SUCCESS'
          ? this.props.history.push('/cart')
          : this.props.history.push('/login')
      );
  };

  goToPayment = () => {
    fetch('http://10.58.2.5:8000/order/buyitnow', {
      method: 'POST',
      headers: {
        Authorization: localStorage.getItem('accessToken'),
      },
      body: JSON.stringify({
        productId: this.state.productDetail.id,
        totalPrice:
          this.state.count *
          Math.round(
            (this.state.productDetail.price *
              (1 - this.state.productDetail.sale)) /
              100
          ) *
          100,
        quantity: this.state.count,
      }),
    })
      .then(response => response.json())
      .then(result =>
        result.message === 'SUCCESS'
          ? this.props.history.push('/payment')
          : this.props.history.push('/login')
      );
  };

  render() {
    return (
      <div className="productDetail">
        <div className="contents">
          <ItemPhotoInfoSec
            detail={this.state.productDetail}
            countUp={this.countUp}
            countDown={this.countDown}
            countZero={this.countZero}
            goToCart={this.goToCart}
            goToPayment={this.goToPayment}
            count={this.state.count}
            goToHeart={this.goToHeart}
          />
          <div className="detail">
            <Itemgoodstab />
            <div className="detailCont" id="detailInfo">
              <h3 className="mustInfo">??????????????????</h3>
              <div className="detailExplainBox ">
                {this.state.productImage.map(image => {
                  return (
                    <div className="detailPhotoBox" id={image.id}>
                      <img src={image} alt="??????" />
                    </div>
                  );
                })}
                <div className="detailInfo">
                  <h3 className="mustInfo">??????????????????</h3>
                  <ProductdetailTable />
                </div>

                <Itemgoodstab />
                <h3 className="info" id="delivery">
                  ????????????
                </h3>
                <div className="adminMsg">
                  <p>?????????:cj????????????</p>
                  <p>?????????: 2,500???(3?????? ?????? ?????? ??? ????????????)</p>
                  <p>??????, ?????? ??????????????? ???????????? ????????? ??? ????????????.</p>
                  <p>
                    ????????????: ?????? 2??? ?????? ??????????????? ?????? ?????? (????????? ??????)
                  </p>
                  <p>
                    ???, ????????? ?????? ??????, ?????????, ?????? ????????? ?????? ????????????
                    ????????? ????????? ??? ?????? ??? ?????? ??????????????????.
                  </p>
                </div>
                <Itemgoodstab />
                <AdminMsg />
                <Itemgoodstab />
                <div className="productReview">
                  <div className="reviewBox">
                    <h3 id="review" className="review">
                      ????????????&nbsp;
                      <span className="reviewCount">
                        {this.state.productReview.length}
                      </span>
                    </h3>
                  </div>

                  <Reviews reviewList={this.state.productReview} />
                  <div className="page">
                    <ul>
                      <li className="on">
                        <span>1</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductDetail;
