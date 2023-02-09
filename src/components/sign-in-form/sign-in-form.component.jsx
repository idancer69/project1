import './sign-in-form.styles.scss';
import { useState, useContext } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { UserContext } from '../../context/user.context';
import { signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";


const defaultformFields = {
    email: '',
    password: '',
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultformFields);
    const { email, password } = formFields;

    const { setCurrentUser } = useContext(UserContext);
    const resetFormFields = () => {
        setFormFields(defaultformFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { user } = await signInAuthUserWithEmailAndPassword(email, password);
            setCurrentUser(user);
            resetFormFields();
        }
        catch (error) {
            switch (error.code) {
                case 'auth/user-not-found':
                    alert('User not found');
                    break;
                case 'auth/wrong-password':
                    alert('Wrong password');
                    break;
                case 'auth/invalid-email':
                    alert('Invalid email');
                    break;
                default:
                    alert(error.message);
            }
        };
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormFields({ ...formFields, [name]: value });
    }
    const signInWithGoogle = async () => await signInWithGooglePopup();

    return (
        <div className='sign-in-container'>
            <h2>Already have an account</h2>
            <span>Sign in with your email and password</span>
            <form>
                <FormInput label="Email" type="email" name="email" required onChange={handleChange} value={email} />

                <FormInput label="Password" type="password" name="password" required onChange={handleChange} value={password} />
                <div className='buttons-container'>
                    <Button buttonType={'inverted'} type="submit" onClick={handleSubmit}>Sign In</Button>
                    <Button buttonType={'google'} type="button" onClick={signInWithGoogle}>Google sign in</Button>
                </div>

            </form>
        </div>
    )
}

export default SignInForm;