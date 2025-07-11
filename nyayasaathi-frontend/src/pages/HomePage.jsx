// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ChatBubbleLeftRightIcon, DocumentTextIcon, ScaleIcon } from '@heroicons/react/24/outline';

const Feature = ({ icon, title, description }) => (
  <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md">
    {icon}
    <h3 className="mt-4 text-xl font-bold text-brand-dark">{title}</h3>
    <p className="mt-2 text-gray-600">{description}</p>
  </div>
);

const HomePage = () => {
  return (
    <div className="bg-brand-light">
      {/* Header */}
      <header className="py-4 px-8 flex justify-between items-center shadow-sm">
        <h1 className="text-3xl font-bold text-brand-primary">Nyaya Saathi</h1>
        <Link to="/login" className="bg-brand-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-brand-secondary transition-colors">
          Login
        </Link>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-24 text-center">
        <h2 className="text-5xl font-extrabold text-brand-dark">
          Legal Help, Now in Your Language.
        </h2>
        <p className="mt-6 text-xl text-gray-700 max-w-3xl mx-auto">
          Nyaya Saathi helps you prepare legal and government paperwork through simple voice conversations.
        </p>
        <Link to="/register" className="mt-10 inline-block bg-brand-primary text-white font-bold text-lg py-4 px-10 rounded-lg shadow-lg hover:bg-brand-secondary transition-transform transform hover:scale-105">
          Get Started for Free
        </Link>
      </main>

      {/* How it works Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-brand-dark mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-10">
            <Feature
              icon={<ChatBubbleLeftRightIcon className="w-16 h-16 text-brand-primary" />}
              title="Speak Your Issue"
              description="Simply tell us your problem in your own words. No legal knowledge required."
            />
            <Feature
              icon={<DocumentTextIcon className="w-16 h-16 text-brand-primary" />}
              title="Documents Prepared"
              description="We instantly generate applications, affidavits, and other documents from your conversation."
            />
            <Feature
              icon={<ScaleIcon className="w-16 h-16 text-brand-primary" />}
              title="Get the Right Help"
              description="Solve issues with Aadhaar, pensions, land, or fraud. Escalate to local experts when needed."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500">
        <p>© {new Date().getFullYear()} Nyaya Saathi. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;