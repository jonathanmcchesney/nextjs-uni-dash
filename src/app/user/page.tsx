import { UserProfile } from "@/components/UserProfile/UserProfile";
import { Suspense } from "react";

const UserPage = async () => {
  return (
    <Suspense fallback={<div>Loading user details...</div>}>
      <UserProfile userId={"1"} />
    </Suspense>
  );
};

export default UserPage;
