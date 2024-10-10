import { UserProfile } from "@/components/UserProfile/UserProfile";
import { currentlyLoggedInUserId } from "@/utils/constants";
import { Suspense } from "react";

const UserPage = async () => {
  return (
    <Suspense fallback={<div>Loading user details...</div>}>
      <UserProfile userId={currentlyLoggedInUserId} />
    </Suspense>
  );
};

export default UserPage;
