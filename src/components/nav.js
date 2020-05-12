import React from "react";
import { NavLink } from "react-router-dom";
import { useProfile } from "../api/profileApi";
import { useQuestionaire } from "../api/questionaireApi";
import TemporaryDrawer from "./menu";

export default function Nav() {
  const { loadingProfile, userProfile, errorProfile } = useProfile();
  const {
    loadingQuestionaire,
    userQuestionaire,
    errorQuestionaire,
  } = useQuestionaire();

  if (loadingProfile || loadingQuestionaire) {
    return <p>Loading...</p>;
  }

  if (errorProfile || errorQuestionaire) {
    return <p>Something went wrong: {errorProfile.message}</p>;
  }

  console.log(userQuestionaire);
  console.log(userProfile);

  return (
    <nav>
      <NavLink exact to="/">
        Home
      </NavLink>
      {/* <NavLink to="/profile">Profile</NavLink>
      <NavLink to="/questionaire">Questionaire</NavLink> */}
      {Array.isArray(userProfile) &&
      userProfile.length === 0 &&
      Array.isArray(userQuestionaire) &&
      userQuestionaire.length === 0 ? (
        <>
          <NavLink to="/profile">Profile</NavLink>
          <NavLink to="/questionaire">Questionaire</NavLink>
        </>
      ) : (
        <NavLink to="/matching">Matching</NavLink>
      )}
      {userProfile.matchBuffer.length > 0 && (
        <NavLink to="/matching-status">Matching Status</NavLink>
      )}
      {/* <TemporaryDrawer /> */}
    </nav>
  );
}
