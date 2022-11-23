import styled from "styled-components";
import avatarPlaceholder from "~/assets/img/avatar.jpg";
import { Avatar, Chat, More, Search, Upload } from "../icons/icons";

export const Nav = () => {
    return (
        <StyledNav>
            <More />
            <Upload />
            <Chat />
            <Search />
            <Avatar src={avatarPlaceholder} />
        </StyledNav>
    );
};

const StyledNav = styled.nav`
    border: 1px solid grey;
    display: flex;
    justify-content: space-evenly;
    padding: 12px;
    position: fixed;
    bottom: 0;
    width: inherit;
`;