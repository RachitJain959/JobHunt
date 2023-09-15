import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import Logo from '../components/Logo';
import FormRow from '../components/FormRow';

const Register = () => {
  return (
    <Wrapper>
      <div>
        <form className="form">
          <Logo />
          <h4>Register</h4>
          <FormRow type="text" name="name" defaultValue="asd" />
          <FormRow
            type="text"
            name="lastName"
            labelText="Last Name"
            defaultValue="qwe"
          />
          <FormRow type="text" name="location" defaultValue="earth" />
          <FormRow type="email" name="email" defaultValue="a@email.com" />
          <FormRow
            type="password"
            name="password"
            defaultValue="okmijn741852"
          />

          <button type="submit" className="btn btn-block">
            Submit
          </button>
          <p>
            Already a member?{' '}
            <Link to="/login" className="member-btn">
              Login
            </Link>
          </p>
        </form>
      </div>
    </Wrapper>
  );
};

export default Register;
