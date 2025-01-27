import React from "react";
import loginImage1 from "../../assets/loginPage1.png";
import loginImage2 from "../../assets/loginPage2.png";

import styles from "./Login.module.scss";

const Login: React.FC = () => {
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`;

  const loginHandler = () => {
    window.location.href = link;
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.background}>
        <img src={loginImage1} alt="Background" className={styles.backgroundImage} />
        <img src={loginImage2} alt="Background" className={styles.backgroundImage} />
      </div>
      <button type="button" onClick={loginHandler} className={styles.kakaoButton}>
        카카오톡으로 시작하기
      </button>
    </div>
  );
};

export default Login;