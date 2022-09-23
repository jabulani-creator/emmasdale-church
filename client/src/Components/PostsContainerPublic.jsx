import { useEffect } from "react";
import Wrapper from "../assets/wrappers/JobsContainer";
import { useAppContext } from "../context/appContext";
import { PageBtnContainer } from "./PageBtnContainer";
import Loading from "./Loading";
import { PostsPublic } from "./PostsPublic";

export const PostsContainerPublic = () => {
  const {
    getPosts,
    posts,
    isLoading,
    page,
    totalPost,
    sort,
    search,
    numOfpages,
  } = useAppContext();

  useEffect(() => {
    getPosts();
    // eslint-disable-next-line
  }, [search, sort, page]);

  if (isLoading) {
    return <Loading />;
  }
  if (posts.length === 0) {
    return (
      <Wrapper>
        <h2>NO post to display</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {totalPost} Post{posts.length > 1 && "s"} found
      </h5>
      <div className="jobs">
        {posts.map((post) => {
          return <PostsPublic key={post._id} {...post} />;
        })}
      </div>
      {numOfpages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};
