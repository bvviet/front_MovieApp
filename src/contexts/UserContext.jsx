import { createContext } from "react";
import { useUser } from "@clerk/clerk-react";

const userContext = createContext();

const UserProvider = ({ children }) => {
  const { isSignedIn, user, isLoaded } = useUser();

  if (!isLoaded) {
    // Handle loading state however you like
    return null;
  }

  return <UserProvider value={(user, isSignedIn)}>{children}</UserProvider>;
};
export { userContext, UserProvider };
