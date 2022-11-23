import styled from "styled-components";
import { Nav, } from "~/component/base/base";

export default function Page() {
    return (
        <Container>
            <h1>Add Product</h1>

            <form>
                <Input />
            </form>

            <Nav />
        </Container>
    );
}

const Container = styled.div`
    outline: 1px solid magenta;
    width: 390px;
    height: 100vh;
`;