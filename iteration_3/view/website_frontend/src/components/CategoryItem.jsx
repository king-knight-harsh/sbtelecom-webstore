// Importing the required libraries
import { Link } from "react-router-dom";
import styled from "styled-components";
import {mobile} from "../responsive"

// styled component to style the Container
const Container = styled.div`
    flex: 1;
    margin: 3px;
    height: 70vh;
    position: relative;
`;
// styled component to style the Image
const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    ${mobile({ height: "20vh" })}
`;
// styled component to style the Info
const Info = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
// styled component to style the Button
const Button = styled.button`
    border: none;
    padding: 10px;
    background-color: white;
    color:gray;
    cursor: pointer;
    font-weight: 600;
`;
// styled component to style the Title
const Title = styled.h1`
    color: white;
    margin-bottom: 20px;
`;
// React Category Item component
const CategoryItem = ({ item }) => {
    return (
        <Container>
            <Link to={`/products/${item.categories}`}>
            <Image src={item.img} />
            <Info>
                <Title>{item.title}</Title>
                <Button>SHOP NOW</Button>
            </Info>
            </Link>
        </Container>
    );
};
//Exporting
export default CategoryItem;