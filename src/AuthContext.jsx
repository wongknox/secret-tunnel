import { createContext, useContext, useState } from "react";

const API = "https://fsa-jwt-practice.herokuapp.com";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [location, setLocation] = useState("GATE");
  console.log(token);

  // TODO: signup
  async function signup(username) {
    try {
      const response = await fetch(API + "/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      const result = await response.json();
      console.log("Signup Result:", result);

      if (result?.token) {
        setToken(result.token);
        setLocation("TABLET");
      }
      return result;
    } catch (error) {
      console.error("Signup Error:", error);
      throw error;
    }
  }

  // TODO: authenticate
  async function authenticate() {
    if (!token) {
      console.log("No token available for authentification.");
      return null;
    }
    try {
      // In order to attach a token to a request, you have to
      // set the Authorization header of the request headers
      const response = await fetch(API + "/authenticate", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      console.log("Authentification Result:", result);
      setLocation("TUNNEL");
      return result;
    } catch (error) {
      console.error("Authentification Error:", error);
      throw error;
    }
  }

  const value = { token, location, setLocation, signup, authenticate };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}
