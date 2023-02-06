import './sign-up-form.styles.scss';
import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

const defaultformFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultformFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultformFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        };
        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Email already in use');
            }
            else {
                console.log(error);
            }
            console.log(error);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormFields({ ...formFields, [name]: value });
    }

    return (
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <form onSubmit={handleSubmit}>
                <FormInput label="Display Name" type="text" name="displayName" required onChange={handleChange} value={displayName} />

                <FormInput label="Email" type="email" name="email" required onChange={handleChange} value={email} />

                <FormInput label="Password" type="password" name="password" required onChange={handleChange} value={password} />

                <FormInput label="Confirm Password" type="password" name="confirmPassword" required onChange={handleChange} value={confirmPassword} />

                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    )
}


export default SignUpForm;