import React, { useState } from "react";
import { useQuestionaire, updateQuestionaire } from "../api/questionaireApi";
import DiscreteSlider from "../components/slider";
import "../styles.css";
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import {Typography, Paper, TextField, Button} from "@material-ui/core";
//import Button from "../components/button";

const friendsPic = '../../images/friends.png'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  entirePage:{
    
  },
  sidePart: {
    backgroundColor: "#FCDB87",
  },
  paperContainer: {
    height: 480,
    backgroundImage: `url(${friendsPic})`
  },
  questionairePart: {
    
  },
  text: {
    backgroundColor: "#FCDB87"
  },
  H1: {
    paddingTop:"7%",
    paddingRight:"13%",
    paddingBottom:"13%",
    paddingLeft:"13%",
    color: "#524a41f6"
  },
  subtitle: {
    paddingLeft:"13%",
    paddingRight:"13%",
    paddingBottom:"13%",
    color: "#524a41f6"
  },
  input: {
    size: "small",
    margin: "dense"
  },
  updateButton: {
    color: "#524a41f6",
    marginLeft: "40%",
    marginTop: "20%"
  },
  question: {
    fontFamily: "Arial",
    fontSize: "15px",
    color: "#524a41f6"
  }

}));




export default function ShowQuestionaire() {
  const classes = useStyles();

  const {
    loadingQuestionaire,
    userQuestionaire,
    errorQuestionaire,
  } = useQuestionaire();
  if (loadingQuestionaire) {
    return <p>Loading...</p>;
  }
  if (errorQuestionaire) {
    return <p>Something went wrong: {errorQuestionaire.message}</p>;
  }
  console.log("called");
  // use this to make sure you are getting the right data
  console.log(userQuestionaire);

  // Display a list of the authors
  return (

      <div>
        <Questionaire key={userQuestionaire.accountId} {...userQuestionaire} />
      </div>

  );
}

function Questionaire(questionaire) {
  const classes = useStyles();

  const { accountId, filter1, filter2 } = questionaire;

  const {
    sameNationalityPref,
    sameGenderPref,
    sameLocationPref,
    petsPref,
    sameLangPref,
    numRoommeePref,
    ageDiffRange,
  } = filter1;
  console.log("ageDiffRange: " + ageDiffRange);

  const ageFrom = ageDiffRange[0];
  const ageTo = ageDiffRange[ageDiffRange.length - 1];

  const {
    homeCookRate,
    nightOwlRate,
    playsMusicRate,
    seekIntrovertRate,
    seekExtrovertRate,
    cleanlinessToleranceRate,
  } = filter2;

  const [sameNationalityPrefInput, setSameNationalityPref] = useState(
    sameNationalityPref
  );
  const [sameGenderPrefInput, setSameGenderPref] = useState(sameGenderPref);
  const [sameLocationPrefInput, setSameLocationPref] = useState(
    sameLocationPref
  );
  const [petsPrefInput, setPetsPref] = useState(petsPref);
  const [sameLangPrefInput, setSameLangPref] = useState(sameLangPref);
  const [numRoommeePrefInput, setNumRoommeePref] = useState(numRoommeePref);

  const [ageFromInput, setAgeFrom] = useState(ageFrom);
  const [ageToInput, setAgeTo] = useState(ageTo);

  const [homeCookRateInput, setHomeCookRate] = useState(homeCookRate);
  const [nightOwlRateInput, setNightOwlRate] = useState(nightOwlRate);
  const [playsMusicRateInput, setPlaysMusicRate] = useState(playsMusicRate);
  const [seekIntrovertRateInput, setSeekIntrovertRate] = useState(
    seekIntrovertRate
  );
  const [seekExtrovertRateInput, setSeekExtrovertRate] = useState(
    seekExtrovertRate
  );
  const [cleanlinessToleranceRateInput, setCleanlinessToleranceRate] = useState(
    cleanlinessToleranceRate
  );

  console.log(cleanlinessToleranceRateInput);

  function onSubmit() {
    // call upate author function
    console.log(typeof playsMusicRateInput);
    updateQuestionaire({
      sameNationalityPref: sameNationalityPrefInput,
      sameGenderPref: sameGenderPrefInput,
      sameLocationPref: sameLocationPrefInput,
      petsPref: petsPrefInput,
      sameLangPref: sameLangPrefInput,
      numRoommeePref: numRoommeePrefInput,
      ageFrom: ageFromInput,
      ageTo: ageToInput,
      // ageDiffRange: ageDiffRangeInput,
      homeCookRate: homeCookRateInput,
      nightOwlRate: nightOwlRateInput,
      playsMusicRate: playsMusicRateInput,
      seekIntrovertRate: seekIntrovertRateInput,
      seekExtrovertRate: seekExtrovertRateInput,
      cleanlinessToleranceRate: cleanlinessToleranceRateInput,
    });
  }

  return (
    <div className={classes.root}>
      <Grid container direction="row" className={classes.entirePage} spacing={3}>
        <Grid item className={classes.questionairePart} xs={1}>
        </Grid>

        <Grid item className={classes.questionairePart} xs={5}>
          <div className={`questionaire user-${accountId}`} key={accountId}>
            <form>
              <br></br>
              <br></br>
              <label className={classes.question}>
                Do you prefer to have the same nationality for your Roommee?
              </label>
              <br></br>
              <TextField className={classes.input}
                type="text"
                name="sameNationalityPref"
                value={sameNationalityPrefInput}
                onChange={(event) => {
                  setSameNationalityPref(event.target.value);
                }}
                required
              />
              <br></br>
              <br></br>

              <label className={classes.question}>
                Do you prefer to have the same gender for your Roommee? 
              </label>
              <br></br>
              <TextField
                type="text"
                name="sameGenderPref"
                value={sameGenderPrefInput}
                onChange={(event) => {
                  setSameGenderPref(event.target.value);
                }}
                required
              />
              <br></br>
              <br></br>

              <label className={classes.question}>
                Do you want your Roommee to have the same suburb preference?
              </label>
              <br></br>
              <TextField
                type="text"
                name="sameLocationPref"
                value={sameLocationPrefInput}
                onChange={(event) => {
                  setSameLocationPref(event.target.value);
                }}
                required
              />
              <br></br>
              <br></br>

              <label className={classes.question}>
                Do you mind if your Roommee have a pet? 
              </label>
              <br></br>
              <TextField
                type="text"
                name="petsPref"
                value={petsPrefInput}
                onChange={(event) => {
                  setPetsPref(event.target.value);
                }}
                required
              />
              <br></br>
              <br></br>

              <label className={classes.question}>
                Do you prefer having the same language with your Roommee?
              </label>
              <br></br>
              <TextField
                type="text"
                name="sameLangPref"
                value={sameLangPrefInput}
                onChange={(event) => {
                  setSameLangPref(event.target.value);
                }}
                required
              />
              <br></br>
              <br></br>

              <label className={classes.question}>How many Roommee are you looking for? </label>
              <br></br>
              <TextField
                type="text"
                name="numRoommeePref"
                value={numRoommeePrefInput}
                onChange={(event) => {
                  setNumRoommeePref(event.target.value);
                }}
                required
              />
              <br></br>
              <br></br>

              <label className={classes.question}>Please indicate the range age gap for your roommee </label>
              <br></br>
              <label className={classes.question}>
                From: 
              </label>
              <br></br>
              <TextField
                type="number"
                name="ageFrom"
                value={ageFromInput}
                onChange={(event) => {
                  setAgeFrom(event.target.value);
                }}
                required
              />
              <br></br>

              <label className={classes.question}>
                To: 
              </label>
              <br></br>
              <TextField
                type="number"
                name="ageTo"
                value={ageToInput}
                onChange={(event) => {
                  //setAgeDiffRange(ageDiffRangeInput);
                  setAgeTo(event.target.value);
                }}
                required
              />
              <br></br>
              <br></br>

              

              <label className={classes.question}>Enjoy home cooking: </label>
              <br></br>
              <TextField
                type="number"
                name="homeCookRate"
                value={homeCookRateInput}
                onChange={(event) => {
                  setHomeCookRate(event.target.value);
                }}
              />
              <br></br>
              <br></br>

              <label className={classes.question}>Your night owl rating: </label>
              <br></br>
              <TextField
                type="number"
                name="nightOwlRate"
                value={nightOwlRateInput}
                onChange={(event) => {
                  setNightOwlRate(event.target.value);
                }}
              />
              <br></br>
              <br></br>

              <label className={classes.question}>Enjoy hearing and playing music: </label>
              <br></br>
              <TextField
                type="number"
                name="playsMusicRate"
                value={playsMusicRateInput}
                onChange={(event) => {
                  setPlaysMusicRate(event.target.value);
                }}
              />
              <br></br>
              <br></br>

              <label className={classes.question}>Your introvert rating: </label>
              <br></br>
              <TextField
                type="number"
                name="seekIntrovertRate"
                value={seekIntrovertRateInput}
                onChange={(event) => {
                  setSeekIntrovertRate(event.target.value);
                }}
              />
              <br></br>
              <br></br>

              <label className={classes.question}>Your extrovert rating: </label>
              <br></br>
              <TextField
                type="number"
                name="seekExtrovertRate"
                value={seekExtrovertRateInput}
                onChange={(event) => {
                  setSeekExtrovertRate(event.target.value);
                }}
              />
              <br></br>
              <br></br>

              <label className={classes.question}>Cleanliness tolerance: </label>
              <br></br>
              <TextField
                type="number"
                name="cleanlinessToleranceRate"
                value={cleanlinessToleranceRateInput}
                onChange={(event) => {
                  setCleanlinessToleranceRate(event.target.value);
                }}
              />
              <br></br>

            </form>
          </div>
        </Grid>

        <Grid className={classes.sidePart} xs={5}>
          <div className={classes.text}>
            <Typography variant='h2' className={classes.H1}>
              Questionaire
            </Typography>
           
            <Typography variant='subtitle1' className={classes.subtitle}>
              Please fill the questionaire so we can find your perfect Roommee!
            </Typography>
          </div>

          <Paper className={classes.paperContainer}>
          </Paper>

          <Button variant="outlined" className={classes.updateButton} onClick={onSubmit}>
            Update
          </Button>
        </Grid>
      </Grid>
    </div>
    
  );
}
