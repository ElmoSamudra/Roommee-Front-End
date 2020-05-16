import { useState, useEffect } from "react";

const BASE_URL = "https://roommee.herokuapp.com";

function getQuestionaire() {
  const endpoint = BASE_URL + `/user-questionaire`;
  const token = localStorage.token;

  return fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.json();
  });
}

export function updateQuestionaire(questionaire) {
  const {
    sameNationalityPref,
    sameGenderPref,
    sameLocationPref,
    petsPref,
    sameLangPref,
    numRoommeePref,
    ageFrom,
    ageTo,
    homeCookRate,
    nightOwlRate,
    playsMusicRate,
    seekIntrovertRate,
    seekExtrovertRate,
    cleanlinessToleranceRate,
  } = questionaire;
  const endpoint = BASE_URL + "/user-questionaire/update";
  // return fetch query to update an author

  const token = localStorage.token;
  return fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      sameNationalityPref,
      sameGenderPref,
      sameLocationPref,
      petsPref,
      sameLangPref,
      numRoommeePref,
      ageFrom,
      ageTo,
      homeCookRate,
      nightOwlRate,
      playsMusicRate,
      seekIntrovertRate,
      seekExtrovertRate,
      cleanlinessToleranceRate,
    }),
  }).then((res) => window.location.reload());
}

export function useQuestionaire() {
  const [loading, setLoading] = useState(true);
  const [userQuestionaire, setUserQuestionaire] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getQuestionaire()
      .then((questionaire) => {
        setUserQuestionaire(questionaire);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setError(e);
        setLoading(false);
      });
  }, []);

  return {
    loadingQuestionaire: loading,
    userQuestionaire,
    errorQuestionaire: error,
  };
}
