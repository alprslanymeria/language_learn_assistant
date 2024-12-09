import FlagComponent from "./components/FlagComponent";
import InfoMessageComponent from "./components/InfoMessageComponent";
import NavbarComponent from "./components/NavbarComponent";

export default function Home() {
  return (
    <>
      <NavbarComponent></NavbarComponent>
      <InfoMessageComponent message="Please choose which language you would like to learn"></InfoMessageComponent>
      <FlagComponent></FlagComponent>
    </>
  );
}
