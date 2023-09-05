function ImagePopup({ src, alt, isOpen, onClose }) {
  return (
    <div className={`popup popup_type_enlarge ${isOpen && "popup_opened"}`}>
      <div className="popup__container popup__container_type_enlarge">
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
        ></button>
        <img className="popup__image" src={src} alt={alt} />
        <h2 className="popup__title popup__title_type_enlarge">{alt}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;
