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
            We are not offering any refunds.
For exception case, once the refund is approved, it will take 7 business days to credit the amount to the customer's bank account.
          </p>
        </div>
      </div>
    </>
  );
};

export default Refund;
