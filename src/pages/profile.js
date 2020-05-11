import React, { useState } from "react";
import { useProfile, updateProfile } from "../api/profileApi";

//import Button from "../components/button";

export default function ShowProfile() {
  const { loadingProfile, userProfile, errorProfile } = useProfile();
  if (loadingProfile) {
    return <p>Loading...</p>;
  }
  if (errorProfile) {
    return <p>Something went wrong: {errorProfile.message}</p>;
  }
  console.log("called");
  // use this to make sure you are getting the right data
  console.log(userProfile);

  // Display a list of the authors
  return (
    <div>
      <h1>My Profile</h1>
      <Profile key={userProfile.accountId} {...userProfile} />
    </div>
  );
}

function Profile(profile) {
  const {
    accountId,
    firstName,
    surName,
    age,
    gender,
    nationality,
    hobby,
    language,
    preferStay,
  } = profile;
  //const [showUpdate, setShowUpdate] = useState(false);

  const [firstNameInput, setFirstName] = useState(firstName);
  const [surNameInput, setSurName] = useState(surName);
  const [ageInput, setAge] = useState(age);
  const [genderInput, setGender] = useState(gender);
  const [nationalityInput, setNationality] = useState(nationality);
  const [hobbyInput, setHobby] = useState(hobby);
  const [languageInput, setLanguage] = useState(language);
  const [preferStayInput, setPreferStay] = useState(preferStay);

  function onSubmit() {
    // call upate author function
    updateProfile({
      firstName: firstNameInput,
      surName: surNameInput,
      age: ageInput,
      gender: genderInput.toLowerCase(),
      nationality: nationalityInput.toLowerCase(),
      hobby: hobbyInput.toString().toLowerCase(),
      language: languageInput.toString().toLowerCase(),
      preferStay: preferStayInput.toString().toLowerCase(),
    });
  }

  return (
    <div className={`profile user-${accountId}`} key={accountId}>
      <form>
        <label>First name: </label>
        <input
          type="text"
          name="firstName"
          value={firstNameInput}
          onChange={(event) => {
            setFirstName(event.target.value);
          }}
          required
        />
        <br></br>
        <label>Surname: </label>
        <input
          type="text"
          name="surName"
          value={surNameInput}
          onChange={(event) => {
            setSurName(event.target.value);
          }}
          required
        />
        <br></br>
        <label>Age: </label>
        <input
          type="number"
          name="age"
          value={ageInput}
          onChange={(event) => {
            setAge(event.target.value);
          }}
          required
        />
        <br></br>
        <label>Gender: </label>
        <input
          type="text"
          name="gender"
          value={genderInput}
          onChange={(event) => {
            setGender(event.target.value);
          }}
          required
        />
        <br></br>
        <label>Nationality: </label>
        <input
          type="text"
          name="nationality"
          value={nationalityInput}
          onChange={(event) => {
            setNationality(event.target.value);
          }}
          required
        />
        <br></br>
        <label>Hobby: </label>
        <input
          type="text"
          name="hobby"
          value={hobbyInput}
          onChange={(event) => {
            setHobby(event.target.value);
          }}
        />
        <br></br>
        <label>Language: </label>
        <input
          type="text"
          name="language"
          value={languageInput}
          onChange={(event) => {
            setLanguage(event.target.value);
          }}
        />
        <br></br>
        <label>Find a place to stay in (suburb): </label>
        <input
          type="text"
          name="preferStay"
          value={preferStayInput}
          onChange={(event) => {
            setPreferStay(event.target.value);
          }}
        />
        <br></br>
        <button className="btn-update" onClick={onSubmit}>
          Update
        </button>
      </form>
      {/* <Button className={"btn-update"} onClick={onSubmit}>
                Update
            </Button> */}
    </div>
  );
}
