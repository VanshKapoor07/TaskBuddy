import { createContext, useState, useEffect} from "react";

//Create context

const AuthContext = createContext();

function AuthProvider({children}) {
    const[user, setUser] = useState(null);

    //Check if user is logged in(when app loads)

    useEffect(() =>{
        const token = localStorage.getItem("token");
        if (token){
            setUser({token});
        }
    }, []);

    // Login Function
    const login = (token) => {
        localStorage.setItem("token",token);
        setUser({ token });
    };

    // Logout function
    const logout = () =>{
        localStorage.removeItem("token");
        setUser(null);
        
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );

}

export {AuthContext, AuthProvider};