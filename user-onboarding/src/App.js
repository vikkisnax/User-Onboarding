import './App.css';
import Form from './Components/Form';
import styled from 'styled-components';

//STRETCH - styling
const WrapperDiv = styled.div`
display: flex;
flex-direction: column;
width: 90%;
max-width: 300px;
margin: 0 auto;
`;

function App() {
  return (
    <WrapperDiv>
      <div className="App">
        <Form />
      </div>
    </WrapperDiv>
  );
}

export default App;
