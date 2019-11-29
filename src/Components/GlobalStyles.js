import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const globalStyles = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Titillium+Web&display=swap');
    ${reset}
    a {
        color: inherit;
        text-decoration: none;
    }
    * {
        box-sizing: border-box;
    }
    body {
        color: white;
        background-color: rgba(20, 20, 20, 1);
        font-family: 'Titillium Web';
        font-size: 14px;
        padding-top: 80px;
    }
`;

export default globalStyles;
