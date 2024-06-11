import React, { useContext, useState } from "react";
import DefaultButton from "../Components/UI/Button/DefaultButton";
import ShowPasswordButton from "../Components/UI/Button/ShowPasswordButton";
import DefaultInput from "../Components/UI/Input/DefaultInput";
import classes from "./Styles/RegisterPage.module.css";
import UserService from "../API/UserService";
import { AuthContext } from "../Context";

const RegisterPage = () => {
  const { setIsAutorized, setUserId } = useContext(AuthContext);
  const [myType, setMyType] = useState("password");
  const [user, setUser] = useState({ username: "", password: "" });
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setMyType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  const Register = async (e) => {
    e.preventDefault();
    setErrors([]);
    const validationErrors = await CheckData();
    if (validationErrors.length === 0) {
      console.log(user);
      try {
        const response = await UserService.Register(user);
        if (response !== null) {
          setSuccessMessage("User Created");
          setUser({ username: "", password: "" });
          setPasswordConfirmation("");
          setIsAutorized(true);

          setUserId(response.data.userId);
          const stringUserId = response.data.userId.toString();
          localStorage.setItem("userId", stringUserId);
        } else {
          validationErrors.push("User with this name already exist");
        }
      } catch (error) {
        validationErrors.push("Registration failed");
      }
      setErrors(validationErrors);
    } else {
      setUser({ username: "", password: "" });
      setPasswordConfirmation("");
      setErrors(validationErrors);
    }
  };

  async function CheckData() {
    const validationErrors = [];

    if (user.username === "" || user.password === "") {
      validationErrors.push("No empty strings");
    }
    if (user.username.includes(" ")) {
      validationErrors.push("Can't have space in name");
    }
    if (user.username.length < 5) {
      validationErrors.push("At least 5 symbols");
    }
    if (
      user.password.length < 8 ||
      !/^(?=.*[a-zA-Z])(?=.*\d).+$/.test(user.password)
    ) {
      validationErrors.push(
        "Do yourself a normal password with letters and numbers"
      );
    }
    if (user.password !== passwordConfirmation) {
      validationErrors.push("The passwords do not match");
    }
    return validationErrors;
  }

  return (
    <div className={classes.AuthForm}>
      <form>
        <h1>Create your shelter</h1>
        {errors && (
          <div>
            {errors.map((error, index) => (
              <div className={classes.errorForm} key={index}>
                {error}
              </div>
            ))}
          </div>
        )}
        {successMessage && <div>{successMessage}</div>}
        <DefaultInput
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="Username"
        />
        <div className={classes.Password}>
          <DefaultInput
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            type={myType}
            placeholder="Confirm the secret code"
          />
          <ShowPasswordButton onClick={togglePasswordVisibility} />
        </div>
        <DefaultInput
          type={myType}
          placeholder="Secret code for entry"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <div>
          <DefaultButton onClick={Register}>Create</DefaultButton>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
