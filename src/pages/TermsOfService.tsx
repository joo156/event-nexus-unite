
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/common/HeroSection";
import { Separator } from "@/components/ui/separator";

const TermsOfService = () => {
  return (
    <Layout>
      <HeroSection
        title="Terms of Service"
        subtitle="Please read these terms carefully before using our platform"
      />
      
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto prose">
          <h2>Terms of Service</h2>
          <p className="text-gray-600">Last Updated: April 24, 2025</p>
          
          <p>
            Welcome to eventNexus! These Terms of Service ("Terms") govern your access to and use of 
            the eventNexus platform, including our website, services, and applications (collectively, the "Services").
          </p>
          
          <p>
            By accessing or using our Services, you agree to be bound by these Terms. If you disagree with 
            any part of the Terms, you may not access the Services.
          </p>
          
          <Separator className="my-6" />
          
          <h3>1. Account Registration</h3>
          <p>
            To access certain features of our Services, you may be required to register for an account. 
            When you register, you agree to provide accurate and complete information and to keep this 
            information updated. You are responsible for safeguarding your account credentials and for 
            all activities that occur under your account.
          </p>
          
          <h3>2. User Conduct</h3>
          <p>You agree not to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Use the Services in any way that violates applicable laws or regulations</li>
            <li>Impersonate any person or entity or falsely state your affiliation</li>
            <li>Interfere with or disrupt the Services or servers or networks connected to the Services</li>
            <li>Harvest or collect user information without permission</li>
            <li>Use the Services to send unsolicited communications</li>
            <li>Attempt to gain unauthorized access to any portion of the Services</li>
            <li>Use the Services for any harmful, fraudulent, or illegal purpose</li>
          </ul>
          
          <h3>3. Content</h3>
          <p>
            Our Services allow you to post, link, store, share and otherwise make available certain information, 
            text, graphics, videos, or other material ("Content"). You are responsible for the Content that you 
            post, including its legality, reliability, and appropriateness.
          </p>
          
          <p>
            By posting Content, you grant us the right to use, modify, publicly perform, publicly display, 
            reproduce, and distribute such Content on and through the Services. You retain any and all of 
            your rights to any Content you submit, post or display on or through the Services.
          </p>
          
          <h3>4. Intellectual Property</h3>
          <p>
            The Services and their original content, features, and functionality are and will remain the 
            exclusive property of eventNexus and its licensors. The Services are protected by copyright, 
            trademark, and other laws of both the United States and foreign countries. Our trademarks and 
            trade dress may not be used in connection with any product or service without our prior written consent.
          </p>
          
          <h3>5. Event Registration and Payments</h3>
          <p>
            When you register for a paid event, you agree to pay all fees associated with the event. 
            We use third-party payment processors and you agree to their terms of service when making payments.
          </p>
          
          <p>
            Refunds are subject to the refund policy specified for each event. Generally, refunds are available 
            if requested at least 48 hours before the event starts, unless otherwise stated.
          </p>
          
          <h3>6. Termination</h3>
          <p>
            We may terminate or suspend your account and bar access to the Services immediately, without prior 
            notice or liability, under our sole discretion, for any reason whatsoever, including but not limited 
            to a breach of the Terms.
          </p>
          
          <h3>7. Limitation of Liability</h3>
          <p>
            In no event shall eventNexus, nor its directors, employees, partners, agents, suppliers, or affiliates, 
            be liable for any indirect, incidental, special, consequential or punitive damages, including without 
            limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access 
            to or use of or inability to access or use the Services.
          </p>
          
          <h3>8. Changes</h3>
          <p>
            We reserve the right to modify or replace these Terms at any time. If a revision is material, 
            we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes 
            a material change will be determined at our sole discretion.
          </p>
          
          <h3>9. Governing Law</h3>
          <p>
            These Terms shall be governed and construed in accordance with the laws of the United States, 
            without regard to its conflict of law provisions.
          </p>
          
          <h3>10. Contact Us</h3>
          <p>
            If you have any questions about these Terms, please contact us at:
            <br />
            Email: legal@eventnexus.com
            <br />
            Address: 123 Event Street, Suite 100, San Francisco, CA 94105
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default TermsOfService;
