// Importing the required libraries
import { useState } from "react";
import styled from "styled-components";
import { register } from "../redux/apiCalls";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";

// styled component to style the Container
const Container = styled.div`
	width: 100vw;
	height: 100vh;
	background: linear-gradient(
			rgba(255, 255, 255, 0.5),
			rgba(255, 255, 255, 0.5)
		),
		url("https://images.pexels.com/photos/114979/pexels-photo-114979.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500")
			center;
	background-size: cover;
	display: flex;
	align-items: center;
	justify-content: center;
`;
// styled component to style the Wrapper
const Wrapper = styled.div`
	width: 20%;
	padding: 20px;
	background-color: white;
	border-radius: 20px;
	${mobile({ width: "75%" })}
`;
// styled component to style the Title
const Title = styled.h1`
	font-size: 34px;
	font-weight: 900;
	display: flex;
	align-items: center;
	justify-content: center;
`;
// styled component to style the Form
const Form = styled.form`
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
`;
// styled component to style the Input
const Input = styled.input`
	border-radius: 5px;
	flex: 1;
	min-width: 40%;
	margin: 20px 10px 0px 0px;
	padding: 10px;
`;
// styled component to style the Agreement
const Agreement = styled.span`
	font-size: 12px;
	margin: 20px 0px;
`;
// styled component to style the Button
const Button = styled.button`
	width: 100%;
	border-radius: 5px;
	border: none;
	padding: 15px 20px;
	background-color: teal;
	color: white;
	font-size: 24px;
	font-weight: 600;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
`;
// styled component to style the Error
const Error = styled.span`
	color: red;
`;
// React Register page
const Register = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const dispatch = useDispatch();
	const { isFetching, error } = useSelector((state) => state.user);

	const handleClick = async (e) => {
		e.preventDefault();
		await register(dispatch, { username, email, password });
		window.location.reload(false);
	};

	return (
		<Container>
			<Wrapper>
				<Title>REGISTER</Title>
				<Form>
					<Input
						placeholder="First Name"
						onChange={(e) => setUsername(e.target.value)}
					/>
					<Input
						placeholder="email"
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Input
						placeholder="password"
						type="password"
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Agreement>
						By creating an account, I consent to the processing of my personal
						data in accordance with the <b>PRIVACY POLICY</b>
					</Agreement>
					<Button onClick={handleClick} disabled={isFetching}>
						CREATE
					</Button>
					{error && <Error>Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!</Error>}
				</Form>
			</Wrapper>
		</Container>
	);
};
//Exporting
export default Register;
