import { UserProfile } from "@/components/UserProfile/UserProfile";
import { Suspense } from "react";

const UserPage = async () => {
  return (
    <Suspense fallback={<div>Loading user details...</div>}>
      <UserProfile userId="d47ffe3f-3b5a-430c-88a5-d4bcf4c875f1" />
    </Suspense>
  );
};

export default UserPage;
