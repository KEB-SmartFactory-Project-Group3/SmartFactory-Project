import React, { useState } from 'react';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 로그인 처리 로직 작성
    console.log('Username:', username);
    console.log('Password:', password);
  };
 

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} id = "loginform">
        <div id ="form">
          <label>Username : </label>
          <input type="text" placeholder = "아이디" required value={username} onChange={handleUsernameChange} />
        </div>
        <div>
          <label>Password : </label>
          <input type="password" placeholder="비밀번호" required value={password} onChange={handlePasswordChange} />
        </div>
        <button type="submit" id ="loginbtn">Login</button>
        <a href='#none'>회원가입</a>
      </form>
    </div>
  );
};

export default Login;