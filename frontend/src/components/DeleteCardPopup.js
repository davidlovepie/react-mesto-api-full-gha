import { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup({ isOpen, onClose, onDelete }) {
  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    onDelete();
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name={"images"}
      title={"Вы уверены?"}
      isOpen={isOpen}
      onClose={onClose}
      buttonText={"Да"}
      containerType={"popup__container_type_delete"}
    ></PopupWithForm>
  );
}

export default DeleteCardPopup;
