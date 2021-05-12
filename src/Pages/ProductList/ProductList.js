import React, { Component } from 'react';
import Product from './Components/Product';
import './ProductList.scss';

class ProductList extends Component {
  constructor() {
    super();
    this.state = {
      productList: [],
      sorting: 'total_sales',
      category: '',
      currentId: 1,
      selectedItem: 0,
    };
  }

  getData = sorting => {
    fetch(`http://10.58.2.240:8000/product?sorting=${sorting}`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          productList: res.data.products,
        });
      });
  };

  getProductList = () => {
    let addressUrl = this.props.history.location['search'];
    let urlIndex = addressUrl.indexOf('=') + 1;
    let resultUrl = addressUrl.slice(urlIndex);

    fetch(`http://10.58.2.240:8000/product?category=${resultUrl}`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          productList: res.data.products,
        });
      });
  };

  // 먼저 실행
  componentDidMount() {
    let addressUrl = this.props.history.location['search'];
    let urlIndex = addressUrl.indexOf('=') + 1;
    let resultUrl = addressUrl.slice(urlIndex);

    this.getProductList();

    this.setState({
      category: resultUrl,
    });
  }

  componentDidUpdate() {
    let addressUrl = this.props.history.location['search'];
    let urlIndex = addressUrl.indexOf('=') + 1;
    let resultUrl = addressUrl.slice(urlIndex);

    //if문이 사실이라면 컨디업 실행
    if (this.state.category !== resultUrl) {
      this.getProductList();
      this.setState({
        category: resultUrl,
      });
    }
  }

  handleColor = idx => {
    this.setState({ selectedItem: idx });
  };

  menuClick = e => {
    this.setState({ currentId: e });
    this.handleColor(e);
    this.getData(e);
  };

  render() {
    const { productList, selectedItem } = this.state;
    return (
      <div className="ProductList">
        <div className="pickListnum">
          <p>
            총 <span>{productList.length}</span>개
          </p>
          <div className="pickListBox">
            {CATEGORYMENU.map((category, idx) => {
              return (
                <p
                  key={idx}
                  onClick={() => this.menuClick(idx)}
                  className={idx === selectedItem ? 'selected' : 'unseleted'}
                >
                  {category}
                </p>
              );
            })}
          </div>
        </div>
        <section>
          <div className="productContainer">
            {productList.map(item => {
              return (
                <Product
                  key={item.id}
                  id={item.id}
                  price={item.price}
                  name={item.name}
                  imgSrc={item.imageUrl}
                  isBest={item.isBest}
                  isNew={item.isNew}
                  isSale={item.isSale}
                  sale={item.sale}
                  stock={item.stock}
                />
              );
            })}
          </div>
        </section>
      </div>
    );
  }
}

const CATEGORYMENU = ['추천순', '인기순', '최신순', '낮은가격순', '높은가격순'];

export default ProductList;
