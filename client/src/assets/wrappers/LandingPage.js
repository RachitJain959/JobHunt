import styled from 'styled-components';

const Wrapper = styled.section`
  nav {
    width: var(--fluid-width);
    height: var(--nav-height);
    max-width: var(--max-width);
    margin: 0 auto;
    display: flex;
    align-items: center;
  }
  .page {
    min-height: calc(100vh - var(--nav-height));
    display: grid;
    align-items: center;
    margin-top: -3rem;
  }

  h1 {
    font-weight: 700;
    span {
      color: var(--primary-500);
    }
    margin-bottom: 1.5rem;
  }

  p {
    line-height: 2;
    color: var(--text-secondary-color);
    margin-bottom: 1.5rem;
    max-width: 35em;
  }

  .register-link {
    margin-right: 1rem;
  }

  .btn {
    padding: 0.75rem 1rem;
  }

  .main-img {
    display: none;
  }

  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 400px;
    }
    .main-img {
      display: block;
    }
  }
`;
export default Wrapper;
