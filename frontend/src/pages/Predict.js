import asyncHandler from "express-async-handler";
import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getModelUrl } from "../utils/index";

const Form = () => {
  const navigate = useNavigate();
  const [prediction, setPrediction] = useState(null);
  const [dis, setDis] = useState([]);
  const [refresh,setRefresh] = useState(false);
  const index=useRef([]);
  const symptoms = [
    "Weakness in muscles",
    "Ever been in a coma",
    "Red spots over body",
    "High Fever",
    "Feel pain behind the eyes",
    "Receiving blood transfusion or any history with it",
    "Blood traces in sputum",
    "Irritation in throat",
    "Rusty sputum",
    "Slurred speech",
    "Increase in appetite",
    "Enlarged thyroid",
    "Irritability",
    "Nodal skin eruptions",
    "Spotting urination",
    "Shivering",
    "Malaise",
    "Sunken eyes",
    "Pus in pimples",
    "Weakness in limbs",
    "Lack of concentration",
    "Visual disturbances",
    "Altered sensorium",
    "Unsteadiness",
    "Bladder discomfort",
    "Passage of gases",
    "Patches in throat",
    "Belly pain",
    "Mucoid sputum",
    "Ulcers on tongue",
    "Cramps",
    "Swelling of/in stomach",
    "Pain during bowel movements",
    "Hip/joint pain",
    "Red sore around nose",
    "Stiffness in movements",
  ];
  
  const handleSubmit = asyncHandler(async (e) => {
    e.preventDefault();
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    axios
      .post(
        `${getModelUrl()}/api/predict`,
        {
          muscle_weakness: dis[0] === "yes",
          coma: dis[1] === "yes",
          red_spots_over_body: dis[2] === "yes",
          high_fever: dis[3] === "yes",
          pain_behind_the_eyes: dis[4] === "yes",
          receiving_blood_transfusion: dis[5] === "yes",
          blood_in_sputum: dis[6] === "yes",
          throat_irritation: dis[7] === "yes",
          rusty_sputum: dis[8] === "yes",
          slurred_speech: dis[9] === "yes",
          increased_appetite: dis[10] === "yes",
          enlarged_thyroid: dis[11] === "yes",
          irritability: dis[12] === "yes",
          nodal_skin_eruptions: dis[13] === "yes",
          spotting_urination: dis[14] === "yes",
          shivering: dis[15] === "yes",
          malaise: dis[16] === "yes",
          sunken_eyes: dis[17] === "yes",
          pus_filled_pimples: dis[18] === "yes",
          weakness_in_limbs: dis[19] === "yes",
          lack_of_concentration: dis[20] === "yes",
          visual_disturbances: dis[21] === "yes",
          altered_sensorium: dis[22] === "yes",
          unsteadiness: dis[23] === "yes",
          bladder_discomfort: dis[24] === "yes",
          passage_of_gases: dis[25] === "yes",
          patches_in_throat: dis[26] === "yes",
          belly_pain: dis[27] === "yes",
          mucoid_sputum: dis[28] === "yes",
          ulcers_on_tongue: dis[29] === "yes",
          cramps: dis[30] === "yes",
          swelling_of_stomach: dis[31] === "yes",
          pain_during_bowel_movements: dis[32] === "yes",
          hip_joint_pain: dis[33] === "yes",
          red_sore_around_nose: dis[34] === "yes",
          movement_stiffness: dis[35] === "yes",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setPrediction(res.data.pred);
      });
  });

  const onChangeInput = (e,i) =>{
    const { value } = e.target;
    let new_dis=dis;
    new_dis[i]=value;
    setDis(new_dis);
    setRefresh(!refresh);
  }

  const resetForm = useCallback(() =>{
    let temp=[],i;
    for(i=0;i<symptoms.length;++i)
    {
      temp[i]="no";
      index.current[i]=i;
    }
    setDis(temp);
  },[symptoms.length])

  useEffect(()=>{
    resetForm();
  },[resetForm])

  return (
    <div className="predict">
      <h2>Disease Prediction</h2>
      <h3>
        Welcome to our symptoms checker page, the model is still in beta but you
        can still check it out as we can ensure a 80% plus accuracy.
      </h3>
      {prediction && (
        <div className="predict-result">
            Probable disease patient needs to check for: <h3>{prediction}</h3>
          <button
            onClick={() => {
              navigate('/appointments');
            }}
          >
            See a doctor
          </button>
        </div>
      )}
      {(
        <div>
          <p>
            Select the symptoms that the patient is exhibiting or suspecting to
            have.
          </p>
          <form className="symptoms-form" onSubmit={handleSubmit}>
            { index.current.map((ind)=>(
              <div className="symptoms-cols" key={ind} id={`form-row-${ind}`}>
                <p className="symptoms-item">{symptoms[ind]}</p>
                <div className="symptoms-item1">
                  <input
                    type="radio"
                    value="yes"
                    checked={dis[ind] === "yes"}
                    onChange={(event) => onChangeInput(event,ind)}
                    name={ind}
                  />
                  {' '}Yes
                </div>
                <div className="symptoms-item2">
                  <input
                    type="radio"
                    value="no"
                    checked={dis[ind] === "no"}
                    onChange={(event) => onChangeInput(event,ind)}
                    name={ind}
                  />
                  {' '}No
                </div>
              </div>
              )
            )}
            <button type="button" onClick={resetForm}>
              Reset
            </button>
            <button type="submit" value="Submit">
              Check
            </button>
          </form>
        </div>
      )}
      
    </div>
  );
};

export default Form;