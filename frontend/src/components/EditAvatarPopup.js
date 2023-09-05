import { useState, useEffect, useContext, useRef } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  useEffect(() => {
    if (isOpen) {
      avatarRef.current.value = ""; // Очищаем значение поля
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name={"update-avatar"}
      title={"Обновить аватар"}
      isOpen={isOpen}
      onClose={onClose}
      buttonText={"Сохранить"}
      disabled={"popup__submit_disabled"}
    >
      <fieldset className="popup__info">
        <input
          ref={avatarRef}
          className="popup__input"
          name="avatar"
          type="url"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="popup__input-error avatar-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
