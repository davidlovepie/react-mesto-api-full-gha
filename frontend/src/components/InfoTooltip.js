import formTrue from "../images/FormTrue.png";
import formFalse from "../images/FormFalse.png";

function InfoTooltip({ isOpen, onClose, status }) {
  return (
    <div className={`popup popup_type_enlarge ${isOpen && "popup_opened"}`}>
      <div className="popup__container popup__container_type_enlarge">
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
        ></button>
        <img
          className="popup__image"
          src={status ? formTrue : formFalse}
          alt={"Статус"}
        />
      </div>
    </div>
  );
}

export default InfoTooltip;
