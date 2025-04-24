
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/common/HeroSection";
import { Separator } from "@/components/ui/separator";

const PrivacyPolicy = () => {
  return (
    <Layout>
      <HeroSection
        title="Privacy Policy"
        subtitle="How we collect, use, and protect your information"
      />
      
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto prose">
          <h2>Privacy Policy for eventNexus</h2>
          <p className="text-gray-600">Last Updated: April 24, 2025</p>
          
          <p>
            At eventNexus, we respect your privacy and are committed to protecting your personal data. 
            This Privacy Policy explains how we collect, use, and safeguard your information when you use our platform.
          </p>
          
          <Separator className="my-6" />
          
          <h3>1. Information We Collect</h3>
          <p>We collect information that you provide directly to us, including:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Account information (name, email address, password)</li>
            <li>Profile information (job title, company, bio, profile picture)</li>
            <li>Payment information (processed securely through our payment partners)</li>
            <li>Event registrations and preferences</li>
            <li>Communications with us</li>
            <li>Survey responses and feedback</li>
          </ul>
          
          <p>We also collect certain information automatically, including:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Log information (IP address, browser type, pages visited)</li>
            <li>Device information</li>
            <li>Location information</li>
            <li>Cookies and similar technologies</li>
          </ul>
          
          <h3>2. How We Use Your Information</h3>
          <p>We use your information for various purposes, including to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Provide, maintain, and improve our services</li>
            <li>Process transactions and send related information</li>
            <li>Send administrative messages</li>
            <li>Respond to your comments and questions</li>
            <li>Provide customer service</li>
            <li>Send you marketing communications</li>
            <li>Personalize your experience</li>
            <li>Monitor and analyze trends and usage</li>
            <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
          </ul>
          
          <h3>3. Information Sharing</h3>
          <p>We may share your information with:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Service providers who perform services on our behalf</li>
            <li>Event organizers (limited information)</li>
            <li>Other users (based on your privacy settings)</li>
            <li>Business partners (with your consent)</li>
            <li>In response to legal requests</li>
            <li>In connection with a merger, sale, or acquisition</li>
          </ul>
          
          <h3>4. Your Choices</h3>
          <p>You have several choices regarding your information:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Account Information: You can update your account information through your profile settings</li>
            <li>Marketing Communications: You can opt out of receiving promotional emails</li>
            <li>Cookies: You can manage cookie preferences through your browser settings</li>
            <li>Data Access and Portability: You can request a copy of your data</li>
            <li>Data Deletion: You can request deletion of your account</li>
          </ul>
          
          <h3>5. Data Security</h3>
          <p>
            We implement appropriate security measures to protect your personal information from unauthorized 
            access, alteration, disclosure, or destruction. However, no method of transmission over the Internet 
            or electronic storage is 100% secure, so we cannot guarantee absolute security.
          </p>
          
          <h3>6. International Data Transfers</h3>
          <p>
            Your information may be transferred to and processed in countries other than your country of residence, 
            where privacy laws may be different. We ensure appropriate safeguards are in place to protect your information.
          </p>
          
          <h3>7. Children's Privacy</h3>
          <p>
            Our services are not intended for individuals under 16 years of age. We do not knowingly collect 
            personal information from children under 16.
          </p>
          
          <h3>8. Changes to This Privacy Policy</h3>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting 
            the new Privacy Policy on this page and updating the "Last Updated" date.
          </p>
          
          <h3>9. Contact Us</h3>
          <p>
            If you have questions about this Privacy Policy, please contact us at:
            <br />
            Email: privacy@eventnexus.com
            <br />
            Address: 123 Event Street, Suite 100, San Francisco, CA 94105
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
