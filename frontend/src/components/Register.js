import { useState, useEffect, useContext } from "react";
import { auth } from "../utils/Auth";
import { useNavigate, Link } from "react-router-dom";

function Register({ statusPic, isPicOpen }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleEmail(e) {
    setEmail(e.target.value);
  }
  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    auth
      .registration({ email: email, password: password })
      .then((result) => {
        console.log("registartion", result);
        statusPic(true);
        isPicOpen(true);
        navigate("/sign-in");
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
        statusPic(false);
        isPicOpen(true);
      });
  }

  return (
    <div className={`popup_type_register popup_opened`}>
      <div className={`popup__container popup__container_type_dark`}>
        <h2 className="popup__title popup__title_type_dark">Регистрация</h2>
        <form className="popup__form" name={"form"} onSubmit={handleSubmit}>
          <fieldset className="popup__info">
            <input
              className="popup__input popup__input_type_top"
              name="email"
              type="email"
              placeholder="Email"
              required
              minLength="2"
              maxLength="40"
              onChange={handleEmail}
              value={email || ""}
            />
            <span className="popup__input-error name-error popup__input-error_type_dark"></span>
            <input
              className="popup__input popup__input_type_bottom"
              name="password"
              type="password"
              placeholder="Пароль"
              required
              minLength="2"
              maxLength="200"
              onChange={handlePassword}
              value={password || ""}
            />
            <span className="popup__input-error about-error "></span>
          </fieldset>
          <button
            className={`popup__submit popup__submit_type_dark`}
            type="submit"
          >
            Зарегистрироваться
          </button>
          <p className="popup__small-text">Уже зарегистрированы? <Link className="popup__small-text" to={"/sign-in"}>Войти</Link></p>
        </form>
      </div>
    </div>
  );
}

export default Register;
