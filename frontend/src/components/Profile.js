import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import profilebackground from "../assets/profilebackground.jpg";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <Wrapper>
        <BackgroundImage src={profilebackground} />

        <FirstContainer>
          <ProfilePicture src={user.picture} alt={user.name} />
          <UserInfo>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </UserInfo>
        </FirstContainer>
      </Wrapper>
    )
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  img {
    object-fit: cover;
  }
`;

const FirstContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 60px 130px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  font-family: Bubbly-Soda;
  letter-spacing: 2px;
`;

const BackgroundImage = styled.img`
  position: absolute;
  left: 0%;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: -2;
  object-fit: cover;
`;

const ProfilePicture = styled.img`
  border-radius: 50%;
  width: 200px;
  height: 200px;
  object-fit: cover;
`;

export default Profile;
