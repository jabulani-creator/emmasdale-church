import styled from "styled-components";

const Wrapper = styled.header`
  // background: var(--primary-500);
  height: calc(100vh - 80px);
  position: relative;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: linear-gradient(
      rgba(8, 49, 131, 0.3),
      rgba(8, 49, 131, 0.3)
    ),
    url("https://res.cloudinary.com/dw82gpxt3/image/upload/v1664442433/emmsadale-church/emmasdale_iu1siu.jpg");

  .HeroContainer {
    width: var(--fluid-width);
    margin: auto;
    color: var(--white);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    // background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.1));

    .HeroTitle {
      text-transform: uppercase;
      letter-spacing: var(--letter-spacing);
      line-height: var(--line-height);
    }

    .HeroPara {
      // font-size: 1em;
      width: 80%;
    }
  }
`;
export default Wrapper;
