import logo from "../images/logo.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Header({ isLoggedIn, setIsLoggedIn, email }) {
  const location = useLocation();
  const navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("JWT");
    setIsLoggedIn(false);
    navigate("/sign-in");
  }
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип" />
      {isLoggedIn && (
        <div className="header__profile">
          <p className="header__email">{email}</p>
          <button className="header__logout" onClick={logOut}>
            Выйти
          </button>
        </div>
      )}
      {location.pathname === "/sign-in" && (
        <Link to={"/sign-up"} className="header__link">
          Регистрация
        </Link>
      )}
      {location.pathname === "/sign-up" && (
        <Link to={"/sign-in"} className="header__link">
          Войти
        </Link>
      )}
    </header>
  );
}

export default Header;
