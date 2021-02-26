import React, { Component } from 'react';
import { LoginApi } from '../../config';
import { withRouter } from 'react-router-dom';
import './Login.scss';

class Login extends Component {
  constructor() {
    super();
    this.state = { id: '', pw: '' };
  }

  goToMain = () => {
    this.props.history.push('/');
  };

  handleInput = e => {
    const { value, name } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = e => {
    const { id, pw } = this.state;
    if (id.length >= 5 && pw.length >= 8) {
      fetch('http://10.58.5.199:8000/user/login', {
        method: 'POST',
        body: JSON.stringify({
          account: this.state.id,
          password: this.state.pw,
        }),
      })
        .then(res => res.json())
        .then(res => this.loginCheck(res));
    }
  };

  handleKeyPress = e => {
    const { pw, id } = this.state;
    if (e.key === 'Enter') {
      if (id.length >= 5 && pw.length >= 8) {
        fetch('http://10.58.5.199:8000/user/login', {
          method: 'POST',
          body: JSON.stringify({
            account: this.state.id,
            password: this.state.pw,
          }),
        })
          .then(res => res.json())
          .then(res => this.loginCheck(res));
      }
    }
  };

  loginCheck = res => {
    if (res.message === 'SUCCESS') {
      localStorage.setItem('accessToken', res.accessToken);
      this.goToMain();
    } else {
      alert('로그인에 실패했습니다!');
    }
  };

  render() {
    return (
      <div className="loginContainer">
        <div className="contentBox">
          <div className="memberCont">
            <div className="loginBox">
              <h3 className="join">회원 로그인</h3>
              <div className="loginInputSec" onKeyUp={this.handleKeyPress}>
                <input
                  className="loginId"
                  placeholder="아이디"
                  type="text"
                  name="id"
                  onChange={this.handleInput}
                />
                <input
                  className="loginPw"
                  placeholder="비밀번호"
                  type="password"
                  name="pw"
                  onChange={this.handleInput}
                  onKeyPress={this.handleKeyPress}
                />
              </div>
              <div className="idChk">
                <input type="checkBox" className="saveid" />
                <lavel for="saveId">아이디저장</lavel>
              </div>
              <button type="submit" onClick={this.handleClick}>
                로그인
              </button>
            </div>
            <div className="snslogin"> 페이스북으로 로그인</div>
            <div className="btnLoginBox">
              <button className="btnJoin">회원가입</button>
              <button className="btnId">아이디 찾기</button>
              <button className="btnPw">비밀번호 찾기</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
