import {
  Footer,
  Header,
  Worship,
  Pastor,
  ConnectGroup,
  HealthMain,
  Events,
  Prayer,
  Podcast,
  Tithe,
  SabbathSchool,
  WeeklyBulleting,
  Figuring,
  Review,
} from "../../Components/HOME";
import { Navigation } from "../../Components/Navigation";

export const Home = () => {
  return (
    <>
      <Navigation />
      <Header />
      <Worship />
      <Pastor />
      <ConnectGroup />
      <HealthMain />
      <Events />
      <Prayer />
      <Podcast />
      <Tithe />
      <SabbathSchool />
      <WeeklyBulleting />
      <Figuring />
      <Review />
      <Footer />
    </>
  );
};
