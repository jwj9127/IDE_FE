import React from "react";

const Login: React.FC = () => {

    const link = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`;

    const loginHandler = () => {
        window.location.href = link;
      };

      return (
        <button type='button' onClick={loginHandler}>
          카카오톡으로 시작하기
        </button>
      );
};

export default Login;