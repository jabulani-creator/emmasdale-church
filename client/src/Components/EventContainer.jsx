import { useEffect } from "react";
import Wrapper from "../assets/wrappers/JobsContainer";
import { useAppContext } from "../context/appContext";
import { PageBtnContainer } from "./PageBtnContainer";
import Loading from "./Loading";
import { Posts } from "./Posts";

export const PostsContainer = () => {
  const {
    getEvents,
    events,
    isLoading,
    page,
    totalEvents,
    sort,
    search,
    numOfEventsPages,
  } = useAppContext();

  useEffect(() => {
    getEvents();
    // eslint-disable-next-line
  }, [search, sort, page]);

  if (isLoading) {
    return <Loading />;
  }
  if (events.length === 0) {
    return (
      <Wrapper>
        <h2>NO post to display</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {totalEvents} Events{events.length > 1 && "s"} found
      </h5>
      <div className="jobs">
        {events.map((post) => {
          return <Posts key={post._id} {...post} />;
        })}
      </div>
      {numOfpages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};
