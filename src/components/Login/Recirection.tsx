import axios from "axios";
import React, { useEffect, useState } from "react";

const Recirection: React.FC = () => {
  const code = new URL(document.location.toString()).searchParams.get("code");
  const [accessToken, setAccessToken] = useState<any>();

  useEffect(() => {
    axios({
      method: "post",
      url: `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&cliende=${code}`,
    }).then((result) => {
      setAccessToken(result.data.access_token);
    });

    axios({
      method: "get",
      url: " https://kapi.kakao.com/v2/user/me",
      headers: {
        Authorization: `Bearer${accessToken}`,
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    }).then((result) => {
      console.log(result);
    });

    axios({
      method: "post",
      url: "/api/login/kakao",
      data: "",
    });
  }, [code]);

  return <></>;
};

export default Recirection;
