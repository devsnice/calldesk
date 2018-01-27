import { injectGlobal } from 'styled-components';

const initStyles = () => {
  injectGlobal`
    html, body, #root {
      padding: 0;
      margin: 0;
    }

    html {
      font-family: 'Roboto', sans-serif;
    }
`;
};

export default initStyles;
