import FlagComponent from "./components/FlagComponent";
import InfoMessageComponent from "./components/InfoMessageComponent";

export default function Home() {
  return (
    <>
      <InfoMessageComponent message="Please choose which language you would like to learn"></InfoMessageComponent>
      <FlagComponent></FlagComponent>
    </>
  );
}
