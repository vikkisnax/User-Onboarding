import React, {useState, useEffect} from "react";
import * as yup from 'yup';
import axios from "axios";

const Form = props => {

//state to hold user info/keys
const [formState, setFormState]= useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    // checkbox \/
    terms: false,   
});

//submit - control whether or not the form can be submitted if there are errors in form validation (in the useEffect)
const [buttonIsDisabled, setButtonIsDisabled] = useState(true);

//server error
// const [serverError, setServerError] = useState("");

//managing state for errors. empty unless inline validation (validateInput) updates key/value pair to have error. expects object {}
const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    // checkbox \/ string error too
    terms: "",   
});

//temporary state for API response- not usually used - to display response from API - array 
const [post, setPost] = useState([]);


//make state to store error msgs to display
//inline validation - after inputChange , schema, validate entire form
    //validates one key/value pair at a time -- input w/ error
const validateChange = (e) => {
    yup
        .reach (formSchema, e.target.name)
        .validate(
            e.target.type === "checkbox" ? e.target.checked :
            e.target.value
        )
        //promise - if valid or invalid input
        .then((valid) => {
            setErrors({...errors, [e.target.name]: "" })
        })
        .catch((err) => {
            console.log('err', err);
            setErrors({...errors, [e.target.name]: err.errors[0]})
            //[0] is so we get the first error in the array
        })
}
//write this^ out then CALL IT in inputChange then add code to inputs below so we can can call this function when there's a change aka when we call the input change function. @1:35:50 in vid.




// ONSUBMIT FUNCTION - button - DO LATER
const formSubmit = (e) => {
    e.preventDefault();
    //do axios .post .then
    
    // POST request. uncomment axios import above
    axios
        .post("https://reqres.in/api/users", formState)
        .then((resp) =>{
            //update state w/ API value to display in <pre>. make state to hold this info 
            setPost(resp.data);
    })
}
//1:46:56 vid for .post




// ONCHANGE FUNCTION
const inputChange = (e) => {
    //bc passing event asyncronusly - bc of error msg too- read notes
    e.persist();

    // if the input or checkbox changes
    const newFormState = {
        ...formState,
        [e.target.name]:
          e.target.type === "checkbox" ? e.target.checked : e.target.value
      };

    // ADD LATER - for each error msg 
    validateChange(e); // for each change in input, do inline validation. event variable.
    setFormState(newFormState); // update state with new data if there's a change
 } 

// SCHEMA - RULES - Implement Form Validation and Error Messaging
// do I need the 'required' error msg if i have an error msg for min text req?
const formSchema = yup.object().shape({
    firstName: yup.string().required("First name is required.").min(2, "First name must be at least 2 characters"),
    lastName: yup.string().required("Last name is required.").min(2, "Last name must be at least 2 characters"),
    // //.email or .required?
    email: yup.string().email("Must provide email."),
    password:yup.string().required("Must provide password.").min(6, "Password must be 6 characters minimum"),
    // //boolean bc it's t/f
    terms: yup.boolean().oneOf([true], "Must check box")
});

// VALIDATE ENTIRE FORM - when form state changes - compare against formSchema. returns promise. 
useEffect(()=> { 
    console.log(formState);
    formSchema.isValid(formState).then((valid, test)=>{
        console.log('test:', test)
        console.log('is vaild?', valid);
        setButtonIsDisabled(!valid);
    });
}, [formState]);



return(
    //add onSubmit={formSubmit}
    <form>
        {/* add other code here for last part {serverError}..... */}

        <label htmlFor="firstName">
            First Name
            <input
                id="firstName"
                type="text"
                name="firstName"
                value={formState.firstName}
                onChange={inputChange}
            />
            {/* add errors.name at the end */}
            {errors.firstName.length > 0 ? (
          <p className="error">{errors.firstName}</p>
        ) : null}
        </label>

        <label htmlFor="lastName">
            Last Name
            <input
                id="lastName"
                type="text"
                name="lastName"
                value={formState.lastName}
                onChange={inputChange}
            />
            {/* add errors.name at the end */}
            {errors.lastName.length > 0 ? (
          <p className="error">{errors.lastName}</p>
        ) : null}
        </label>

        <label htmlFor="email">
            Email
            <input
                id="email"
                type="text"
                name="email"
                value={formState.email}
                onChange={inputChange} 
            />
            {/* add errors.name at the end */}
            {errors.email.length > 0 ? (
          <p className="error">{errors.email}</p>
        ) : null}
        </label>

        <label htmlFor="password">
            Password
            <input
                id= "password"
                type="password"
                name="password"
                value={formState.password}
                onChange={inputChange}
            />
            {/* add errors.name at the end */}
            {errors.password.length > 0 ? (
          <p className="error">{errors.password}</p>
        ) : null}
        </label>

        {/* CHECKBOX */}
        <label htmlFor="terms" className="terms">
            Terms and Conditions
            <input
                type="checkbox"
                id="terms"
                name="terms"
                // we set it as true rn -- will change depending if form is completed and valid
                checked={formState.terms} 
                onChange={inputChange}
            />
            {/* add errors.name at the end */}
            {errors.terms.length > 0 ? (
          <p className="error">{errors.terms}</p>
        ) : null}
        </label>

        <button type="submit" disabled={buttonIsDisabled}>
            Submit
        </button>

        {/* add other code here for last part <pre>..... */}
    </form>
     );
}

export default Form;