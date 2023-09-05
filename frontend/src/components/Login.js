import { useState, useEffect, useContext } from "react";

function Login({ login }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmail(e) {
    setEmail(e.target.value);
  }
  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    login({ password, email });
  }

  return (
    <div className={`popup_type_login popup_opened`}>
      <div className={`popup__container popup__container_type_dark`}>
        <h2 className="popup__title popup__title_type_dark">Вход</h2>
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
            <span className="popup__input-error about-error"></span>
          </fieldset>
          <button
            className={`popup__submit popup__submit_type_dark`}
            type="submit"
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
