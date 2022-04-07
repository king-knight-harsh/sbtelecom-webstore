import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";

const Container = styled.div``;

const Title = styled.h1``;

const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Filter = styled.div`
    margin: 20px;
    ${mobile({ width: "0px 25px%", display:"flex",flexDirection:"column" })}
`;

const FilterText = styled.span`
    font-style: 20px;
    font-weight: 600;
    margin-right: 20px;
    ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
    padding: 10px;
    margin-right: 20px;
    ${mobile({ marginLeft: "10px 0px" })}
`;

const Option = styled.option``;

const ProductList = () => {
    return (
        <Container>
            <Announcement />
            <Navbar />
            <Title> Products </Title>
            <FilterContainer>
                <Filter>
                    <FilterText>Filter Product:</FilterText>
                    <Select>
                        <Option disabled selected>
                            Products
                        </Option>
                        <Option>Phone</Option>
                        <Option>Laptops</Option>
                        <Option>Hard Disk</Option>
                        <Option>Keyboard Mouse</Option>
                        <Option>Headsets</Option>
                        <Option>PowerBank</Option>
                        <Option>Screen Protector</Option>
                        <Option>wireless Chargers</Option>
                        <Option>Routers</Option>
                        <Option>Ethernet Cable</Option>
                    </Select>
                </Filter>
                <Filter>
                    <FilterText>Sort Product:</FilterText>
                    <Select>
                        <Option selected>Newest</Option>
                        <Option>Price (asc)</Option>
                        <Option>Price (desc)</Option>
                    </Select>
                </Filter>
            </FilterContainer>
            <Products />
            <Newsletter />
            <Footer />
        </Container>
    );
};

export default ProductList;
