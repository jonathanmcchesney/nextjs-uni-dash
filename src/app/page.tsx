import { Suspense } from "react";

const Home = async () => {
  return (
    <div>
      <Suspense fallback={<div>Loading component...</div>}>
        <div>Home details</div>
      </Suspense>
    </div>
  );
};

export default Home;
