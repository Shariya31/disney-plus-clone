import styled from "styled-components";
import { useEffect } from "react";
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth, provider } from "../basefire";
import {
  selectUserName,
  selectUserPhoto,
  setSignOutState,
  setUserLoginDetails
} from "../features/user/userSlice";



const Header = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user)
        navigate('/home')
      }
    })
  }, [username]);

  const handleAuth = () => {
    if(!username){
    auth
      .signInWithPopup(provider)
      .then((result) => {
        setUser(result.user);
      })
      .catch((error) => {
        alert(error.message)
      });
  } else if(username){
    auth.signOut().then(()=>{
      dispatch(setSignOutState())
      navigate('/')
    }).catch((err)=>{
      alert(err.message);
    })
  }
}

  const setUser = (user) => {
    dispatch(setUserLoginDetails({
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
    }))
  }

  return (
    <Nav>
      <Logo>
        <img src="/images/logo.svg" alt="" />
      </Logo>

      {
        !username ?
          (<Login onClick={handleAuth}>Login</Login>)
          : (
            <>
              <NavMenu>
                <a href="/home">
                  <img src="/images/home-icon.svg" alt="Home" />
                  <span>HOME</span>
                </a>
                <a href="/home">
                  <img src="/images/search-icon.svg" alt="Home" />
                  <span>SEARCH</span>
                </a>
                <a href="/home">
                  <img src="/images/watchlist-icon.svg" alt="Home" />
                  <span>WATCHLIST</span>
                </a>
                <a href="/home">
                  <img src="/images/original-icon.svg" alt="Home" />
                  <span>ORIGINALS</span>
                </a>
                <a href="/home">
                  <img src="/images/movie-icon.svg" alt="Home" />
                  <span>MOVIES</span>
                </a>
                <a href="/home">
                  <img src="/images/series-icon.svg" alt="Home" />
                  <span>SERIES</span>
                </a>
              </NavMenu>
              <SignOut>
                <UserImg src={userPhoto} alt={username} />
                <DropDown>
                  <span onClick={handleAuth}> Sign Out</span>
                </DropDown>
              </SignOut>
            </>
          )}
    </Nav>
  )
}

const Nav = styled.nav`
 position: fixed; 
 top: 0;
 left: 0;
 right: 0;
 height: 70px;
 background-color: #090b13;
 display: flex;
 align-items: center;
 justify-content: space-between;
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

 img{
  display: block;
  width: 100%
 }

 `;
const NavMenu = styled.div`
 display: flex; 
 align-items: center;
 justify-content: center;
 flex-flow: row nowrap
 height: 100%;
 margin: 0px;
 padding: 0px;
 position: relative;
 margin-right: auto;
 margin-left: 25px;

 @media (max-width: 768px){
  display: none;
 }

 a{
  display: flex;
  align-items: center;
  padding: 0 12px;
  text-decoration: none;
 

 img{
  height: 20px;
  min-width: 20px;
  width: 20px;
  z-index: auto;
 }

 span{
  color: rgb(249, 249, 249);
  font-size: 13px;
  letter-spacing: 1.42px;
  line-height: 1.08;
  padding: 2px 0px;
  white-space: nowrap;
  position: relative;
 

  &:before{
    background-color: rgb(249,249,249);
    border-radius: 0px 0px 4px 4px;
    bottom: -6px;
    content: "";
    height: 2px;
    opacity: 0;
    position: absolute;
    right: 0px;
    left: 0px;
    transform-origin: left center;
    transform: scaleX(0);
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
    visibility: hidden;
    width: auto;
  }
}

&:hover{
  span:before{
    transform: scaleX(1);
    visibility: visible;
    opacity: 1 !important;
    }
  }
}
 `;

const Login = styled.a`
 background-color: rgb(0,0,0,0.6);
 border: 1px solid #f9f9f9;
 border-radius: 4px;
 letter-spacing: 1.5px;
 padding: 8px 16px;
 font-weight: bold;
 transition: all .3s ease;

 &:hover{
   background-color: #f9f9f9;
   color:  rgb(0,0,0,0.6);
   text-decoration: none;
   border-color: transparent;
 }
 `;

const UserImg = styled.img`
 height: 100%;
//  border-radius: 50px;
 `;

const DropDown = styled.div`
 position: absolute;
 top: 48px;
 right: 0px;
 background: rgb(19, 19, 19);
 border: 1px solid rgba(151, 151, 151, 0.34);
 border-radius: 4px;
 box-shadow: rgb(0 0 0 / 50%) 0px 0px 10px 0px;
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
 align-items: center:
 justify-content: center;

 ${UserImg} {
  border-radius: 50%;
  width: 100%;
  height: 100%;
 }

 &:hover{
  ${DropDown}{
    opacity: 1;
    transition-duration: 1s;
  }
 }
`;
export default Header



