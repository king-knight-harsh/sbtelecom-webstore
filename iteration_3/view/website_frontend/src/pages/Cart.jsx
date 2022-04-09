import {
	Add,
	Delete,
	Remove,
} from "@material-ui/icons";
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



const Container = styled.div``;

const Wrapper = styled.div`
	padding: 20px;
	${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
	font-weight: 300;
	text-align: center;
`;

const Top = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20px;
`;

const TopButton = styled.button`
	padding: 10px;
	font-weight: 600;
	cursor: pointer;
	border: ${(props) => props.type === "filled" && "none"};
	background-color: ${(props) =>
		props.type === "filled" ? "black" : "transparent"};
	color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
	${mobile({ display: "none" })}
`;
const TopText = styled.span`
	text-decoration: underline;
	cursor: pointer;
	margin: 0px 10px;
`;

const Bottom = styled.div`
	display: flex;
	justify-content: space-between;
	${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
	flex: 3;
`;

const Product = styled.div`
	display: flex;
	justify-content: space-between;
	${mobile({ flexDirection: "column" })}
`;
const ProductDetail = styled.div`
	flex: 2;
	display: flex;
`;

const Image = styled.img`
	width: 200px;
	height: 150px;
`;

const Details = styled.div`
	padding: 20px;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
	width: 20px;
	height: 20px;
	border-radius: 50%;
	background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.span`
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const ProductAmountContainer = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 20px;
`;

const ProductAmount = styled.div`
	font-size: 24px;
	margin: 5px;
	${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
	font-size: 30px;
	font-weight: 200;
	${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
	background-color: #eee;
	border: none;
	height: 1px;
`;

const Summary = styled.div`
	flex: 1;
	border: 0.5px solid lightgray;
	border-radius: 10px;
	padding: 20px;
	height: 50vh;
`;

const SummaryTitle = styled.h1`
	font-weight: 200;
`;
const SummaryItem = styled.div`
	margin: 30px 0px;
	display: flex;
	justify-content: space-between;
	font-weight: ${(props) => props.type === "total" && "500"};
	font-size: ${(props) => props.type === "total" && "24px"};
`;
const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
	width: 100%;
	padding: 10px;
	background-color: black;
	color: white;
	font-weight: 600;
`;


const Cart = () => {
	const cart = useSelector((state) => state.cart);
	const [stripeToken, setStripeToken] = useState(null);
	const [quantity, setQuantity] = useState(1);
	const history = useHistory();
	const dispatch = useDispatch()

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

	const handleQuantity = (type) => {
		if (type === "dec") {
			quantity > 1 && setQuantity(quantity - 1);
		} else {
			setQuantity(quantity + 1);
			console.log("increase");
		}
	};
	
	const handleRemoveFromCart = (cartItem) => {
		dispatch(removeFromCart(cartItem))
	}
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
										<Add onClick={() => handleQuantity("inc")} />
										<ProductAmount>{product.quantity}</ProductAmount>
										<Remove onClick={() => handleQuantity("dec")} />
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

export default Cart;
