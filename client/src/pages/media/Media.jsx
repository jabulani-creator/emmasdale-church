import { PageHero } from "../../Components/GLOBAL";
import { Footer, ImagaContainer, MediaSearch } from "../../Components/MEDIA";
import { Navigation } from "../../Components/Navigation";

export const Media = () => {
  return (
    <>
      <Navigation />
      <PageHero title="MEDIA" />
      <MediaSearch />
      <ImagaContainer />
      <Footer />
    </>
  );
};
