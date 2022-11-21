import styled from "styled-components";
import avatarPlaceholder from "~/assets/img/avatar.jpg";
import { Avatar, Chat, More, Search, Upload } from "../icons/icons";

export const Nav = () => {
    return (
        <StyledNav>
            <More />
            <Avatar src={avatarPlaceholder} />
            <Chat />
            <Upload />
            <Search />
        </StyledNav>
    );
};

const StyledNav = styled.nav`
    display: flex;
`;