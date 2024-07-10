// src/LineLoginButton.jsx
import React from 'react';

const LineLoginButton = () => {
  const lineLogin = () => {
    const redirectUri = import.meta.env.VITE_LINE_CALLBACK_URI;
    const state = "12345abcde";
    const scope = "profile openid email";
    const clientId = import.meta.env.VITE_LINE_CHANNEL_ID;

    const loginUrl = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=${scope}`;

    window.location.href = loginUrl;
  };

  return (
    <button onClick={lineLogin}>
      LINE Login
    </button>
  );
};

export default LineLoginButton;
