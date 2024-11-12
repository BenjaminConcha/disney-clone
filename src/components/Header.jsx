import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import {
  selectUserName,
  selectUserPhoto,
  setSignOutState,
  setUserLoginDetails,
} from "../features/user/userSlice";
import { useEffect, useRef, useState } from "react";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);
  const [menuActive, setMenuActive] = useState(false);
  const navMenuRef = useRef(null);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        navigate("/home");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userName]);

  // Authentication Function
  const handleAuth = async () => {
    if (!userName) {
      try {
        const result = await signInWithPopup(auth, provider);
        setUser(result.user);
      } catch (error) {
        alert(error.message);
      }
    } else if (userName) {
      auth
        .signOut()
        .then(() => {
          dispatch(setSignOutState());
          navigate("/");
        })
        .catch((error) => alert(error.message));
    }
  };

  const setUser = (user) => {
    dispatch(
      setUserLoginDetails({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      })
    );
  };

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };
  useEffect(() => {
    if (navMenuRef.current) {
      if (menuActive) {
        navMenuRef.current.classList.add("active");
      } else {
        navMenuRef.current.classList.remove("active");
      }
    }
  }, [menuActive]);

  return (
    <Nav>
      {" "}
      <Logo>
        {" "}
        <img src="/images/logo.svg" alt="Disney+" />{" "}
      </Logo>{" "}
      {!userName ? (
        <Login onClick={handleAuth}>Login</Login>
      ) : (
        <>
          {" "}
          <NavMenu ref={navMenuRef} className="nav-menu">
            {" "}
            <a href="/home">
              {" "}
              <img src="/images/home-icon.svg" alt="HOME" /> <span>HOME</span>{" "}
            </a>{" "}
            <a>
              {" "}
              <img src="/images/search-icon.svg" alt="SEARCH" />{" "}
              <span>SEARCH</span>{" "}
            </a>{" "}
            <a>
              {" "}
              <img src="/images/watchlist-icon.svg" alt="WATCHLIST" />{" "}
              <span>WATCHLIST</span>{" "}
            </a>{" "}
            <a>
              {" "}
              <img src="/images/original-icon.svg" alt="ORIGINALS" />{" "}
              <span>ORIGINALS</span>{" "}
            </a>{" "}
            <a>
              {" "}
              <img src="/images/movie-icon.svg" alt="MOVIES" />{" "}
              <span>MOVIES</span>{" "}
            </a>{" "}
            <a>
              {" "}
              <img src="/images/series-icon.svg" alt="SERIES" />{" "}
              <span>SERIES</span>{" "}
            </a>{" "}
          </NavMenu>{" "}
          <Hamburger onClick={toggleMenu}>
            {" "}
            <span /> <span /> <span />{" "}
          </Hamburger>{" "}
          <SignOut>
            {" "}
            <UserImg src={userPhoto} alt={userName}></UserImg>{" "}
            <DropDown>
              {" "}
              <span onClick={handleAuth}>Sign out</span>{" "}
            </DropDown>{" "}
          </SignOut>{" "}
        </>
      )}{" "}
    </Nav>
  );
};

const Nav = styled.nav`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: 70px;
  background-color: #090b13;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`;

const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;
  img {
    display: block;
    width: 100%;
  }
`;

const NavMenu = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  justify-content: flex-end;
  margin: 0px;
  padding: 0px;
  position: relative;
  margin-right: auto;
  margin-left: 25px;

  a {
    display: flex;
    align-items: center;
    padding: 0 12px;
    img {
      height: 20px;
      min-width: 20px;
      width: 20px;
    }
    span {
      color: rgb(249, 249, 249);
      font-size: 13px;
      letter-spacing: 1.42px;
      line-height: 1.08;
      padding: 2px 0px;
      white-space: nowrap;
      position: relative;
      &::before {
        background-color: rgb(249, 249, 249);
        border-radius: 0 0 4px 4px;
        bottom: -6px;
        content: "";
        height: 2px;
        left: 0px;
        opacity: 0;
        position: absolute;
        right: 0;
        transform-origin: left center;
        transform: scale(0);
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        visibility: hidden;
        width: auto;
      }
    }
    &:hover {
      span::before {
        transform: scale(1);
        visibility: visible;
        opacity: 1 !important;
      }
    }
  }
  @media (max-width: 900px) {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    margin-left: 0;
    width: 100%;
    background-color: #090b13;
    flex-direction: column;
    justify-content: center;
    gap: 50px;
    overflow: hidden;
    max-height: 0;
    opacity: 0;
    transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out;
    &.active {
      max-height: 500px;
      opacity: 1;

      a {
        text-align: center;
        img {
          margin-right: 10px;
        }
      }
    }
  }
`;
const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;
  span {
    height: 2px;
    width: 25px;
    background: rgb(249, 249, 249);
    margin: 3px;
  }
  @media (max-width: 900px) {
    display: flex;
  }
`;

const Login = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2s ease 0s;

  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;

const UserImg = styled.img`
  height: 100%;
`;

const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0/50%) 0px 0 18px 0;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100px;
  opacity: 0;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  ${UserImg} {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }

  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;

export default Header;
