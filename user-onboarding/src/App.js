import './App.css';
import Form from './Components/Form';
import styled from 'styled-components';

//STRETCH - styling
const WrapperDiv = styled.div`
  background: papayawhip;
  width: 100%;
  height: 100vh;
  padding-top: 40px;
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
