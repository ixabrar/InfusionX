import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import HeroSection from '../components/HeroSection'
import EventSwitcher from '../components/EventSwitcher'
import PodiumSection from '../components/PodiumSection'
import LeaderboardSection from '../components/LeaderboardSection'
import AdminButton from '../components/AdminButton'
import Footer from '../components/Footer'

export default function HomePage({
  participants,
  currentEvent,
  onSwitchEvent,
}) {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="bg-bg text-text font-body">
      <Navbar scrollY={scrollY} />
      <Header />
      <HeroSection />
      <EventSwitcher currentEvent={currentEvent} onSwitchEvent={onSwitchEvent} />
      <PodiumSection participants={participants} currentEvent={currentEvent} />
      <LeaderboardSection participants={participants} currentEvent={currentEvent} />
      <AdminButton />
      <Footer />
    </div>
  )
}
