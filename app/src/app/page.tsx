'use client';

import { ArrowRight, BarChart3, Zap, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import "./globals.css";
export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-black">HousePriceAI</div>
          <div className="hidden md:flex space-x-8">
            <Link href="#features" className="text-black hover:text-black-400 transition-colors">Features</Link>
            <Link href="#how-it-works" className="text-black hover:text-black-400 transition-colors">How It Works</Link>
            <Link href="#testimonials" className="text-black hover:text-black-400 transition-colors">Testimonials</Link>
          </div>
          <Link 
            href="/predict" 
            className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors text-sm md:text-base"
          >
            Try Now
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 md:py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Smart Home Price Predictions
        </h1>
        <p className="text-xl text-black mb-12 max-w-3xl mx-auto">
          Get accurate home price estimates powered by AI. Make informed decisions with our advanced prediction model.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            href="/predict" 
            className="bg-black text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
          >
            Get Started <ArrowRight size={20} />
          </Link>
          <a 
            href="#features"
            className="border-2 border-black text-black px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
          >
            Learn More
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-black">Why Choose Our Prediction Model</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: 'AI-Powered',
                description: 'Leveraging advanced machine learning algorithms for precise price estimations.',
                icon: <BarChart3 className="w-8 h-8 text-black mb-4" />
              },
              {
                title: 'Instant Results',
                description: 'Get accurate predictions in seconds with our real-time analysis.',
                icon: <Zap className="w-8 h-8 text-black mb-4" />
              },
              {
                title: 'Easy to Use',
                description: 'Simple interface that makes getting price predictions a breeze.',
                icon: <CheckCircle className="w-8 h-8 text-black mb-4" />
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl hover:shadow-lg transition-all duration-300 border border-gray-200">
                <div className="flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">{feature.title}</h3>
                <p className="text-black text-center">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-black">How It Works</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {[
                {
                  step: '1',
                  title: 'Enter Property Details',
                  description: 'Fill in basic information about your property including area, location, and features.'
                },
                {
                  step: '2',
                  title: 'AI Analysis',
                  description: 'Our advanced algorithms analyze the data against current market trends and comparable properties.'
                },
                {
                  step: '3',
                  title: 'Get Your Estimate',
                  description: 'Receive an accurate price prediction instantly with confidence intervals.'
                }
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-black font-bold">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-black">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of satisfied users who trust our AI for accurate home price predictions.
          </p>
          <Link 
            href="/predict" 
            className="inline-flex items-center justify-center bg-white text-black px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-100 transition-colors gap-2"
          >
            Try It Now <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="text-2xl font-bold text-white mb-2">HousePriceAI</div>
              <p className="text-gray-400">Accurate home price predictions powered by AI</p>
            </div>
            <div className="flex space-x-6">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} HousePriceAI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
