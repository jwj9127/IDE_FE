import axios from "axios";
import React, { useState } from "react";
import { KakaoUserInfoRequestDto } from "./KakaoUserInfoRequestDto";

const Recirection: React.FC = () => {
  const code = new URL(document.location.toString()).searchParams.get("code");
  const [accessToken, setAccessToken] = useState<any>();
  const [id, setId] = useState<any>();
  const [name, setName] = useState<any>();
  const [email, setEmail] = useState<any>();

  axios({
    method: "post",
    url: "https://kauth.kakao.com/oauth/token",
    data: {
      grant_type: "authorization_code",
      client_id: "e219a9b5f8b7dd45ffd5e20765d715de",
      redirect_uri: `${process.env.REACT_APP_REDIRECT_URI}`,
      code: `${code}`,
      client_secret: "vMIh6B4uKHJhQkGiCLQgBLfjJZ7jcJVw",
    },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  }).then((result) => {
    setAccessToken(result.data.access_token);
  });

  axios({
    method: "get",
    url: " https://kapi.kakao.com/v2/user/me",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  }).then((result) => {
    setId(result.data.id);
    setName(result.data.properties.nickname);
    setEmail(result.data.kakao_account.email);
  });

  const kakaoUserInfo: KakaoUserInfoRequestDto = {
    id,
    name,
    email,
  };

  axios({
    method: "post",
    url: "/api/login/kakao",
    data: kakaoUserInfo,
  }).then((result) => {
    if (result.data.code === 201) {
      localStorage.setItem("token", result.data.data.jwtToken);
    }
  });

  return <></>;
};

export default Recirection;
