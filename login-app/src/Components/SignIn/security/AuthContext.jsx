import React,{ createContext, useContext, useState } from "react";
import axios from 'axios';
import { retrieveOperation } from "../../api/ApiService";


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
      const response = await axios.post('http://165.246.116.139:8080/api/auth/login', {
        id: id,
        password: password,
        headers: {
          'Content-Type': 'application/json',
          //  Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify({ name: name}),
      })

      if (response.status === 200) {
        //로그인 성공 시 헤더에 관리자 이름 띄우기
        const { name, token } = response.data;
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
      if (error.response === undefined) {//서버에서 응답이 오지 않는 경우
        throw new Error("API 서버에 접속할 수 없습니다!")
      }else if (error.response.status === 401) {
        //비밀번호가 틀릴 때
        throw new Error("비밀번호가 틀렸습니다!")
      } else {
        throw new Error("로그인 중 알 수 없는 오류가 발생했습니다!")
      }
   
    } 
  }

  function logout() {
    setAuthenticated(false)
    setCurrentUser(null) // 로그아웃 시 관리자 정보 초기화

  }

  return (
    <AuthContext.Provider value={ {isAuthenticated,currentUser, login, logout} }>
      {children}
    </AuthContext.Provider>

  )
}

export default AuthProvider;

