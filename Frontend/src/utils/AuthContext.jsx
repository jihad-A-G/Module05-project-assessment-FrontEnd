// AuthContext.jsx
import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [info, setInfo] = useState({});
  const [role,setRole] = useState(null);
  const [auth, setAuth] = useState(null);
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
       const token = localStorage.get('token');
       if (token) {
         try {
           const decodedId = (jwtDecode(token));
           console.log(decodedId);
           setId(decodedId.id);
           setAuth(true);
           setRole(decodedId.role);
           if (decodedId.id !== id) { 
             setInfo({ id: decodedId.id }); 
           }
           setLoading(false);
         } catch (error) {
           console.error('Error decoding token:', error);
           setLoading(false);
         }
       } else {
         setLoading(false);
       }
    };
   
    fetchUserInfo();
   }, [setId,setRole,setAuth]); 

  useEffect(() => {
    console.log('the updated id in the context', id);
    console.log('the updated auth in the context', auth);
    console.log('the updated role in the context', role);

  }, [id,auth,role]);

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth, info, setInfo, id, setId,role,setRole}}>
      {children}
    </AuthContext.Provider>
  );
};

// Export useInfo, not info
const useInfo = () => {
  return React.useContext(AuthContext);
};

export { AuthContext, AuthProvider, useInfo };
