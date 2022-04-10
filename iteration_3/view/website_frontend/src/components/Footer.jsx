// Importing the required libraries
import {
	Facebook,
	Instagram,
	MailOutline,
	Phone,
	Pinterest,
	Room,
	Twitter,
} from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";

// styled component to style the Container
const Container = styled.div`
	display: flex;
	${mobile({ flexDirection: "column" })}
`;
// styled component to style the Left
const Left = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	padding: 20px;
`;
// styled component to style the Logo
const Logo = styled.h1``;
// styled component to style the Info
const Desc = styled.p`
	margin: 20px 0px;
`;
// styled component to style the Info
const SocialContainer = styled.div`
	display: flex;
`;
// styled component to style the Info
const SocialIcon = styled.div`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	color: white;
	background-color: #${(prop) => prop.color};
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 20px;
`;
// styled component to style the Info
const Right = styled.div`
	flex: 1;
	padding: 20px;
	${mobile({ backgroundColor: "#fff8f8" })}
`;
// styled component to style the Title
const Title = styled.h3`
	border-bottom: 30px;
`;
// styled component to style the List
const List = styled.ul`
	margin: 0;
	padding: 0;
	list-style: none;
	display: flex;
	flex-wrap: wrap;
`;
// styled component to style the ListItem
const ListItem = styled.li`
	width: 50%;
	margin-bottom: 10px;
`;

// styled component to style the Center
const Center = styled.div`
	flex: 1;
	padding: 20px;
	${mobile({ display: "none" })}
`;
// styled component to style the ContactItem
const ContactItem = styled.div`
	margin-bottom: 20px;
	cursor: pointer;
	display: flex;
	align-content: center;
`;
// styled component to style the Payment
const Payment = styled.img`
	width: 50%;
`;
// React Category Footer component
const Footer = () => {
	return (
		<Container>
			{/* left side of the footer  */}
			<Left>
				<Logo>S.B. TELECOM</Logo>
				<Desc>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere,
					accusamus fuga officia iure beatae id dolores consequatur sint porro
					nulla.
				</Desc>
				<SocialContainer>
					<SocialIcon color="3B5999">
						<Facebook />
					</SocialIcon>
					<SocialIcon color="E440FF">
						<Instagram />
					</SocialIcon>
					<SocialIcon color="55ACEE">
						<Twitter />
					</SocialIcon>
					<SocialIcon color="E60023">
						<Pinterest />
					</SocialIcon>
				</SocialContainer>
			</Left>
			{/* Center side of the footer  */}
			<Center>
				<Title>Useful Links</Title>
				<List>
					<ListItem>Home</ListItem>
					<ListItem>Cart</ListItem>
					<ListItem>Computer Accessories</ListItem>
					<ListItem>Network Accessories</ListItem>
					<ListItem>Smartphones Accessories</ListItem>
					<ListItem>My Account</ListItem>
					<ListItem>Order Tracking</ListItem>
					<ListItem>Wishlist</ListItem>
					<ListItem>Wishlist</ListItem>
					<ListItem>Terms</ListItem>
				</List>
			</Center>
			{/* right side of the footer  */}
			<Right>
				<Title>Contact</Title>
				<ContactItem>
					<Room
						style={{ marginRight: "10px" }}
						onClick={() =>
							window.open(
								"https://www.google.com/maps/place/S.B.+Telecom/@31.6298468,74.8722469,17z/data=!3m1!4b1!4m5!3m4!1s0x3919635521ef50fd:0xefce891856c0c93d!8m2!3d31.6298423!4d74.8767316"
							)
						}
					/>{" "}
					Shop Number 8,10, Baba Deep Singh Market, Hall Bazar, Amritsar,
					Punjab, India, 143001
				</ContactItem>
				<ContactItem>
					<Phone
						style={{ marginRight: "10px" }}
						onClick={() => window.open("tel:+91 0183-2544444")}
					/>{" "}
					+91 0183-2544444
				</ContactItem>
				<ContactItem>
					<MailOutline
						style={{ marginRight: "10px" }}
						onClick={() => (window.location = "mailto:hsharma@mun.ca")}
					/>{" "}
					sbtelecom@gmail.com
				</ContactItem>
				<Payment src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCvzw1oEsG3c61TbLAJOzcFOFkN1IncB5EcZfwZCxYD1JjhQ3_uhdamgc-VoUUgMqCVzU&usqp=CAU"></Payment>
			</Right>
		</Container>
	);
};
//Exporting
export default Footer;
