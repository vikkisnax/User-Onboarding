import React, {useState, useEffect} from "react";
import * as yup from 'yup';
import axios from "axios";
import styled from 'styled-components';

// //STRETCH - styling
const WrapperForm = styled.form`
display: flex;
flex-direction: column;
max-width: 300px;
margin: 0 auto;
color: #3D550C;
`;

const LabelSpace = styled.label`
display: inline-block;
text-align: left;
line-height: 40px;
`;

const InputSpace = styled.input`
display: inline-block;
float: right;
line-height: 10px;
`;

const SelectSpace = styled.select`
display: inline-block;
float: right;
line-height: 10px;
`

const CheckBoxSpace = styled.label`
text-align: center;
margin-left: 50px;
padding-bottom: 10px;
font-weight: bold;
`

//CODE
const Form = props => {
//state to hold user info/keys
const [formState, setFormState]= useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    // STRETCH - added for checkbox 
    positions:"", 
    // checkbox \/
    terms: false 
});

//submit - control whether or not the form can be submitted if there are errors in form validation (in the useEffect)
const [buttonIsDisabled, setButtonIsDisabled] = useState(true);

//server error -- uncomment after you make the .catch to let user know there's a server error
const [serverError, setServerError] = useState("");

//managing state for errors. empty unless inline validation (validateInput) updates key/value pair to have error. expects object {}
const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    // STRETCH - added for checkbox 
    positions:"", 
    // checkbox \/ string error too
    terms: ""   
});

//temporary state for API response- not usually used (bc of <pre>) - to display response from API - array 
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
    //1:46:56 vid for .post
const formSubmit = (e) => {
    e.preventDefault();
    //do axios .post .then
    
    // POST request. uncomment axios import above
    axios
        .post("https://reqres.in/api/users", formState)
        .then((resp) =>{
            //update state w/ API value to display in <pre>. make state to hold this info 
                //see what response is 
                // console.log(resp);
            //response object aka info in form that was sent and created inside the api
            setPost(resp.data);
            //clears form after submit
            setFormState({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                // STRETCH - added for checkbox 
                positions:"", 
                // checkbox \/
                terms: false
            })
        //let user know if there's a server error. look at codesandbox. don't see anything rn 
        .catch((err) => {
            setServerError("There's an error from the server :(")
        })

    })
}





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
    // STRETCH - added for checkbox 
    positions: yup
    .string().required("Please select a position"),
    //boolean bc it's t/f
    terms: yup.boolean().oneOf([true], "Must check box")
});

// VALIDATE ENTIRE FORM - when form state changes - compare against formSchema. returns promise. 
useEffect(()=> { 
    // console.log(formState);
    formSchema.isValid(formState).then((valid, test)=>{
        console.log('test:', test)
        console.log('is vaild?', valid);
        setButtonIsDisabled(!valid);
    });
}, [formState]);



return( 
    <WrapperForm onSubmit={formSubmit}>

        {/* add other code here for last part {serverError}..... */}
        <LabelSpace htmlFor="firstName">
            First Name
            <InputSpace
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
        </LabelSpace>
        
        <LabelSpace htmlFor="lastName">
            Last Name 
            <InputSpace
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
        </LabelSpace>
      
        <LabelSpace htmlFor="email">
            Email 
            <InputSpace
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
        </LabelSpace>
     
        <LabelSpace htmlFor="password">
            Password 
            <InputSpace
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
        </LabelSpace>
       

        {/* STRETCH - dropdown */}
        <LabelSpace htmlFor="positions" className="positions">
        Position
        <SelectSpace
        id="positions"
        name="positions"
        value={formState.positions}
        onChange={inputChange}
        >
            <option value="">--Choose One--</option>
          {/*e.target.value is value in <option> NOT <select>*/}
          <option value="Student">Student</option>
          <option value="FrontEnd">Front-End</option>
          <option value="BackEnd">Back-End</option>
          <option value="Administrative Work">Administrative Work</option>
        </SelectSpace>
        {/* for error msg to show up if any errors */}
        {errors.positions.length > 0 ? (
          <p className="error">{errors.positions}</p>
        ) : null}
        </LabelSpace>


        {/* CHECKBOX */}
        <CheckBoxSpace htmlFor="terms" className="terms">
            <InputSpace
                type="checkbox"
                id="terms"
                name="terms"
                // we set it as true rn -- will change depending if form is completed and valid
                checked={formState.terms} 
                onChange={inputChange}
            />
            Terms and Conditions
       
            {/* add errors.name at the end */}
            {errors.terms.length > 0 ? (
          <p className="error">{errors.terms}</p>
        ) : null}
        </CheckBoxSpace>
       

        <button type="submit" disabled={buttonIsDisabled}>
            Submit
        </button>
        {/* add other code here for last part <pre>.... this updates info from the server that you typed into the form below the form after you submit. doesn't store multiple form submissions */}
        <pre>{JSON.stringify(post, null, 2)}</pre>
    {/* </form> */}
    </WrapperForm>
    );
}

export default Form;