import { createContext, useContext, useState } from "react";


//다른 컴포넌트와 공유할 컨텍스트
export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

function AuthProvider( {children}) {

  //로그인 성공 여부
  const [isAuthenticated,setAuthenticated] = useState(false)

  function login(username,password) {
    if (username === "12193152" && password === "dabin") {
      setAuthenticated(true)
      return true
    } else {
      setAuthenticated(false)
      return false
    }
  }

  function logout() {
    setAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={ {isAuthenticated,login, logout} }>
      {children}
    </AuthContext.Provider>

  )
}

export default AuthProvider;

