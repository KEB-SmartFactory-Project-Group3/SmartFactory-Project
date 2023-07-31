import { createContext, useState } from "react";

//다른 컴포넌트와 공유할 컨텍스트
export const AuthContext = createContext()

function AuthProvider( {children}) {

  const [number, setNumber] = useState(0)
  return (
    <AuthContext.Provider value={ {number} }>
      {children}
    </AuthContext.Provider>

  )
}

export default AuthProvider;