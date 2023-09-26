'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

function Test() {
  const [data, setData] = useState<any>(null);
  const google = <div>구글!</div>;
  const oAuthURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=646052007768-c5lnjr97av6td0nnb4l60580h3f7cft2.apps.googleusercontent.com&response_type=token&redirect_uri=http://localhost:3000/auth/google&scope=openid`;
  const oAuthHandler = () => {
    window.location.assign(oAuthURL);
  };

  const getCall = async () => {
    const url = new URL(window.location.href);
    const hash = url.hash;

    if (hash) {
      const accessToken = hash.split('=')[1].split('&')[0];
      await axios
        .get('https://www.googleapis.com/oauth2/v2/userinfo?access_token=' + accessToken, {
          headers: {
            authorization: `token ${accessToken}`,
            accept: 'application/json',
          },
        })
        .then((data) => {
          console.log(data);
          setData(data);
        })
        .catch((e) => console.log('oAuth token expired'));
    }
  };

  useEffect(() => {
    getCall();
  }, []);

  return (
    <div>
      <button id="oAuthBtn" onClick={oAuthHandler}>
        {google}
        <div id="comment">구글 OAuth</div>
      </button>
    </div>
  );
}

export default Test;
