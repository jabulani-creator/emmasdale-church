import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 150px;
  width: 150px;
  margin-bottom: 20px;
  //   background-color: red;

  .ImageContainer {
    flex: 1;
    width: 100px;
    // height: 30px;
    margin: 5px auto;
  }

  .Details {
    flex: 1;
    height: 80px;
    width: 80x;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .con {
      font-size: 60%;
      color: var(--primary-500);
    }
  }
`;
export default Wrapper;
