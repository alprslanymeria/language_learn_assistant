import FlagComponent from "./components/FlagComponent";
import InfoMessageComponent from "./components/InfoMessageComponent";
import NavbarComponent from "./components/NavbarComponent";
import { mitr } from "./layout";

export default function Home() {
  return (
    <>
      <NavbarComponent></NavbarComponent>
      <InfoMessageComponent message="Please choose which language you would like to learn"></InfoMessageComponent>
      <FlagComponent></FlagComponent>
      <div className="flex justify-center mt-4">
        <button
          className={` ${mitr.className} mt-20 bg-[#58CC02] text-white font-medium py-3 px-20 rounded-lg shadow-md shadow-[#58A700] hover:bg-[#58A700] transition-colors duration-300`}
        >
          BAŞLA
        </button>
      </div>
    </>
  );
}
