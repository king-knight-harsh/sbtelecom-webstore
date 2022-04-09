import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import Badge from "@material-ui/core/Badge";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


const Container = styled.div`
    height: 60px;
    ${mobile({ height: " 60px" })}
`;

const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`;

const Language = styled.span`
    font-size: 14px;
    cursor: pointer;
    ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
    border: 0.5px solid rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
`;

const Input = styled.input`
    border: None;
    ${mobile({ width: "50px" })}
`;
const Center = styled.div`
    flex: 1;
    text-align: center;
`;

const Logo = styled.h1`
    font-weight: bold;
    color:black;
    font-weight: 600;
    ${mobile({ fontSize: "18px" })}
`;

const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    ${mobile({ justifyContent: "center", flex: 2 })}
`;

const MenuItem = styled.div`
    color:black;
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
    ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;
const Navbar = () => {
    const quantity = useSelector(state=>state.cart.quantity)
    return (
        <Container>
            <Wrapper>
                <Left>
                    <Language>En</Language>
                    <SearchContainer>
                        <Input placeholder="Search" />
                        <Search style={{ color: "gray", fontSize: 16 }} />
                    </SearchContainer>
                </Left>
                <Center>
                    <Link to={`/`} style={{textDecoration:"none"}}>
                    <Logo>S.B. TELECOM</Logo>
                    </Link>
                </Center>
                <Right>
                    <Link to={`/logout`} style={{textDecoration:"none"}}>
                    <MenuItem>LOG OUT</MenuItem>
                    </Link>
                    <Link to={`/register`} style={{textDecoration:"none"}}>
                    <MenuItem>REGISTER</MenuItem>
                    </Link>
                    <Link to={`/login`} style={{textDecoration:"none"}}>
                    <MenuItem>LOG IN</MenuItem>
                    </Link >

                    <Link to={`/cart`} style={{textDecoration:"none"}}>
                    <MenuItem>
                        <Badge badgeContent={quantity} color="primary">
                            <ShoppingCartOutlined />
                        </Badge>
                    </MenuItem>
                    </Link>
                </Right>
            </Wrapper>
        </Container>
    );
};

export default Navbar;