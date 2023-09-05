import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name={"profile"}
      title={"Редактировать профиль"}
      isOpen={isOpen}
      onClose={onClose}
      buttonText={"Сохранить"}
    >
      <fieldset className="popup__info">
        <input
          className="popup__input"
          name="name"
          type="text"
          placeholder="Ваше имя"
          required
          minLength="2"
          maxLength="40"
          onChange={handleChangeName}
          value={name || ""}
        />
        <span className="popup__input-error name-error"></span>
        <input
          className="popup__input"
          name="about"
          type="text"
          placeholder="О себе"
          required
          minLength="2"
          maxLength="200"
          onChange={handleChangeDescription}
          value={description || ""}
        />
        <span className="popup__input-error about-error"></span>
        {/* <button className="popup__submit" type="submit">Сохранить</button> */}
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
