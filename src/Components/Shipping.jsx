import React, { useEffect } from "react";
import Header from "./Header";

const Shipping = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header color={"#FAFAFA"} />
      <div className="font-marcellus min-h-screen max-w-5xl mx-auto p-4 md:p-6 bg-white">
        <h1 className="text-2xl text-center md:text-3xl font-bold mb-4 md:mb-6 text-gray-800">
          Shipping Policy
        </h1>

        <div className="space-y-4 md:space-y-6 text-gray-700 text-sm md:text-base">
          <section>
            <h2 className="font-semibold text-lg mb-1">Shipping Information</h2>
            <p>
              We offer free shipping on all orders placed through our website. All products are shipped through our trusted courier partners, ensuring safe and reliable delivery across pan India.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-1">Delivery Timelines</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Processing Time: 24-48 hours (Orders placed on weekends/holidays will be processed next business day)</li>
              <li>Minimum Delivery Time: 3 business days</li>
              <li>Maximum Delivery Time: 7 business days</li>
            </ul>
            <p className="mt-2">
              These timelines may vary depending on:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Delivery location accessibility</li>
              <li>Customs clearance (for international shipments)</li>
              <li>Unforeseen logistical delays</li>
              <li>Force majeure circumstances</li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-1">Tracking & Updates</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Order confirmation email immediately after purchase</li>
              <li>Shipping confirmation with tracking number once dispatched</li>
              <li>Real-time SMS updates about your shipment status</li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-1">Important Notes</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Delivery times are calculated from date of shipment dispatch</li>
              <li>Business days exclude weekends and public holidays</li>
              <li>Please ensure accurate address details - incorrect information may lead to delivery delays</li>
              <li>Signature may be required at time of delivery</li>
            </ul>
          </section>

          <section>
            <p>
              For any delivery-related queries, contact our support team at{" "}
              <a href="mailto:jaipurjewellers.online@gmail.com" className="text-blue-600 underline">jaipurjewellers.online@gmail.com</a>{" "}
              or call <a href="tel:+918076820738" className="text-blue-600 underline">+91 88104 51624</a>.
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default Shipping;
