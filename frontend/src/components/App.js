import { useState, useEffect } from "react";
import { api } from "../utils/Api";
import { auth } from "../utils/Auth";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../context/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";

import { useNavigate } from "react-router-dom";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEnlargeImagePopupOpen, setIsEnlargeImagePopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isStatusImagePopupOpen, setIsStatusImagePopupOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [infoTooltipStatus, setInfoTooltipStatus] = useState("");
  const [email, setEmail] = useState("");

  function getUserAuth() {
    const token = localStorage.getItem("JWT");
    auth
      .getUser(token)
      .then((result) => {
        setEmail(result.data.email);
        setIsLoggedIn(true);
        navigate("/");
        
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  useEffect(() => {
    getUserAuth();
  }, []);

  useEffect(() => {
    Promise.all([api.getInitialCards(), api.getProfileInfo()])
      .then(([resultInitial, resultInformation]) => {

        setCurrentUser(resultInformation);
        setCards(resultInitial);
        
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }, []);

  function handleCardDelete() {
    // console.log('CARDS1', cards)
    api
      .deleteCard(selectedCard._id)
      .then((deletedCard) => {
        const filteredCards = cards.filter((item) => {
          return selectedCard._id !== item._id;
        });

        setCards(filteredCards);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
        setInfoTooltipStatus(false);
        setIsStatusImagePopupOpen(true);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    if (isLiked) {
      api
        .deleteLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
          setInfoTooltipStatus(false);
          setIsStatusImagePopupOpen(true);
        });
    } else {
      api
        .addLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
          setInfoTooltipStatus(false);
          setIsStatusImagePopupOpen(true);
        });
    }
  }

  function handleUpdateAvatar(obj) {
    console.log(obj);
    api
      .editProfileAvatar(obj)
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
        setInfoTooltipStatus(false);
        setIsStatusImagePopupOpen(true);
      });
  }

  function handleUpdateUser(obj) {
    api
      .editProfileInfo(obj)
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
        setInfoTooltipStatus(false);
        setIsStatusImagePopupOpen(true);
      });
  }

  function handleAddImage(obj) {
    api
      .postCard(obj)
      .then((result) => {
        setCards([result, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
        setInfoTooltipStatus(false);
        setIsStatusImagePopupOpen(true);
      });
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEnlargeImagePopupOpen(false);
    setIsDeletePopupOpen(false);
    setIsStatusImagePopupOpen(false);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEnlargeClick() {
    setIsEnlargeImagePopupOpen(true);
  }
  function handleDeleteClick() {
    setIsDeletePopupOpen(true);
  }

  function handleLogin(obj) {
    auth
      .login(obj)
      .then((result) => {
        localStorage.setItem("JWT", result.token);
        setIsLoggedIn(true);
        navigate("/");
        setEmail(obj.email);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
        setInfoTooltipStatus(false);
        setIsStatusImagePopupOpen(true);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          email={email}
        />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} redirect={"/sign-in"}>
                <Main
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  selectedCard={setSelectedCard}
                  onEnlarge={handleEnlargeClick}
                  onDelete={handleDeleteClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
                <Footer />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/sign-up"
            element={
              <Register
                statusPic={setInfoTooltipStatus}
                isPicOpen={setIsStatusImagePopupOpen}
              />
            }
          ></Route>
          <Route
            path="/sign-in"
            element={<Login login={handleLogin} />}
          ></Route>
        </Routes>

        <ImagePopup
          src={selectedCard.link}
          alt={selectedCard.name}
          isOpen={isEnlargeImagePopupOpen}
          onClose={closeAllPopups}
        />

        <EditProfilePopup
          onUpdateUser={handleUpdateUser}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        />

        <EditAvatarPopup
          onUpdateAvatar={handleUpdateAvatar}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        />

        <AddPlacePopup
          onUpdateImage={handleAddImage}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        />

        <DeleteCardPopup
          onDelete={handleCardDelete}
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          isOpen={isStatusImagePopupOpen}
          onClose={closeAllPopups}
          status={infoTooltipStatus}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;