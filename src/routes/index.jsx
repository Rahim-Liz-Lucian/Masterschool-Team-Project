import styled from "styled-components";
import { Link } from "wouter";

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


export default function Page() {
    // Use Title and Wrapper like any other React component – except they're styled!
    return (
        <Wrapper>
            <Title>
                Hello World!
            </Title>

            <Link href="/users/JohnDoe">
                <a className="link">Profile</a>
            </Link>

            <p>This is just an example page using styled components within Preact</p>
        </Wrapper>
    );
}