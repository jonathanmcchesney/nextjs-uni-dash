import ErrorSuspenseWrapper from "../../components/ErrorSuspenseWrapper/ErrorSuspenseWrapper";
import { UserProfile } from "../../components/UserProfile/UserProfile";
import { currentlyLoggedInUserId } from "../../utils/constants";
import LoadingFallback from "../../components/LoadingFallback/LoadingFallback";

const UserPage = () => {
  return (
    <ErrorSuspenseWrapper
      fallback={<LoadingFallback text="Loading user details..." />}
      shouldDisplayLogout
    >
      <UserProfile userId={currentlyLoggedInUserId} />
    </ErrorSuspenseWrapper>
  );
};

export default UserPage;
