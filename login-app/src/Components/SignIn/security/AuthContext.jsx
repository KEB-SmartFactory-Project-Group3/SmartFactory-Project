import React,{ createContext, useContext, useState } from "react";
import axios from 'axios';


//다른 컴포넌트와 공유할 컨텍스트
export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

function AuthProvider( {children}) {

  //로그인 성공 여부
  const [isAuthenticated,setAuthenticated] = useState(false)
  //현재 관리자 정보
  const [currentUser, setCurrentUser] = useState(null)

 
  async function login(id,password,name) {

    
    try {
      // 백엔드 api 호출해서 로그인 인증
      const response = await axios.post('http://165.246.116.28:8080/api/auth/login', {
        id: id,
        password: password,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: id, name: name}),
      })

      if (response.status === 200) {
        //로그인 성공 시 헤더에 관리자 이름 띄우기
        const { name } = response.data;
        setAuthenticated(true);
        setCurrentUser({ name: name });
        return true
      } else {
        setAuthenticated(false);
        setCurrentUser(null);
        return false;
       
      }
    } 

    catch (error) {
      console.error("로그인 오류: ",error)
      alert("로그인 중 API 오류 발생")
      setAuthenticated(false);
      setCurrentUser(null);
      return false;
    }
  }

  function logout() {
    setAuthenticated(false)
    setCurrentUser(null) // 로그아웃 시 관리자 정보 초기화


  }

  return (
    <AuthContext.Provider value={ {isAuthenticated, currentUser, login, logout} }>
      {children}
    </AuthContext.Provider>

  )
}

export default AuthProvider;

