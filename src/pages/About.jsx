import React from 'react'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'

export default function About() {
  return (
    <div className="min-h-screen bg-[#f0f2f5]">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl font-bold mb-4">About The Director</h1>
            <p className="text-gray-700 mb-6">
              We create extraordinary fashion experiences that blend creativity with technology. Our mission is to empower self-expression through thoughtful design and premium craftsmanship.
            </p>
            <ul className="space-y-3 text-gray-600">
              <li>• Founded by industry veterans</li>
              <li>• Sustainable materials and production</li>
              <li>• Community-driven collections</li>
            </ul>
          </div>
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img src="/images/hero_bg.jpg" alt="About" className="w-full h-full object-cover" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
