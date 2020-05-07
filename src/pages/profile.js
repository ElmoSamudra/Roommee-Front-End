import React from "react";
import { useProfile } from "../api";


export default function ShowProfile() {
    const { loading, userProfile, error } = useProfile();
    if (loading) {
      return <p>Loading...</p>;
    }
    if (error) {
      return <p>Something went wrong: {error.message}</p>;
    }
  
    // use this to make sure you are getting the right data
    console.log(userProfile.data);
  
    // Display a list of the authors
    return (
      <div>
        <h1>My Profile</h1>
        <Profile key={userProfile.data.accountId} {...userProfile.data} />
      </div>
    );
  }

function Profile(profile) {
    const { accountId, firstName, surName, age, gender, nationality, hobby, language, preferStay } = profile;
    //const [showUpdate, setShowUpdate] = useState(false);

    return (
        <div className={`profile user-${accountId}`} key={accountId}>
            <div className="profileInfo">
                <h4>First Name: {firstName} </h4>
                <h4>Surname: {surName} </h4>
                <h4>Age: {age} </h4>
                <h4>Gender: {gender} </h4>
                <h4>Nationality: {nationality} </h4>
                <h4>Hobby: {hobby} </h4>
                <h4>Language: {language} </h4>
                <h4>Find a place to stay in (suburb): {preferStay}</h4>
            </div>
        </div>
    );
}

