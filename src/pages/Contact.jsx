import React from 'react'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'

export default function Contact() {
  return (
    <div className="min-h-screen bg-[#f0f2f5]">
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-3xl font-bold mb-6">Contact Production Office</h1>
        <p className="text-gray-600 mb-8">Have a question or need production support? Send us a message and we'll get back to you shortly.</p>

        <div className="bg-gray-50 rounded-xl p-8 shadow">
          <form className="grid grid-cols-1 gap-4">
            <label className="block">
              <span className="text-sm text-gray-700">Your name</span>
              <input className="mt-1 block w-full rounded-md border-gray-200 p-3" placeholder="Jane Doe" />
            </label>
            <label className="block">
              <span className="text-sm text-gray-700">Email</span>
              <input className="mt-1 block w-full rounded-md border-gray-200 p-3" placeholder="you@example.com" />
            </label>
            <label className="block">
              <span className="text-sm text-gray-700">Message</span>
              <textarea className="mt-1 block w-full rounded-md border-gray-200 p-3" rows={6} placeholder="How can we help?" />
            </label>
            <div className="flex justify-end">
              <button type="submit" className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-md">Send message</button>
            </div>
          </form>
        </div>

        <div className="mt-8 text-gray-600">
          <p><strong>Address:</strong> 123 Film Lane, Suite 100</p>
          <p><strong>Email:</strong> production@thedirector.example</p>
          <p><strong>Phone:</strong> +1 (555) 123-4567</p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
