import { useSession, signIn, signOut } from "next-auth/react";
export default function Welcome() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
       
       
        Signed in as {session.user.email}<br />
        <button onClick={() => signOut()}>Sign out</button>
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