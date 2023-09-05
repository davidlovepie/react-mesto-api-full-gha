function PopupWithForm({
  title,
  name,
  children,
  isOpen,
  onClose,
  buttonText,
  disabled,
  onSubmit,
  containerType,
}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}>
      <div className={`popup__container ${containerType}`}>
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" name={name} onSubmit={onSubmit}>
          {children}
          <button className={`popup__submit`} type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
