import { useState } from 'react'
import { motion } from 'framer-motion'
import { initializeEvent } from '../services/firebaseService'

const BLIND_CODING_DATA = [
  { id: 1, name: "Siddhi Sarode", initials: "SS", score: 0 },
  { id: 2, name: "Arya Shetye", initials: "AS", score: 0 },
  { id: 3, name: "Kajal Patil", initials: "KP", score: 0 },
  { id: 4, name: "Rohit Meel", initials: "RM", score: 0 },
  { id: 5, name: "Abhishek Nimbalkar", initials: "AN", score: 0 },
  { id: 6, name: "Om Ghodekar", initials: "OG", score: 0 },
  { id: 7, name: "Nishta Patil", initials: "NP", score: 0 },
  { id: 8, name: "Nikita Lavange", initials: "NL", score: 0 },
  { id: 9, name: "Vinit Paratane", initials: "VP", score: 0 },
  { id: 10, name: "Prasanna Burli", initials: "PB", score: 0 },
  { id: 11, name: "Aditya Satav", initials: "AS", score: 0 },
  { id: 12, name: "Raj Jogawade", initials: "RJ", score: 0 },
  { id: 13, name: "Sarthak Kundale", initials: "SK", score: 0 },
  { id: 14, name: "Vedant Mhaske", initials: "VM", score: 0 },
  { id: 15, name: "Abhishek Jawale", initials: "AJ", score: 0 },
  { id: 16, name: "Sanskar Dhamale", initials: "SD", score: 0 },
  { id: 17, name: "Meghana Konde", initials: "MK", score: 0 },
  { id: 18, name: "Saurabh Sharma", initials: "SS", score: 0 },
  { id: 19, name: "Ayush Pawar", initials: "AP", score: 0 },
  { id: 20, name: "Zeeshan Altaf Jagirdar", initials: "ZA", score: 0 },
  { id: 21, name: "Bhavik Mahalle", initials: "BM", score: 0 },
  { id: 22, name: "Krrish Pardeshi", initials: "KP", score: 0 },
  { id: 23, name: "Sarthak Jadhav", initials: "SJ", score: 0 },
  { id: 24, name: "Abhishek Kalimath", initials: "AK", score: 0 },
  { id: 25, name: "Ruchita Suryawanshi", initials: "RS", score: 0 },
  { id: 26, name: "Shreyas Dambalkar", initials: "SD", score: 0 },
  { id: 27, name: "Sanket Devhare", initials: "SD", score: 0 },
  { id: 28, name: "Chaitanya Kulkarni", initials: "CK", score: 0 },
  { id: 29, name: "Adesh Phadtare", initials: "AP", score: 0 },
  { id: 30, name: "Prathamesh Devkar", initials: "PD", score: 0 }
]

const PROMPTVERSE_DATA = [
  { id: 1, name: "Sakshi Thombare", initials: "ST", score: 0 },
  { id: 2, name: "Steve Pinto", initials: "SP", score: 0 },
  { id: 3, name: "Saloni Khatal", initials: "SK", score: 0 },
  { id: 4, name: "Shital Godse", initials: "SG", score: 0 },
  { id: 5, name: "Varun Upadhye", initials: "VU", score: 0 },
  { id: 6, name: "Mansi Patil", initials: "MP", score: 0 },
  { id: 7, name: "Suraj Pingle", initials: "SP", score: 0 },
  { id: 8, name: "Vikas Gayke", initials: "VG", score: 0 },
  { id: 9, name: "Aryan Chavan", initials: "AC", score: 0 },
  { id: 10, name: "Raman Rajhans", initials: "RR", score: 0 },
  { id: 11, name: "Revati Mirapurkar", initials: "RM", score: 0 },
  { id: 12, name: "Soham Nemade", initials: "SN", score: 0 },
  { id: 13, name: "Om Pachpande", initials: "OP", score: 0 },
  { id: 14, name: "Anvi Shete", initials: "AS", score: 0 },
  { id: 15, name: "Arjun Sul", initials: "AS", score: 0 },
  { id: 16, name: "Jason Dennis", initials: "JD", score: 0 },
  { id: 17, name: "Kajal Karande", initials: "KK", score: 0 },
  { id: 18, name: "Amol Walzade", initials: "AW", score: 0 },
  { id: 19, name: "Arya Manalwar", initials: "AM", score: 0 },
  { id: 20, name: "Aditya Sahane", initials: "AS", score: 0 },
  { id: 21, name: "Sangaramsinh Deshmukh", initials: "SD", score: 0 },
  { id: 22, name: "Vishakha Unhale", initials: "VU", score: 0 },
  { id: 23, name: "Siddhi Sarode", initials: "SS", score: 0 },
  { id: 24, name: "Dipesh Ahire", initials: "DA", score: 0 },
  { id: 25, name: "Abhishek Ganesh Jadhav", initials: "AG", score: 0 },
  { id: 26, name: "Manas Gaikwad", initials: "MG", score: 0 },
  { id: 27, name: "Sahil Bhor", initials: "SB", score: 0 },
  { id: 28, name: "Adwait Bhalerao", initials: "AB", score: 0 },
  { id: 29, name: "Samiksha Raut", initials: "SR", score: 0 },
  { id: 30, name: "Shivani Ghavate", initials: "SG", score: 0 },
  { id: 31, name: "Ujjwal Dinesh Yadav", initials: "UD", score: 0 },
  { id: 32, name: "Piyush Sonawane", initials: "PS", score: 0 },
  { id: 33, name: "Nikhil Patil", initials: "NP", score: 0 },
  { id: 34, name: "Madhura Patil", initials: "MP", score: 0 },
  { id: 35, name: "Sarthak Jadhav", initials: "SJ", score: 0 },
  { id: 36, name: "Anand Jain", initials: "AJ", score: 0 },
  { id: 37, name: "Tanisha Dhopte", initials: "TD", score: 0 },
  { id: 38, name: "Raj Fulsundar", initials: "RF", score: 0 },
  { id: 39, name: "Ansh Pandey", initials: "AP", score: 0 },
  { id: 40, name: "Siddhant Birajdar", initials: "SB", score: 0 },
  { id: 41, name: "Laxmi Birajdar", initials: "LB", score: 0 },
  { id: 42, name: "Yash Sharma", initials: "YS", score: 0 },
  { id: 43, name: "Prathamesh Devkar", initials: "PD", score: 0 },
  { id: 44, name: "Bhushan Kshirsagar", initials: "BK", score: 0 },
  { id: 45, name: "Tyagi Jain", initials: "TJ", score: 0 },
  { id: 46, name: "Viraj Ohal", initials: "VO", score: 0 },
  { id: 47, name: "Suyog Sudhir Sawji", initials: "SS", score: 0 },
  { id: 48, name: "Vaishnavi More", initials: "VM", score: 0 },
  { id: 49, name: "Om Naidu", initials: "ON", score: 0 }
]

export default function InitializeDatabase() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleInitialize = async () => {
    setLoading(true)
    setMessage('')
    setError('')

    try {
      setMessage('⏳ Loading Blind Coding participants...')
      await initializeEvent('blindcoding', BLIND_CODING_DATA)
      setMessage('✅ Blind Coding loaded (30 participants)')

      setMessage('⏳ Loading Promptverse participants...')
      await initializeEvent('promptverse', PROMPTVERSE_DATA)
      setMessage('✅ Both events loaded! 79 participants total. Refreshing...')

      setTimeout(() => {
        location.reload()
      }, 1500)
    } catch (err) {
      console.error('Initialization error:', err)
      setError(`❌ Failed: ${err.message}`)
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: '#080C10' }}
    >
      <div
        className="w-full max-w-md p-8 rounded-lg border"
        style={{
          background: 'rgba(13,19,24,0.8)',
          borderColor: 'rgba(0,255,135,0.3)',
        }}
      >
        <h1 className="text-2xl font-bold mb-2" style={{ color: '#00FF87' }}>
          Initialize Database
        </h1>
        <p className="text-sm mb-6" style={{ color: '#A0AEC0' }}>
          Load all 79 participants (30 Blind Coding + 49 Promptverse)
        </p>

        {message && (
          <div
            className="p-4 mb-4 rounded text-sm"
            style={{
              background: 'rgba(0,255,135,0.1)',
              borderLeft: '3px solid #00FF87',
              color: '#00FF87',
            }}
          >
            {message}
          </div>
        )}

        {error && (
          <div
            className="p-4 mb-4 rounded text-sm"
            style={{
              background: 'rgba(255,0,0,0.1)',
              borderLeft: '3px solid #FF0000',
              color: '#FF6B6B',
            }}
          >
            {error}
          </div>
        )}

        <button
          onClick={handleInitialize}
          disabled={loading}
          className="w-full py-3 rounded font-bold transition"
          style={{
            background: loading ? '#334155' : '#00FF87',
            color: loading ? '#94A3B8' : '#080C10',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Loading...' : 'Initialize All Participants'}
        </button>
      </div>
    </motion.div>
  )
}
