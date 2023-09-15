import { Link, useRouteError } from 'react-router-dom';
import Wrapper from '../assets/wrappers/ErrorPage';
import img from '../assets/images/not-found.svg';

const Error = () => {
  const error = useRouteError();

  if (error.status === 404) {
    return (
      <Wrapper>
        <div>
          <img src={img} alt="not found" />
          <h1>Page not found!</h1>
          <p>We can&apos;t seem to find the page you are looking for.</p>
          <Link to="/dashboard">Home</Link>
        </div>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div>
        <h3>Error</h3>
      </div>
    </Wrapper>
  );
};

export default Error;
