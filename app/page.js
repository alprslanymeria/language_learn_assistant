"use client"

// COMPONENTS
import InfoMessageComponent from "@/components/InfoMessageComponent";
import FlagComponent from "@/components/FlagComponent";

export default function Home() {

  return (
    <>
        <InfoMessageComponent message="Please choose which language you would like to learn"></InfoMessageComponent>
        <FlagComponent></FlagComponent>
    </>
  );
}