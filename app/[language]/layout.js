import NavbarComponent from "../components/NavbarComponent";

export default function SecondLayout({ children }) {
    return (
        <>
            <NavbarComponent></NavbarComponent>
            {children}
        </>
    );
}