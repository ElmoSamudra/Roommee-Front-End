import { useState, useEffect } from "react";

const BASE_URL = "http://localhost:3000";

function getQuestionaire() {
  const endpoint = BASE_URL + `/user-questionaire`;
  return fetch(endpoint).then((res) => {
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
    ageDiffRange,
    homeCookRate,
    nightOwlRate,
    playsMusicRate,
    seekIntrovertRate,
    seekExtrovertRate,
    cleanlinessToleranceRate
  } = questionaire;
  const endpoint = BASE_URL + "/user-questionaire/update";
  // return fetch query to update an author
  return fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sameNationalityPref,
      sameGenderPref,
      sameLocationPref,
      petsPref,
      sameLangPref,
      numRoommeePref,
      ageDiffRange,
      homeCookRate,
      nightOwlRate,
      playsMusicRate,
      seekIntrovertRate,
      seekExtrovertRate,
      cleanlinessToleranceRate
    }),
  }).then((res) => window.location.reload(window.location.reload));
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
    loading,
    userQuestionaire,
    error,
  };
}

