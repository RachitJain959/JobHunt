import Wrapper from '../assets/wrappers/LandingPage';
import main from '../assets/images/main.svg';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            Job <span>Tracking</span> app
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, earum.
            Voluptate placeat odit ut asperiores earum voluptates aspernatur
            molestias cum quo nemo quidem ab iure architecto assumenda, ipsa
            sequi voluptatem!
          </p>
          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn">
            Login / Demo User
          </Link>
        </div>
        <img src={main} alt="job-hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
