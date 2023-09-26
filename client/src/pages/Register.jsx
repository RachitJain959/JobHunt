import { Form, Link, redirect, useNavigation } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import Logo from '../components/Logo';
import FormRow from '../components/FormRow';
import customFetch from '../utils/customFetch';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post('/auth/register', data);
    return redirect('/login');
  } catch (error) {
    console.log(error);
    return error;
  }
};

const Register = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  return (
    <Wrapper>
      <div>
        <Form method="post" className="form">
          <Logo />
          <h4>Register</h4>
          <FormRow type="text" name="name" defaultValue="ron" />
          <FormRow
            type="text"
            name="lastName"
            labelText="Last Name"
            defaultValue="jain"
          />
          <FormRow type="text" name="location" defaultValue="earth" />
          <FormRow type="email" name="email" defaultValue="test@email.com" />
          <FormRow type="password" name="password" defaultValue="secret123" />

          <button
            type="submit"
            className="btn btn-block"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
          <p>
            Already a member?{' '}
            <Link to="/login" className="member-btn">
              Login
            </Link>
          </p>
        </Form>
      </div>
    </Wrapper>
  );
};

export default Register;
