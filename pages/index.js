import { Link } from "@nextui-org/react";
import ThemeSwitch from "../components/ThemeSwitch";
import Welcome from "../components/Welcome";

export default function Component() {
  
  return (
    <>
      <ThemeSwitch />
      <br />
      <br />

      <Welcome />
      <br />

      <Link href="/test"> test</Link>
      <br></br>
      <br></br>
      <Link href="/opa" > OPA</Link>      
      <br></br>
      <br></br>
      <Link href="/dashboard" > Dashboard</Link>
        
    </>
  );
}
