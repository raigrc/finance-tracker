import { signOut } from "next-auth/react";

const LogoutButton = () => {
  return (
    <button type="submit" onClick={() => signOut()}>
      Signout
    </button>
  );
};

export default LogoutButton;
