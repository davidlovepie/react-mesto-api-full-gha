import { useState, useEffect, useContext } from "react";

import Card from "./Card";
import { CurrentUserContext } from "../context/CurrentUserContext";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  selectedCard,
  onEnlarge,
  onDelete,
  cards,
  onCardLike,
  onCardDelete,
}) {

  const currentUser = useContext(CurrentUserContext);
console.log('currentUser', currentUser);
  return (
    <main className="content">
      <section className="profile">
        <button className="profile__avatar" onClick={onEditAvatar}>
          <img
            className="profile__avatar-update"
            src={currentUser.avatar}
            alt="Аватар профиля"
          />
        </button>
        <div className="profile__information">
          <div className="profile__container">
            <h1 className="profile__author">{currentUser.name}</h1>
            <button
              type="button"
              className="profile__edit"
              onClick={onEditProfile}
            ></button>
          </div>
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button
          type="button"
          className="profile__add"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="elements" aria-label="Фотогалерея">
        <ul className="elements__list">
          {Array.isArray(cards) && cards.map((card, index) => {
            return (
              <Card
                key={card._id}
                likes={card.likes}
                link={card.link}
                name={card.name}
                selectedCard={selectedCard}
                onEnlarge={onEnlarge}
                cardOwner={card.owner._id}
                onCardLike={onCardLike}
                card={card}
                onCardDelete={onCardDelete}
                onDelete={onDelete}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;

