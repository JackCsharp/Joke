import React, { useContext, useState } from "react";
import DefaultButton from "../Components/UI/Button/DefaultButton";
import ShowPasswordButton from "../Components/UI/Button/ShowPasswordButton";
import DefaultInput from "../Components/UI/Input/DefaultInput";
import classes from "./Styles/RegisterPage.module.css";
import UserService from "../API/UserService";
import { AuthContext } from "../Context";

const RegisterPage = () => {
  const { setIsAutorized } = useContext(AuthContext);
  const [myType, setMyType] = useState("password");
  const [user, setUser] = useState({ username: "", password: "" });
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    myType === "password" ? setMyType("text") : setMyType("password");
  };

  const Register = async (e) => {
    e.preventDefault();
    setErrors([]);
    const validationErrors = await CheckData();
    if (validationErrors.length === 0) {
      UserService.Register(user)
        ? setSuccessMessage("Пользователь успешно создан")
        : validationErrors.push("Пользователь с таким ником уже существует");
      setUser({ username: "", password: "" });
      setPasswordConfirmation("");
      setErrors(validationErrors);
      if (!successMessage) {
        setIsAutorized(true);
      }
    } else {
      setUser({ username: "", password: "" });
      setPasswordConfirmation("");
      setErrors(validationErrors);
    }
  };

  async function CheckData() {
    const validationErrors = [];

    if (user.username === "" || user.password === "") {
      validationErrors.push("Никаких пустых строк");
    }
    if (user.username.includes(" ")) {
      validationErrors.push("В прозвище не может быть пробела");
    }
    if (user.username.length < 5) {
      validationErrors.push("Минимум 5 символов в прозвище");
    }
    if (user.password < 8 || /^(?=.*[a-zA-Z])(?=.*\d).+$/.test(user.password)) {
      validationErrors.push(
        "Сделай ce6e нормальный пароль из минимум 8 символов и цифр"
      );
    }
    if (user.password !== passwordConfirmation) {
      validationErrors.push("Пароли не совпадают");
    }
    setErrors([]);
    return validationErrors;
  }

  return (
    <div className={classes.AuthForm}>
      <form>
        <h1>Создать свое убежище</h1>
        {errors && (
          <div>
            {errors.map((error, index) => (
              <div className={classes.errorForm} key={index}>
                {error}
              </div>
            ))}
          </div>
        )}
        {successMessage && <div>Пользователь успешно создан</div>}
        <DefaultInput
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder=" Прозвище владельца"
        />
        <div className={classes.Password}>
          <DefaultInput
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            type={myType}
            placeholder=" Тайный шифр для входа"
          />
          <ShowPasswordButton
            onClick={togglePasswordVisibility}
          ></ShowPasswordButton>
        </div>
        <DefaultInput
          type={myType}
          placeholder=" Подтверди тайный шифр"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <div>
          <DefaultButton onClick={Register}>Создать</DefaultButton>
        </div>
      </form>
    </div>
  );
};
export default RegisterPage;
