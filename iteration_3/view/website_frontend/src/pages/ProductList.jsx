// Importing the required libraries
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { useState } from "react";

// styled component to style the Container
const Container = styled.div``;
// styled component to style the Title
const Title = styled.h1``;
// styled component to style the FilterContainer
const FilterContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;
// styled component to style the Filter
const Filter = styled.div`
	margin: 20px;
	${mobile({ width: "0px 25px%", display: "flex", flexDirection: "column" })}
`;
// styled component to style the FilterText
const FilterText = styled.span`
	font-style: 20px;
	font-weight: 600;
	margin-right: 20px;
	${mobile({ marginRight: "0px" })}
`;
// styled component to style the Select
const Select = styled.select`
	padding: 10px;
	margin-right: 20px;
	${mobile({ marginLeft: "10px 0px" })}
`;
// styled component to style the Option
const Option = styled.option``;
// React ProductList page
const ProductList = () => {
	const location = useLocation();
	const cat = location.pathname.split("/")[2];
	const [filters, setFilters] = useState({});
	const [sort, setSort] = useState("newest");

	const handleFilters = (e) => {
		const value = e.target.value;
		setFilters({
			...filters,
			[e.target.name]: value.toLowerCase(),
		});
	};

	return (
		<Container>
			<Announcement />
			<Navbar />
			<Title> {cat} </Title>
			<FilterContainer>
				<Filter>
					<FilterText>Filter Product:</FilterText>
					<Select name="color" onChange={handleFilters}>
						<Option disabled>Color</Option>
						<Option>white</Option>
						<Option>black</Option>
						<Option>red</Option>
						<Option>blue</Option>
						<Option>yellow</Option>
						<Option>green</Option>
					</Select>
					<Select name="size" onChange={handleFilters}>
						<Option disabled>Size</Option>
						<Option>128GB</Option>
						<Option>256 GB</Option>
						<Option>512GB</Option>
						<Option>1TB</Option>
						<Option>2TB</Option>
					</Select>
				</Filter>
				<Filter>
					<FilterText>Sort Product:</FilterText>
					<Select onChange={(e) => setSort(e.target.value)}>
						<Option value="newest">Newest</Option>
						<Option value="asc">Price (asc)</Option>
						<Option value="desc">Price (desc)</Option>
					</Select>
				</Filter>
			</FilterContainer>
			<Products cat={cat} filters={filters} sort={sort} />
			<Newsletter />
			<Footer />
		</Container>
	);
};
//Exporting
export default ProductList;
