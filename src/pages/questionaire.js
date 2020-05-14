import React, { useState } from "react";
import { useQuestionaire, updateQuestionaire } from "../api/questionaireApi";
import DiscreteSlider from "../components/slider";
import FormControlLabelPlacement from "../components/radio";
import "../styles.css";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Typography, Paper, TextField, Button } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
//import Button from "../components/button";

const friendsPic = "../../images/room1.jpg";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  entirePage: {},
  sidePart: {
    marginTop: "3%",
    marginBottom: "3%",
    //backgroundColor: "#fdc8b2",
    borderRadius: 10
  },
  paperContainer: {
    height: 1000,
    //width: 560,
    backgroundImage: `url(${friendsPic})`,
    backgroundSize: "cover"
  },
  questionairePart: {},
  text: {
    backgroundColor: "#fdc8b2",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  H1: {
    paddingTop: "7%",
    paddingRight: "13%",
    paddingBottom: "13%",
    paddingLeft: "13%",
    color: "#524a41f6",
    fontFamily: "Raleway, Arial",
    fontSize: 60
  },
  subtitle: {
    paddingLeft: "13%",
    paddingRight: "13%",
    paddingBottom: "13%",
    color: "#524a41f6",
  },

  updateButton: {
    color: "#524a41f6",
    marginLeft: "40%",
    marginTop: "20%",
    padding: "4%",
    fontSize: 18
  },
  question: {
    fontFamily: "Arial",
    fontSize: "18px",
    color: "#524a41f6",
  },
  
}));

export default function ShowQuestionaire() {
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

  function onSubmit() {
    // call upate author function
    updateQuestionaire({
      sameNationalityPref: sameNationalityPrefInput,
      sameGenderPref: sameGenderPrefInput,
      sameLocationPref: sameLocationPrefInput,
      petsPref: petsPrefInput,
      sameLangPref: sameLangPrefInput,
      numRoommeePref: numRoommeePrefInput,
      ageFrom: ageFromInput,
      ageTo: ageToInput,
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
      <Grid
        container
        direction="row"
        className={classes.entirePage}
        spacing={3}
      >
        <Grid item className={classes.questionairePart} xs={1}></Grid>

        <Grid item className={classes.questionairePart} xs={6}>
          <div className={`questionaire user-${accountId}`} key={accountId}>
            <form>
              <br></br>
              <br></br>
              <label className={classes.question}>
                Do you prefer to have the same nationality for your Roommee?
              </label>
              <br></br>
              <FormControlLabelPlacement className={classes.radioButton}
                initValue={sameNationalityPrefInput}
                set={setSameNationalityPref}
              />
              <br></br>
              <br></br>

              <label className={classes.question}>
                Do you prefer to have the same gender for your Roommee?
              </label>
              <br></br>
              <FormControlLabelPlacement
                initValue={sameGenderPrefInput}
                set={setSameGenderPref}
              />
              <br></br>
              <br></br>

              <label className={classes.question}>
                Do you want your Roommee to have the same suburb preference?
              </label>
              <br></br>
              <FormControlLabelPlacement
                initValue={sameLocationPrefInput}
                set={setSameLocationPref}
              />
              <br></br>
              <br></br>

              <label className={classes.question}>
                Do you mind if your Roommee have a pet?
              </label>
              <br></br>
              <FormControlLabelPlacement
                initValue={petsPrefInput}
                set={setPetsPref}
              />
              <br></br>
              <br></br>

              <label className={classes.question}>
                Do you prefer having the same language with your Roommee?
              </label>
              <br></br>
              <FormControlLabelPlacement
                initValue={sameLangPrefInput}
                set={setSameLangPref}
              />
              <br></br>
              <br></br>

              <br></br>
              <Divider />
              <br></br>

              <label className={classes.question}>
                Please indicate the range age gap for your roommee{" "}
              </label>
              <br></br>
              <br></br>
              <label className={classes.question}>From:</label>
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
              <br></br>
              <label className={classes.question}>To:</label>
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
              <Divider />
              <br></br>

              <label className={classes.question}>Enjoy home cooking: </label>
              <br></br>
              <DiscreteSlider
                initValue={homeCookRateInput}
                set={setHomeCookRate}
              />
              <br></br>
              <br></br>

              <label className={classes.question}>
                Your night owl rating:{" "}
              </label>
              <br></br>
              <DiscreteSlider
                initValue={nightOwlRateInput}
                set={setNightOwlRate}
              />
              <br></br>
              <br></br>

              <label className={classes.question}>
                Enjoy hearing and playing music:{" "}
              </label>
              <br></br>
              <DiscreteSlider
                initValue={playsMusicRateInput}
                set={setPlaysMusicRate}
              />
              <br></br>
              <br></br>

              <label className={classes.question}>
                Your introvert rating:{" "}
              </label>
              <br></br>
              <DiscreteSlider
                initValue={seekIntrovertRateInput}
                set={setSeekIntrovertRate}
              />
              <br></br>
              <br></br>

              <label className={classes.question}>
                Your extrovert rating:{" "}
              </label>
              <br></br>

              <DiscreteSlider
                initValue={seekExtrovertRateInput}
                set={setSeekExtrovertRate}
              />
              <br></br>
              <br></br>

              <label className={classes.question}>
                Cleanliness tolerance:{" "}
              </label>
              <br></br>
              <DiscreteSlider
                initValue={cleanlinessToleranceRateInput}
                set={setCleanlinessToleranceRate}
              />
              <br></br>
            </form>
          </div>
        </Grid>

        <Grid className={classes.sidePart} xs={4}>
          <div className={classes.text}>
            <Typography variant="subtitle1" className={classes.H1}>
              Questionaire
            </Typography>

            <Typography variant="subtitle1" className={classes.subtitle}>
              Please fill the questionaire so we can find your perfect Roommee!
            </Typography>
          </div>

          <Paper className={classes.paperContainer}></Paper>

          <Button
            variant="outlined"
            className={classes.updateButton}
            onClick={onSubmit}
          >
            Update
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
