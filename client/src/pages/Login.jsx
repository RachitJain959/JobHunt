import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import Logo from '../components/Logo';
import FormRow from '../components/FormRow';

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
