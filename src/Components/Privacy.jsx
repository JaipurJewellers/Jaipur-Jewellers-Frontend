import React, { useEffect } from "react";
import Header from "./Header";

const Privacy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Header color={"#FAFAFA"} />
      <div className="font-marcellus max-w-5xl mx-auto p-4 md:p-6 bg-white">
        <h1 className="text-2xl text-center md:text-3xl font-bold mb-4 md:mb-6 text-gray-800">
          Privacy Policy
        </h1>

        <div className="space-y-4 md:space-y-6 text-gray-700 text-sm md:text-base">
          <p>
            This Privacy Policy describes how Jaipur jwellers ("we", "us", or
            "our") collects, uses, and shares your personal information when you
            visit or make a purchase from our website.
          </p>

          <p>
            By accessing or using our website, you agree to the collection and
            use of information in accordance with this policy. We value your
            privacy and are committed to protecting your personal information.
          </p>
        </div>

        <div className="mt-6 md:mt-8">
          <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-gray-800 border-b pb-2">
            SECTION 1 - PERSONAL INFORMATION WE COLLECT
          </h2>
          <div className="space-y-3 md:space-y-4 text-gray-700 text-sm md:text-base">
            <p>
              When you visit the site, we automatically collect certain
              information about your device, including information about your
              web browser, IP address, time zone, and some of the cookies that
              are installed on your device.
            </p>

            <p>
              Additionally, as you browse the site, we collect information about
              the individual web pages or products that you view, what websites
              or search terms referred you to the site, and information about
              how you interact with the site. We refer to this
              automatically-collected information as "Device Information."
            </p>

            <p>
              We collect Device Information using the following technologies:
            </p>

            <ul className="list-disc pl-4 md:pl-6 space-y-1 md:space-y-2">
              <li>
                "Cookies" are data files that are placed on your device and
                often include an anonymous unique identifier.
              </li>
              <li>
                "Log files" track actions occurring on the site, and collect
                data including your IP address, browser type, Internet service
                provider, referring/exit pages, and date/time stamps.
              </li>
              <li>
                "Web beacons," "tags," and "pixels" are electronic files used to
                record information about how you browse the site.
              </li>
            </ul>

            <p>
              When you make a purchase or attempt to make a purchase through the
              site, we collect certain information from you, including your
              name, billing address, shipping address, payment information
              (including credit card numbers), email address, and phone number.
              We refer to this information as "Order Information."
            </p>

            <p>
              When we talk about "Personal Information" in this Privacy Policy,
              we are talking both about Device Information and Order
              Information.
            </p>
          </div>
        </div>

        <div className="mt-6 md:mt-8">
          <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-gray-800 border-b pb-2">
            SECTION 2 - HOW WE USE YOUR PERSONAL INFORMATION
          </h2>
          <div className="space-y-3 md:space-y-4 text-gray-700 text-sm md:text-base">
            <p>
              We use the Order Information that we collect generally to fulfill
              any orders placed through the site (including processing your
              payment information, arranging for shipping, and providing you
              with invoices and/or order confirmations).
            </p>

            <p>Additionally, we use this Order Information to:</p>
            <ul className="list-disc pl-4 md:pl-6 space-y-1 md:space-y-2">
              <li>Communicate with you;</li>
              <li>Screen our orders for potential risk or fraud;</li>
              <li>
                When in line with the preferences you have shared with us,
                provide you with information or advertising relating to our
                products or services.
              </li>
            </ul>

            <p>
              We use the Device Information that we collect to help us screen
              for potential risk and fraud (in particular, your IP address), and
              more generally to improve and optimize our site (for example, by
              generating analytics about how our customers browse and interact
              with the site, and to assess the success of our marketing and
              advertising campaigns).
            </p>
          </div>
        </div>

        <div className="mt-6 md:mt-8">
          <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-gray-800 border-b pb-2">
            SECTION 3 - SHARING YOUR PERSONAL INFORMATION
          </h2>
          <div className="space-y-3 md:space-y-4 text-gray-700 text-sm md:text-base">
            <p>
              We share your Personal Information with third parties to help us
              use your Personal Information, as described above. For example, we
              use payment processors to power our online store. We also use
              Google Analytics to help us understand how our customers use the
              site.
            </p>

            <p>
              We may also share your Personal Information to comply with
              applicable laws and regulations, to respond to a subpoena, search
              warrant or other lawful request for information we receive, or to
              otherwise protect our rights.
            </p>
          </div>
        </div>

        <div className="mt-6 md:mt-8">
          <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-gray-800 border-b pb-2">
            SECTION 4 - BEHAVIOURAL ADVERTISING
          </h2>
          <div className="space-y-3 md:space-y-4 text-gray-700 text-sm md:text-base">
            <p>
              As described above, we use your Personal Information to provide
              you with targeted advertisements or marketing communications we
              believe may be of interest to you. For more information about how
              targeted advertising works, you can visit the Network Advertising
              Initiative's ("NAI") educational page at
              http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work.
            </p>

            <p>You can opt out of targeted advertising by:</p>
            <ul className="list-disc pl-4 md:pl-6 space-y-1 md:space-y-2">
              <li>FACEBOOK - https://www.facebook.com/settings/?tab=ads</li>
              <li>GOOGLE - https://www.google.com/settings/ads/anonymous</li>
              <li>
                BING -
                https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads
              </li>
            </ul>

            <p className="break-words">
              Additionally, you can opt out of some of these services by
              visiting the Digital Advertising Alliance's opt-out portal at:
              http://optout.aboutads.info/.
            </p>
          </div>
        </div>

        <div className="mt-6 md:mt-8">
          <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-gray-800 border-b pb-2">
            SECTION 5 - DO NOT TRACK
          </h2>
          <div className="space-y-3 md:space-y-4 text-gray-700 text-sm md:text-base">
            <p>
              Please note that we do not alter our site's data collection and
              use practices when we see a Do Not Track signal from your browser.
            </p>
          </div>
        </div>

        <div className="mt-6 md:mt-8">
          <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-gray-800 border-b pb-2">
            SECTION 6 - YOUR RIGHTS
          </h2>
          <div className="space-y-3 md:space-y-4 text-gray-700 text-sm md:text-base">
            <p>
              If you are a European resident, you have the right to access
              personal information we hold about you and to ask that your
              personal information be corrected, updated, or deleted. If you
              would like to exercise this right, please contact us through the
              contact information below.
            </p>

            <p>
              Additionally, if you are a European resident we note that we are
              processing your information in order to fulfill contracts we might
              have with you (for example if you make an order through the site),
              or otherwise to pursue our legitimate business interests listed
              above. Additionally, please note that your information will be
              transferred outside of Europe, including to India and other
              countries.
            </p>
          </div>
        </div>

        <div className="mt-6 md:mt-8">
          <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-gray-800 border-b pb-2">
            SECTION 7 - DATA RETENTION
          </h2>
          <div className="space-y-3 md:space-y-4 text-gray-700 text-sm md:text-base">
            <p>
              When you place an order through the site, we will maintain your
              Order Information for our records unless and until you ask us to
              delete this information.
            </p>
          </div>
        </div>

        <div className="mt-6 md:mt-8">
          <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-gray-800 border-b pb-2">
            SECTION 8 - CHANGES
          </h2>
          <div className="space-y-3 md:space-y-4 text-gray-700 text-sm md:text-base">
            <p>
              We may update this privacy policy from time to time in order to
              reflect, for example, changes to our practices or for other
              operational, legal or regulatory reasons.
            </p>
          </div>
        </div>

        <div className="mt-6 md:mt-8">
          <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-gray-800 border-b pb-2">
            SECTION 9 - SECURITY
          </h2>
          <div className="space-y-3 md:space-y-4 text-gray-700 text-sm md:text-base">
            <p>
              To protect your personal information, we take reasonable
              precautions and follow industry best practices to make sure it is
              not inappropriately lost, misused, accessed, disclosed, altered or
              destroyed.
            </p>

            <p>
              If you provide us with your credit card information, the
              information is encrypted using secure socket layer technology
              (SSL) and stored with encryption. Although no method of
              transmission over the Internet or electronic storage is 100%
              secure, we follow all PCI-DSS requirements and implement
              additional generally accepted industry standards.
            </p>
          </div>
        </div>

        <div className="mt-6 md:mt-8">
          <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-gray-800 border-b pb-2">
            SECTION 10 - AGE OF CONSENT
          </h2>
          <div className="space-y-3 md:space-y-4 text-gray-700 text-sm md:text-base">
            <p>
              By using this site, you represent that you are at least the age of
              majority in your state or province of residence, or that you are
              the age of majority in your state or province of residence and you
              have given us your consent to allow any of your minor dependents
              to use this site.
            </p>
          </div>
        </div>

        <div className="mt-6 md:mt-8">
          <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-gray-800 border-b pb-2">
            SECTION 11 - CONTACT INFORMATION
          </h2>
          <div className="space-y-3 md:space-y-4 text-gray-700 text-sm md:text-base">
            <p>
              If you have any questions about our Privacy Policy, the practices
              of this site, or your dealings with this site, please contact us
              at:
            </p>

            <p>
              Jaipur jwellers
              <br />
              Email:{" "}
              <a
                href="mailto:astronaarad@gmail.com"
                className="text-blue-600 hover:text-blue-800"
              >
                jaipurjewellers.online@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Privacy;
