import { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onUpdateImage }) {
  const [link, setLink] = useState("");
  const [name, setName] = useState("");

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateImage({
      name,
      link,
    });
  }

  function handleReset() {
    setLink("");
    setName("");
  }

  useEffect(() => {
    if (isOpen) {
      handleReset();
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name={"images"}
      title={"Новое место"}
      isOpen={isOpen}
      onClose={onClose}
      buttonText={"Создать"}
      disabled={"popup__submit_disabled"}
    >
      <fieldset className="popup__info">
        <input
          onChange={handleChangeName}
          className="popup__input"
          name="name"
          type="text"
          placeholder="Название"
          required
          minLength="2"
          maxLength="30"
          value={name}
        />
        <span className="popup__input-error name-error">
          Вы пропустили это поле.
        </span>
        <input
          onChange={handleChangeLink}
          className="popup__input"
          name="link"
          type="url"
          placeholder="Ссылка на картинку"
          required
          value={link}
        />
        <span className="popup__input-error link-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
