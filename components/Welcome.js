import { useSession, signIn, signOut } from "next-auth/react";
export default function Welcome() {
  const { data: session } = useSession();
  if (session) {
    const testfetch = async () => {
      console.log("sending data::");
      
      const response = await fetch("/api/mongodbapi", {
        method: "POST",
        body: JSON.stringify({"email": session.user.email }),
        headers: {
          "content-Type": "application/json",
        },
      });
      const res = await response.json();
    };
  
    return (
      <>
       
       
        Signed in as {session.user.email}<br />
        <button onClick={() => signOut()}>Sign out</button>

      <input type="button" onClick={testfetch} value="FETCH" />

      </>
    );
  }
  return (
    <>

      Not signed in
      <button onClick={() => signIn('google')}>Sign in</button>
    </>
  );
}
