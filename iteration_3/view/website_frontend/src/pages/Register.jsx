import styled from "styled-components";
import { mobile } from "../responsive";

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

const Wrapper = styled.div`
	width: 20%;
	padding: 20px;
	background-color: white;
	border-radius: 20px;
	${mobile({ width: "75%" })}
`;

const Title = styled.h1`
	font-size: 34px;
	font-weight: 900;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
`;

const Input = styled.input`
	border-radius: 5px;
	flex: 1;
	min-width: 40%;
	margin: 20px 10px 0px 0px;
	padding: 10px;
	
`;

const Agreement = styled.span`
	font-size: 12px;
	margin: 20px 0px;
`;

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

const Register = () => {
	return (
		<Container>
			<Wrapper>
				<Title>REGISTER</Title>
				<Form>
					<Input placeholder="First Name" />
					<Input placeholder="Last Name" />
					<Input placeholder="email" />
					<Input placeholder="password" />
					<Agreement>
						By creating an account, I consent to the processing of my personal
						data in accordance with the <b>PRIVACY POLICY</b>
					</Agreement>
					<Button>CREATE</Button>
				</Form>
			</Wrapper>
		</Container>
	);
};

export default Register;
