import { useSession, signIn, signOut } from "next-auth/react";
export default function Welcome() {
  const { data: session } = useSession();
  const testfetch = async () => {
    console.log("sending data::");

    const response = await fetch("/api/mongodbapi", {
      method: "POST",
      body: JSON.stringify({ email: "asdf", name: "lmao" }),
      headers: {
        "content-Type": "application/json",
      },
    });
    const res = await response.json();
  };
  if (session) {
    const update = async () => {
      console.log("sending data::");

      const response = await fetch("/api/mongodbupdate", {
        method: "POST",
        body: JSON.stringify({ email: session.user.email, name: "lmao" }),
        headers: {
          "content-Type": "application/json",
        },
      });
      const res = await response.json();
    };
    return (
      <>
        Signed in as {session.user.email}
        <br />
        <br />
        <button onClick={() => signOut()}>Sign out</button>
        <br />
        <br />
        <input type="button" onClick={testfetch} value="FETCH" />
        <br />
        <br />
        <input type="button" onClick={update} value="UPDATE" />
      </>
    );
  }
  return (
    <>
      Not signed in
      <button onClick={() => signIn("google")}>Sign in</button>
      <br />
      <br />
      <input type="button" onClick={testfetch} value="FETCH" />
    </>
  );
}
