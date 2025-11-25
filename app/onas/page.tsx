import React from 'react'
import { AboutSection } from '@/components/about-section'

const ONasPage = () => {
  return (
    // Layout (Navbar/Footer) už je v app/layout.tsx, zde ho nepoužíváme.
    <div className="min-h-screen bg-gray-950 pt-10">
      <AboutSection />
    </div>
  )
}

export default ONasPage