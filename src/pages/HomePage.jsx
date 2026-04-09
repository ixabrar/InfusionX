import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
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
  state,
}) {
  const [scrollY, setScrollY] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSwitchEvent = (event) => {
    navigate(`/${event}`)
  }

  return (
    <div className="bg-bg text-text font-body">
      <Navbar scrollY={scrollY} />
      <Header />
      <HeroSection />
      <EventSwitcher currentEvent={currentEvent} onSwitchEvent={handleSwitchEvent} />
      <PodiumSection participants={participants} currentEvent={currentEvent} />
      <LeaderboardSection participants={participants} currentEvent={currentEvent} />
      <AdminButton />
      <Footer />
    </div>
  )
}
