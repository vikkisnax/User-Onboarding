import React, {useState} from "react";
//add useEffect ^

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

// ONSUBMIT FUNCTION - button - DO LATER
    // const formSubmit = (e) => {
    //     e.preventDefault();
    //     //do axios .post .then
    // }

// ONCHANGE FUNCTION
const inputChange = (e) => {
    e.persist();

    const newFormState = {
        ...formState,
        [e.target.name]:
          e.target.type === "checkbox" ? e.target.checked : e.target.value
      };

    // ADD LATER
    // validateChange(e); // for each change in input, do inline validation
    setFormState(newFormState); // update state with new data
 } 

// SCHEMA - RULES

// VALIDATE ENTIRE FORM 
    // useEffect(( => { }))


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
        </label>

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
        </label>

        <button type="submit" disabled={buttonIsDisabled}>
            Submit
        </button>

        {/* add other code here for last part <pre>..... */}
    </form>
     );
}

export default Form;