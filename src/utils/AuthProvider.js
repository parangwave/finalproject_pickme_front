// 토큰을 페이지 전역을 관리하기 위한 코드
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => {
        // console.log('초기 토큰:', localStorage.getItem('jwt'));
        //로컬에 저장
        return sessionStorage.getItem('jwt');
    });
    
    const [isLoggedIn, setIsLoggedIn] = useState(!!token); // 로그인 상태를 관리합니다.

    useEffect(() => {
        // console.log('토큰 변경됨:', token);
        if (token) {
          console.log('jwt저장');
          sessionStorage.setItem('jwt', token);
          setIsLoggedIn(true);
        } else {
          // console.log('jwt저장실패');
          sessionStorage.removeItem('jwt');
          setIsLoggedIn(false);
        }
    }, [token]);

    return (
        <AuthContext.Provider value={{ token, setToken, isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within a AuthProvider');
    }
    return context;
};