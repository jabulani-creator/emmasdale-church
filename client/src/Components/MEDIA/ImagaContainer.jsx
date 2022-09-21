import { useEffect } from "react";
import Wrapper from "../../assets/wrappers/JobsContainer";
import Loading from "../../Components/Loading";
import ImageGallery from "./ImageGallery";
import { useAppContext } from "../../context/appContext";

const ImagaContainer = () => {
  const { getPhotos, images, isLoading } = useAppContext();

  useEffect(() => {
    getPhotos();
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  if (images.length === 0) {
    return (
      <Wrapper>
        <h2>NO Photos to display</h2>
      </Wrapper>
    );
  }
  return (
    <main>
      {/* <section className="search">
        <form className="search-form">
          <input type="text" placeholder="Search" className="form-inputS" />
          <button type="submit" className="submit-btnS">
            <FaSearch />
          </button>
        </form>
      </section> */}
      <section className="photos">
        <div className="photos-center">
          {images.map((photo) => {
            return <ImageGallery key={photo._id} {...photo} />;
          })}
        </div>
        {isLoading && <h2 className="loading">Loading...</h2>}
      </section>
    </main>
  );
};

export default ImagaContainer;