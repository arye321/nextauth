import { Link } from "@nextui-org/react";
import { useSession } from "next-auth/react";
function Checklogin(){
  const { data: session, status } = useSession();
  // console.log({ status });
  if (status==="authenticated") {
    return (
      <>
        <h2>{session.user.email}</h2>
      </>
    );
  }
  else if(status==="unauthenticated"){
    return (
      <>
        <h1>Please log in</h1>{" "}
      </>
    );
  }
  return (
    <>
      <h1>Loading...</h1>{" "}
    </>
  );
}
export default function Test() {
  return(
    <><Checklogin />

    <Link href="/" > Home</Link>
    </>
    
  );
}
