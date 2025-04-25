import React, {useEffect} from "react";
import Header from "./Header";

const Refund = () => {
   useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  return (
    <>
      <Header color={"#FAFAFA"} />
      <div className="font-marcellus min-h-screen max-w-5xl mx-auto p-4 md:p-6 bg-white">
        <h1 className="text-2xl text-center md:text-3xl font-bold mb-4 md:mb-6 text-gray-800">
          Refund / Return Policy
        </h1>

        <div className="text-center space-y-4 md:space-y-6 text-gray-700 text-sm md:text-base">
          <p>
           Return Policy: As we have jewelleries we are not offering any return policy and also exchanging policy. <br></br>
           Refund Policy: Once the refund is approved it will take 5-7 working days to credit to the original payment method.
          </p>
        </div>
      </div>
    </>
  );
};

export default Refund;
