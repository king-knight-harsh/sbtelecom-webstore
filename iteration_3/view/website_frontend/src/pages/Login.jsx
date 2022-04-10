// Importing the required libraries
import { useState } from "react";
import styled from "styled-components";
import { login } from "../redux/apiCalls";
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
	border: 1px solid;
	border-radius: 20px;
	padding: 20px;
	width: 25%;
	background-color: white;
	${mobile({ width: "75%" })}
`;
// styled component to style the Title
const Title = styled.h1`
	font-size: 25px;
	font-weight: 700;
	display: flex;
	align-items: center;
	justify-content: center;
`;
// styled component to style the Form
const Form = styled.form`
	display: flex;
	flex-direction: column;
`;
// styled component to style the Input
const Input = styled.input`
	flex: 1;
	min-width: 40%;
	margin: 10px 0px;
	padding: 10px;
`;
// styled component to style the Button
const Button = styled.button`
	width: 40%;
	border: none;
	padding: 15px 20px;
	background-color: teal;
	color: white;
	cursor: pointer;
	margin-bottom: 10px;
    &:disabled{
        color:green;
        cursor:not-allowed;
    }
`;
// styled component to style the Error
const Error = styled.span`
  color: red;
`;
// React Login page
const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();
	const { isFetching, error } = useSelector((state) => state.user);

	const handleClick = async (e) => {
		e.preventDefault();
		await login(dispatch, { email, password });
        window.location.reload(false);
	};
	return (
		<Container>
			<Wrapper>
				<Title>SIGN IN</Title>
				<Form>
					<Input
						placeholder="email"
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Input
						placeholder="password"
						type="password"
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Button onClick={handleClick} disabled={isFetching}>
						LOGIN
					</Button>
					{error && <Error>Email and password did not matched, please try again</Error>}
				</Form>
			</Wrapper>
		</Container>
	);
};
//Exporting
export default Login;
