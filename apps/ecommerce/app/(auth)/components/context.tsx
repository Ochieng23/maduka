'use client';
import React from 'react';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import firebase_app from '../../config';

const auth = getAuth(firebase_app);

export const AuthContext = React.createContext({});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // ... rest of the component
  const [person, setPerson] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setPerson(person);
      } else {
        setPerson(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ person }}>
      { children}
    </AuthContext.Provider>
  );
};


// export const AuthContextProvider = ({ children }) => {
//   const [person, setPerson] = React.useState(null);
//   const [loading, setLoading] = React.useState(true);

//   React.useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setPerson(person);
//       } else {
//         setPerson(null);
//       }
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ person }}>
//       { children}
//     </AuthContext.Provider>
//   );
// };
