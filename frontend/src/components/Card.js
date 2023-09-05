import { CurrentUserContext } from "../context/CurrentUserContext.js";
import { useContext } from "react";

function Card({
  likes,
  link,
  name,
  selectedCard,
  onEnlarge,
  cardOwner,
  onCardLike,
  card,
  onCardDelete,
  onDelete,
}) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = cardOwner === currentUser._id;
  const isLiked = likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `elements__like-button ${
    isLiked && "elements__like-button_active"
  }`;

  function handleClick() {
    onEnlarge();
    selectedCard({ link, name });
  }

  function handleDeleteClick(e) {
    // e.target.closest('.elements__item').remove()
    selectedCard(card);

    onDelete();
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  return (
    <li className="elements__item">
      {isOwn && (
        <button className="elements__delete" onClick={handleDeleteClick} />
      )}

      <img
        className="elements__image"
        onClick={handleClick}
        src={link}
        alt={name}
      />
      <div className="elements__info">
        <h2 className="elements__title">{name}</h2>
        <div className="elements__like-counter">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <div className="elements__counter">{likes.length}</div>
        </div>
      </div>
    </li>
  );
}

export default Card;
