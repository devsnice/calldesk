import styled from 'styled-components';

const Layout = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 60px 0;

  @media (max-width: 1280px) {
    width: 100%;
    padding-left: 10px;
    padding-right: 10px;
  }
`;

export default Layout;
