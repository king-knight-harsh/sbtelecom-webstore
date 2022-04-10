// Importing the required libraries
import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";

// styled component to style the Container
const Container = styled.div``;
// styled component to style the Wrapper
const Wrapper = styled.div`
	padding: 50px;
	display: flex;
	${mobile({ padding: "10px", flexDirection: "column" })}
`;
// styled component to style the ImgContainer
const ImgContainer = styled.div`
	flex: 1px;
`;
// styled component to style the Image
const Image = styled.img`
	width: 100%;
	height: 90vh;
	object-fit: cover;
	${mobile({ height: "40vh" })}
`;
// styled component to style the InfoContainer
const InfoContainer = styled.div`
	flex: 1px;
	padding: 0px 50px;
	${mobile({ padding: "10px" })}
`;
// styled component to style the Title
const Title = styled.h1`
	font-weight: 400;
`;
// styled component to style the Desc
const Desc = styled.p`
	margin: 20px 0px;
`;
// styled component to style the Price
const Price = styled.span`
	font-weight: 100;
	font-size: 40px;
`;
// styled component to style the FilterContainer
const FilterContainer = styled.div`
	width: 50%;
	margin: 30px 0px;
	display: flex;
	justify-content: space-between;
	${mobile({ width: "100%" })}
`;
// styled component to style the Filter
const Filter = styled.div`
	display: flex;
	align-items: center;
`;
// styled component to style the FilterTitle
const FilterTitle = styled.span`
	font-size: 20px;
	font-weight: 200;
`;
// styled component to style the FilterColor
const FilterColor = styled.div`
	width: 20px;
	height: 20px;
	border-radius: 50%;
	background-color: ${(props) => props.color};
	margin: 0px 5px;
	cursor: pointer;
`;
// styled component to style the FilterSize
const FilterSize = styled.select`
	margin-left: 10px;
	padding: 5px;
`;
// styled component to style the FilterSizeOption
const FilterSizeOption = styled.option``;
// styled component to style the AddContainer
const AddContainer = styled.div`
	width: 50%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	${mobile({ width: "100%" })}
`;
// styled component to style the AmountContainer
const AmountContainer = styled.div`
	display: flex;
	align-items: center;
	font-weight: 700;
`;
// styled component to style the Amount
const Amount = styled.span`
	width: 30px;
	height: 30px;
	border-radius: 10px;
	border: 1px solid teal;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 5px;
`;
// styled component to style the Button
const Button = styled.button`
	padding: 15px;
	border: 2px solid teal;
	background-color: #fff;
	cursor: pointer;
	font-weight: 500;
	&:hover {
		background-color: lightblue;
	}
`;

const Product = () => {
	const location = useLocation();
	const id = location.pathname.split("/")[2];
	const [product, setProduct] = useState({});
	const [quantity, setQuantity] = useState(1);
	const [color, setColor] = useState("");
	const [size, setSize] = useState("");
	const dispatch = useDispatch();

	useEffect(() => {
		const getProduct = async () => {
			try {
				const res = await publicRequest.get("/products/find/" + id);
				setProduct(res.data);
			} catch {}
		};
		getProduct();
	}, [id]);

	const handleQuantity = (type) => {
		if (type === "dec") {
			quantity > 1 && setQuantity(quantity - 1);
		} else {
			setQuantity(quantity + 1);
		}
	};

	const handleClick = () => {
		dispatch(addProduct({ ...product, quantity, color, size }));
	};
	return (
		<Container>
			<Navbar />
			<Announcement />
			<Wrapper>
				<ImgContainer>
					<Image src={product.img} />
				</ImgContainer>
				<InfoContainer>
					<Title>{product.title}</Title>
					<Desc>{product.desc}</Desc>
					<Price>$ {product.price}</Price>
					<FilterContainer>
						<Filter>
							<FilterTitle>Color</FilterTitle>
							{product.color?.map((color) => (
								<FilterColor
									color={color}
									key={color}
									onClick={() => setColor(color)}
								/>
							))}
						</Filter>
						<Filter>
							<FilterTitle>Size</FilterTitle>
							<FilterSize onChange={(size) => setSize(size.target.value)}>
								{product.size?.map((size) => (
									<FilterSizeOption key={size}>{size}</FilterSizeOption>
								))}
							</FilterSize>
						</Filter>
					</FilterContainer>
					<AddContainer>
						<AmountContainer>
							<Remove onClick={() => handleQuantity("dec")} />
							<Amount>{quantity}</Amount>
							<Add onClick={() => handleQuantity("inc")} />
						</AmountContainer>
						<Button onClick={handleClick}>ADD TO CART</Button>
					</AddContainer>
				</InfoContainer>
			</Wrapper>

			<Newsletter />
			<Footer />
		</Container>
	);
};
//Exporting
export default Product;
