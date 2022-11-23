import styled from "styled-components";
import { Nav } from "~/component/base/base";

export default function Page() {
    return (
        <Container>
            <div>
                <h1>Browse</h1>
                <button>List View</button>
                <button>Map View</button>
            </div>

            <Nav />
        </Container>
    );
}

const Container = styled.div`
    outline: 1px solid magenta;
    width: 390px;
    height: 100vh;
`;

