import { useAppContext } from "../../../context/appContext";
import { useEffect } from "react";
import Wrapper from "../../../assets/wrappers/Figuering";
import { Topic } from "./Topic";
import { PageBtnContainer } from "../../PageBtnContainer";

export const Figuring = () => {
  const { getPosts, posts, numOfpages } = useAppContext();

  useEffect(() => {
    getPosts();
    // eslint-disable-next-line
  }, []);
  return (
    <section className="section">
      <h1 className="title primary">still figuring it out? these may help</h1>
      <Wrapper>
        {posts.map((post) => {
          return <Topic key={post._id} {...post} />;
        })}
      </Wrapper>
      {numOfpages > 1 && <PageBtnContainer />}
    </section>
  );
};
