// Importing the required libraries
import { ShoppingCartOutlined } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import Badge from "@material-ui/core/Badge";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

// styled component to style the Container
const Container = styled.div`
	height: 60px;
	${mobile({ height: " 60px" })}
`;
// styled component to style the Wrapper
const Wrapper = styled.div`
	padding: 10px 20px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	${mobile({ padding: "10px 0px" })}
`;
// styled component to style the Left
const Left = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
`;
// styled component to style the Language
const Language = styled.span`
	font-size: 14px;
	cursor: pointer;
	${mobile({ display: "none" })}
`;

// styled component to style the Center
const Center = styled.div`
	flex: 1;
	text-align: center;
`;
// styled component to style the Logo
const Logo = styled.h1`
	font-weight: bold;
	color: black;
	font-weight: 600;
	${mobile({ fontSize: "18px" })}
`;
// styled component to style the Right
const Right = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	${mobile({ justifyContent: "center", flex: 2 })}
`;
// styled component to style the MenuItem
const MenuItem = styled.div`
	color: black;
	font-size: 14px;
	font-weight: 600;
	cursor: pointer;
	margin-left: 25px;
	border-radius: 5px;
	${mobile({ fontSize: "10px", marginLeft: "10px" })}
`;
// styled component to style the LogoutButton
const LogoutButton = styled.div`
	color: black;
	font-size: 14px;
	font-weight: 600;
	cursor: pointer;
	margin-left: 25px;
	border-radius: 5px;
	${mobile({ fontSize: "10px", marginLeft: "10px" })}
`;
// React Category Navbar component
const Navbar = () => {
	// using the persistent storage in the browser to get username
	let user = JSON.parse(localStorage.getItem("persist:root"))?.user;
	const currentUser = user && JSON.parse(user).currentUser;
	const history = useHistory();
	const quantity = useSelector((state) => state.cart.quantity);

	async function logoutUser() {
		await localStorage.clear();
		history.push("/");
		window.location.reload(false);
	}

	return (
		<Container>
			<Wrapper>
				{/* Left side of the navbar  */}
				<Left>
					<Language>En</Language>
				</Left>
				{/* Center side of the navbar  */}
				<Center>
					<Link to={`/`} style={{ textDecoration: "none" }}>
						<Logo>S.B. TELECOM</Logo>
					</Link>
				</Center>
				{/* Right side of the navbar  */}
				<Right>
					{/* To show button only if the user is not logged in  */}
					{currentUser ? null : (
						<Link to={`/register`} style={{ textDecoration: "none" }}>
							<MenuItem>REGISTER</MenuItem>
						</Link>
					)}
					{/* To show button only if the user is not logged in*/}
					{currentUser ? null : (
						<Link to={`/login`} style={{ textDecoration: "none" }}>
							<MenuItem>LOG IN</MenuItem>
						</Link>
					)}
					{/* button to be displayed after the user is logged in */}
					{currentUser ? (
						<MenuItem>
							WELCOME {currentUser.username.toString().toUpperCase()}
						</MenuItem>
					) : null}
					{/* button to be displayed after the user is logged in */}
					{currentUser ? (
						<LogoutButton onClick={() => logoutUser()}>LOGOUT</LogoutButton>
					) : null}
					{/* Linked to the cart  */}
					<Link to={`/cart`} style={{ textDecoration: "none" }}>
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
//Exporting
export default Navbar;
