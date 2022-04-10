// Importing the required libraries
import { Send } from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";
// styled component to style the Container
const Container = styled.div`
    height: 60vh;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;
// styled component to style the Title
const Title = styled.h1`
    font-size: 70px;
    margin-bottom: 20px;
`;
// styled component to style the Desc
const Desc = styled.div`
    font-size: 24px;
    font-weight: 300;
    margin-bottom: 20px;
    ${mobile({ textAlign: "Center" })}
`;
// styled component to style the InputContainer
const InputContainer = styled.div`
    width: 50%;
    height: 40px;
    background-color: white;
    display: flex;
    justify-content: space-between;
    border: 2px solid lightgray;
    ${mobile({ width: "80%" })}
`;
// styled component to style the Input
const Input = styled.input`
    border: none;
    flex:8;
    padding-left: 20px;
`;
// styled component to style the Button
const Button = styled.button`
    flex:2;
    border: none;
    background-color: teal;
    color:white;
`;
// React newsletter Footer component
const Newsletter = () => {
    return (
        <Container>
            <Title>Newsletter</Title>
            <Desc>Get timely updates from your favorite products.</Desc>
            <InputContainer>
                <Input placeholder="Your email" />
                <Button>
                    <Send />
                </Button>
            </InputContainer>
        </Container>
    );
};
//Exporting
export default Newsletter;