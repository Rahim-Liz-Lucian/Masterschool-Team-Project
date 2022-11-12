import styled from "styled-components";

// Create a Title component that'll render an <h1> tag with some styles
const Title = styled.h1`
font-size: 1.5em;
text-align: center;
color: palevioletred;
`;

// Create a Wrapper component that'll render a <section> tag with some styles
const Wrapper = styled.section`
padding: 4em;
background: papayawhip;
width: 100vw;
height: 100vh;
display: flex;
justify-content: center;
text-align: center;
`;

export function App() {
    // Use Title and Wrapper like any other React component – except they're styled!
    return (
        <Wrapper>
            <Title>
                Hello World!
            </Title>
        </Wrapper>
    );
}
