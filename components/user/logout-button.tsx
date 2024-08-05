import { logout } from "@/actions/logout";

const LogoutButton = () => {
  const signOut = () => {
    logout();
  };
  return (
    <button type="submit" onClick={signOut}>
      Signout
    </button>
  );
};

export default LogoutButton;
