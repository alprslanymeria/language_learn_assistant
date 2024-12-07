import { markazi } from "../layout";

export default function InfoMessageComponent({message}) {
    return (
        <p className={`${markazi.className} px-4 mt-10 text-[#CA5656] text-2xl font-normal text-black text-center`}>{message}</p>
    );
}