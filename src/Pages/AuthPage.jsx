import { useState, useContext } from "react";
import DefaultButton from "../Components/UI/Button/DefaultButton";
import ShowPasswordButton from "../Components/UI/Button/ShowPasswordButton";
import DefaultInput from "../Components/UI/Input/DefaultInput";
import classes from "./Styles/AuthPage.module.css";
import UserService from "../API/UserService";
import { AuthContext } from "../Context";

const AuthPage = () => {
  const { setIsAutorized, setUserId } = useContext(AuthContext);
  const [myType, setMyType] = useState("password");
  const [user, setUser] = useState({ username: "", password: "" });
  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    myType === "password" ? setMyType("text") : setMyType("password");
  };
  const Login = async (e) => {
    e.preventDefault();
    const response = await UserService.Login(user);
    if (response !== null) {
      setIsAutorized(true);
      setUserId(response.data);

      const stringUserId = response.data.toString();
      localStorage.setItem("userId", stringUserId);
    } else {
    }
  };
  return (
    <div className={classes.AuthForm}>
      <form>
        <h1>Enter the joker's hideout</h1>
        <DefaultInput
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder=" Username"
        />
        <div className={classes.Password}>
          <DefaultInput
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            type={myType}
            placeholder=" Secret code"
          />
          <ShowPasswordButton
            onClick={togglePasswordVisibility}
          ></ShowPasswordButton>
        </div>
        <DefaultButton onClick={Login}>Enter</DefaultButton>
      </form>
    </div>
  );
};
export default AuthPage;
