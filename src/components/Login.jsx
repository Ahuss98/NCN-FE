import { useState } from 'react';
import { createContext } from 'react';

export const UserContext = createContext();

function LoginProvider ({children}) {
    const [selectedUser, setSelectedUser] = useState('');

    return (
        <UserContext.Provider value={{selectedUser,setSelectedUser}}>
            {children}
        </UserContext.Provider>
    )

}
export default LoginProvider