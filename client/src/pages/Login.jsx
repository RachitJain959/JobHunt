import { Link, redirect } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import Logo from '../components/Logo';
import FormRow from '../components/FormRow';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify'; //provides alerts to the user

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch('/auth/login', data);
    toast.success('Logged in successfully.');
    return redirect('/dashboard');
  } catch (error) {
    return error;
  }

  return null;
};

const Login = () => {
  return (
    <Wrapper>
      <div>
        <form className="form">
          <Logo />
          <h4>Login</h4>
          <FormRow name="email" type="email" defaultValue="a@email.com" />
          <FormRow
            name="password"
            type="password"
            defaultValue="okmijn741852"
          />
          <button type="submit" className="btn btn-block">
            Submit
          </button>
          <button type="button" className="btn btn-block">
            Explore the App
          </button>
          <p>
            Not a member yet?
            <Link to="/register" className="member-btn">
              Register
            </Link>
          </p>
        </form>
      </div>
    </Wrapper>
  );
};

export default Login;
