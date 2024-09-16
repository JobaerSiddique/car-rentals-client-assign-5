

const TermsAndConditions = () => {
    return (
        <div className="border border-cyan-500 rounded-3xl p-3 border-pulse">
          
    <div className="card glass w-full p-5">
        
  
  <div className="card-body">
      {/* Introduction */}
      <section className="my-10">
            <h1 className="lg:text-center underline-hover text-3xl font-bold font-mono">Introduction</h1>

            <p className="my-5 text-justify text-xl">
            <strong>Welcome to <span className="text-orange-600 font-bolds">Car Rentals House</span>. By using our services, you agree to comply with and be bound by the following terms and conditions. Please review these terms carefully. If you do not agree with these terms, you should not use our services.</strong>
            </p>
            </section>

            {/* Account */}
      <section  >
            <h1 className="lg:text-center underline-hover text-3xl font-bold font-mono">Account Registration</h1>

            <p className="my-5 text-justify text-xl">
            <strong>To access certain features of our services, you may be required to create an account. When registering for an account, you agree to provide accurate and complete information and to keep this information up-to-date. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</strong>
            </p>
            </section>

      <section  >
            <h1 className="lg:text-center underline-hover text-3xl font-bold font-mono">Use of Our Services</h1>

            <p className="my-5 text-justify text-xl">
            <strong>You agree to use our services only for lawful purposes and in accordance with these terms. You may not use our services:</strong>
            <ul className="list-disc pl-5 space-y-2 mx-10 my-5" >
                <li>In any way that violates any applicable national or international law or regulation.</li>
                <li>For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way by exposing them to inappropriate content or otherwise.</li>
                <li>To transmit, or procure the sending of, any advertising or promotional material without our prior written consent.</li>
                <li>To impersonate or attempt to impersonate the company, a company employee, another user, or any other person or entity.</li>
            </ul>
            </p>
            </section>

            {/* payments */}
            <section className="my-10">
            <h1 className="lg:text-center underline-hover text-3xl font-bold font-mono">Payments</h1>

            <p className="my-5 text-justify text-xl">
            <strong>If you make a purchase or pay for a service through our platform, you agree to provide valid payment information. You agree that all information you provide will be accurate, complete, and current. Payment processing is subject to the terms and conditions of our third-party payment processors. We are not responsible for any issues that arise from processing your payments.</strong>
            </p>
            </section>


            <section className="my-10">
            <h1 className="lg:text-center underline-hover text-3xl font-bold font-mono"> Intellectual Property Rights</h1>

            <p className="my-5 text-justify text-xl">
            <strong>All content, trademarks, service marks, logos, and graphics used in connection with our services are the property of <span className="text-orange-600 font-bolds">Car Rentals House</span> or its licensors and are protected by intellectual property laws. You may not copy, modify, or use our content without express permission.</strong>
            </p>
            </section>

            <section className="my-10">
            <h1 className="lg:text-center underline-hover text-3xl font-bold font-mono"> Privacy Policy</h1>

            <p className="my-5 text-justify text-xl">
            <strong>Your use of our services is also governed by our Privacy Policy, which is incorporated into these terms by reference. Please review our Privacy Policy to understand our practices regarding your personal information.</strong>
            </p>
            </section>
            <section className="my-10">
            <h1 className="lg:text-center underline-hover text-3xl font-bold font-mono"> Privacy Policy</h1>

            <p className="my-5 text-justify text-xl">
            <strong>In no event shall <span className="text-orange-600 font-bolds">Car Rentals House</span>, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from 
            </strong>
            <ul className="list-[upper-roman] mx-10 my-5">
                <li>your use of or inability to use the service;</li>
                <li>any unauthorized access to or use of our servers and/or any personal information stored therein.</li>
            </ul>
            </p>
            </section>


            <section className="my-10">
            <h1 className="lg:text-center underline-hover text-3xl font-bold font-mono"> Contact Us</h1>

            <p className="my-5 text-justify text-xl">
            <strong>If you have any questions or concerns about these Terms & Conditions, please contact us at [Contact Email] or visit our [Contact Page]
            </strong>

            </p>
            </section>
  </div>
</div>

            
        </div>
    );
};

export default TermsAndConditions;