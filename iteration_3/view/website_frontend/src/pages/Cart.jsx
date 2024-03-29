// Importing the required libraries
import { Delete } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import StripeCheckout from "react-stripe-checkout";
import { userRequest } from "../requestMethods";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { removeFromCart } from "../redux/cartRedux";

// styled component to style the Container
const Container = styled.div``;
// styled component to style the Container
const Wrapper = styled.div`
	padding: 20px;
	${mobile({ padding: "10px" })}
`;
// styled component to style the Container
const Title = styled.h1`
	font-weight: 300;
	text-align: center;
`;
// styled component to style the Container
const Top = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20px;
`;
// styled component to style the Container
const TopButton = styled.button`
	padding: 10px;
	font-weight: 600;
	cursor: pointer;
	border: ${(props) => props.type === "filled" && "none"};
	background-color: ${(props) =>
		props.type === "filled" ? "black" : "transparent"};
	color: ${(props) => props.type === "filled" && "white"};
`;
// styled component to style the Container
const TopTexts = styled.div`
	${mobile({ display: "none" })}
`;
// styled component to style the Container
const TopText = styled.span`
	text-decoration: underline;
	cursor: pointer;
	margin: 0px 10px;
`;
// styled component to style the Container
const Bottom = styled.div`
	display: flex;
	justify-content: space-between;
	${mobile({ flexDirection: "column" })}
`;
// styled component to style the Container
const Info = styled.div`
	flex: 3;
`;
// styled component to style the Container
const Product = styled.div`
	display: flex;
	justify-content: space-between;
	${mobile({ flexDirection: "column" })}
`;
// styled component to style the Container
const ProductDetail = styled.div`
	flex: 2;
	display: flex;
`;
// styled component to style the Container
const Image = styled.img`
	width: 200px;
	height: 150px;
`;
// styled component to style the Container
const Details = styled.div`
	padding: 20px;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
`;
// styled component to style the Container
const ProductName = styled.span``;
// styled component to style the Container
const ProductId = styled.span``;
// styled component to style the Container
const ProductColor = styled.div`
	width: 20px;
	height: 20px;
	border-radius: 50%;
	background-color: ${(props) => props.color};
`;
// styled component to style the ProductSize
const ProductSize = styled.span``;
// styled component to style the PriceDetail
const PriceDetail = styled.span`
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;
// styled component to style the ProductAmountContainer
const ProductAmountContainer = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 20px;
`;
// styled component to style the ProductAmount
const ProductAmount = styled.div`
	font-size: 24px;
	margin: 5px;
	${mobile({ margin: "5px 15px" })}
`;
// styled component to style the ProductPrice
const ProductPrice = styled.div`
	font-size: 30px;
	font-weight: 200;
	${mobile({ marginBottom: "20px" })}
`;
// styled component to style the Hr
const Hr = styled.hr`
	background-color: #eee;
	border: none;
	height: 1px;
`;
// styled component to style the Summary
const Summary = styled.div`
	flex: 1;
	border: 0.5px solid lightgray;
	border-radius: 10px;
	padding: 20px;
	height: 50vh;
`;
// styled component to style the SummaryTitle
const SummaryTitle = styled.h1`
	font-weight: 200;
`;
// styled component to style the SummaryItem
const SummaryItem = styled.div`
	margin: 30px 0px;
	display: flex;
	justify-content: space-between;
	font-weight: ${(props) => props.type === "total" && "500"};
	font-size: ${(props) => props.type === "total" && "24px"};
`;
// styled component to style the SummaryItemText
const SummaryItemText = styled.span``;
// styled component to style the SummaryItemPrice
const SummaryItemPrice = styled.span``;
// styled component to style the Button
const Button = styled.button`
	width: 100%;
	padding: 10px;
	background-color: black;
	color: white;
	font-weight: 600;
`;

// React Footer page
const Cart = () => {
	const cart = useSelector((state) => state.cart);
	const [stripeToken, setStripeToken] = useState(null);
	const history = useHistory();
	const dispatch = useDispatch();

	const onToken = (token) => {
		setStripeToken(token);
	};
	useEffect(
		(cart) => {
			const makeRequest = async () => {
				try {
					const res = await userRequest.post("/checkout/payment", {
						tokenId: stripeToken.id,
						amount: cart.total * 100,
					});
					console.log(cart.total);
					history.push("/success", {
						stripeData: res.data,
						products: cart,
					});
				} catch {}
			};
			stripeToken && makeRequest();
		},
		[stripeToken, cart.total, history]
	);

	const handleRemoveFromCart = (cartItem) => {
		dispatch(removeFromCart(cartItem));
	};
	return (
		<Container>
			<Navbar />
			<Announcement />
			<Wrapper>
				<Title>YOUR BAG</Title>
				<Top>
					<Link to={"/"} style={{ textDecoration: "none" }}>
						<TopButton>CONTINUE CHECKING</TopButton>
					</Link>

					<TopTexts>
						<TopText>Shopping Bag</TopText>
						<TopText>Your Wishlist</TopText>
					</TopTexts>

					<StripeCheckout
						name="S.B. TELECOM"
						image="https://cdn.iconscout.com/icon/premium/png-256-thumb/payment-method-seo-business-startup-marketing-optimization-44161.png"
						billingAddress
						shippingAddress
						description={`Your total is $${cart.total}`}
						amount={cart.total * 100}
						token={onToken}
						stripeKey="pk_test_51Km9diJjuzgLFcYDKaBa6mkyam2WmPgbNxh0b7AJ4TateGyw2vOlpgDDpSSRar2DEZlhcxLyiLu3HOS7YmpSCptt00X5KMTpB2"
					>
						<TopButton type="filled">CHECKOUT NOW </TopButton>
					</StripeCheckout>
				</Top>
				<Bottom>
					<Info>
						{cart.products.map((product) => (
							<Product>
								<ProductDetail>
									<Image src={product.img} />
									<Details>
										<ProductName>
											<b>Product:</b> {product.title}
										</ProductName>
										<ProductId>
											<b>ID:</b> {product._id}
										</ProductId>
										<ProductColor color={product.color} />
										<ProductSize>
											<b>Size:</b> {product.size}
										</ProductSize>
										<Delete onClick={() => handleRemoveFromCart(product)} />
									</Details>
								</ProductDetail>
								<PriceDetail>
									<ProductAmountContainer>
										<ProductAmount>{product.quantity}</ProductAmount>
									</ProductAmountContainer>
									<ProductPrice>
										$ {product.price * product.quantity}
									</ProductPrice>
								</PriceDetail>
							</Product>
						))}
						<Hr />
					</Info>
					<Summary>
						<SummaryTitle>ORDER SUMMARY</SummaryTitle>
						<SummaryItem>
							<SummaryItemText>SubTotal</SummaryItemText>
							<SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
						</SummaryItem>
						<SummaryItem>
							<SummaryItemText>Estimated Shipping</SummaryItemText>
							<SummaryItemPrice>$ 49</SummaryItemPrice>
						</SummaryItem>
						<SummaryItem>
							<SummaryItemText>Shipping Discount</SummaryItemText>
							<SummaryItemPrice>$ -49</SummaryItemPrice>
						</SummaryItem>
						<SummaryItem Type="total">
							<SummaryItemText Type="total">Total</SummaryItemText>
							<SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
						</SummaryItem>
						<StripeCheckout
							name="S.B. TELECOM"
							image="https://cdn.iconscout.com/icon/premium/png-256-thumb/payment-method-seo-business-startup-marketing-optimization-44161.png"
							billingAddress
							shippingAddress
							description={`Your total is $${cart.total}`}
							amount={cart.total * 100}
							token={onToken}
							stripeKey="pk_test_51Km9diJjuzgLFcYDKaBa6mkyam2WmPgbNxh0b7AJ4TateGyw2vOlpgDDpSSRar2DEZlhcxLyiLu3HOS7YmpSCptt00X5KMTpB2"
						>
							<Button>CHECKOUT NOW</Button>
						</StripeCheckout>
					</Summary>
				</Bottom>
			</Wrapper>
			<Newsletter />
			<Footer />
		</Container>
	);
};
//Exporting
export default Cart;
