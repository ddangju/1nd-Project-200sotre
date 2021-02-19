import React, { Component } from 'react';
import Slider from './Components/Slider/Slider';
import ProductContainer from './Components/ProductContainer/ProductContainer';
import './Main.scss';

class Main extends Component {
  constructor() {
    super();
    this.state = {
      allList: [],
    };
  }

  componentDidMount() {
    fetch('data/mainData.json')
      .then(res => res.json())
      .then(res => {
        this.setState({
          allList: res,
          // bestList: res.bestData,
          // newList: res.newData,
          // saleList: res.saleData,
        });
      });
  }
  render() {
    console.log(this.state.bestList);
    return (
      <div className="Main">
        <Slider />
        <div className="mainContent">
          {this.state.allList.map((el, index) => {
            return <ProductContainer key={index} list={el} />;
          })}
        </div>
        {/* <article>
            <h2>잘나가요</h2>
            <div className="bestContainer">
              {bestList.map(item => {
                return (
                  <ProductBox
                    key={item.id}
                    name={item.name}
                    imgSrc={item.imgSrc}
                    price={item.price}
                    isBest={item.isBest}
                    isNew={item.isNew}
                    isSale={item.isSale}
                    sale={item.sale}
                  />
                );
              })}
            </div>
          </article>
          <article>
            <h2>새로 나왔어요</h2>
            <div className="newContainer">
              {newList.map(item => {
                return (
                  <ProductBox
                    key={item.id}
                    name={item.name}
                    imgSrc={item.imgSrc}
                    price={item.price}
                    isBest={item.isBest}
                    isNew={item.isNew}
                    isSale={item.isSale}
                    sale={item.sale}
                  />
                );
              })}
            </div>
          </article> */}
        <article>
          <h2>선물하기 딱 좋아요!</h2>
          <div className="giftContainer">
            <div className="firstGift">
              <img
                alt="gift1"
                src={`https://images.unsplash.com/photo-1516482432561-9f509937f28b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80`}
              />
              <div className="giftTextContainer">
                <h3>감사한 마음까지 담아</h3>
                <h4>쇼핑백. 뭘 이런걸 다 드립니다</h4>
              </div>
            </div>
            <div className="secondGift">
              <img
                alt="gift2"
                src={`https://images.unsplash.com/photo-1519682337058-a94d519337bc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80`}
              />
              <div className="giftTextContainer">
                <h3>잘 담으면 복이와요</h3>
                <h4>을지로에서 만든 쟁반</h4>
              </div>
            </div>
          </div>
        </article>
      </div>
    );
  }
}

export default Main;
