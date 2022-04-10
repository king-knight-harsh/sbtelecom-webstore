// Importing the required libraries
import styled from "styled-components";

// Styled component for container
const Container = styled.div`
  height: 30px;
  background-color: teal;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
`;
// React announcement component
const Announcement = () => {
  return <Container>Super Deal! Free Shipping on Orders Over $50</Container>;
};
//Exporting
export default Announcement;
