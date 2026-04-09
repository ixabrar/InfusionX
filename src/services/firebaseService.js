import { db } from '../config/firebase'
import { ref, get, set, update, remove, onValue } from 'firebase/database'

/**
 * Get all participants for an event
 * @param {string} event - 'blindcoding' or 'promptverse'
 * @returns {Promise<array>}
 */
export const getParticipants = async (event) => {
  try {
    const dbRef = ref(db, `participants/${event}`)
    const snapshot = await get(dbRef)
    if (snapshot.exists()) {
      const data = snapshot.val()
      return Object.values(data).sort((a, b) => b.score - a.score)
    }
    return []
  } catch (error) {
    console.error('Error getting participants:', error)
    return []
  }
}

/**
 * Subscribe to real-time participant updates
 * @param {string} event - 'blindcoding' or 'promptverse'
 * @param {function} callback - Called whenever data changes
 */
export const subscribeToParticipants = (event, callback) => {
  try {
    const dbRef = ref(db, `participants/${event}`)
    return onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val()
        const sorted = Object.values(data).sort((a, b) => b.score - a.score)
        callback(sorted)
      } else {
        callback([])
      }
    })
  } catch (error) {
    console.error('Error subscribing to participants:', error)
  }
}

/**
 * Add a new participant
 * @param {string} event - 'blindcoding' or 'promptverse'
 * @param {string} name - Participant name
 * @returns {Promise<object>}
 */
export const addParticipant = async (event, name) => {
  try {
    const initials = name
      .split(' ')
      .slice(0, 2)
      .map(word => word.charAt(0).toUpperCase())
      .join('')

    const participantId = Date.now().toString()
    const newParticipant = {
      id: participantId,
      name: name.trim(),
      initials: initials || name.charAt(0).toUpperCase(),
      score: 0,
    }

    const dbRef = ref(db, `participants/${event}/${participantId}`)
    await set(dbRef, newParticipant)
    return newParticipant
  } catch (error) {
    console.error('Error adding participant:', error)
    throw error
  }
}

/**
 * Update participant score
 * @param {string} event - 'blindcoding' or 'promptverse'
 * @param {string} participantId - ID of participant
 * @param {number} newScore - New score
 */
export const updateScore = async (event, participantId, newScore) => {
  try {
    const dbRef = ref(db, `participants/${event}/${participantId}/score`)
    await set(dbRef, Math.max(0, newScore))
  } catch (error) {
    console.error('Error updating score:', error)
    throw error
  }
}

/**
 * Reset all points to zero for an event
 * @param {string} event - 'blindcoding' or 'promptverse'
 */
export const resetAllPoints = async (event) => {
  try {
    const dbRef = ref(db, `participants/${event}`)
    const snapshot = await get(dbRef)
    if (snapshot.exists()) {
      const data = snapshot.val()
      for (const key in data) {
        await set(ref(db, `participants/${event}/${key}/score`), 0)
      }
    }
  } catch (error) {
    console.error('Error resetting points:', error)
    throw error
  }
}

/**
 * Remove a participant
 * @param {string} event - 'blindcoding' or 'promptverse'
 * @param {string} participantId - ID of participant to remove
 */
export const removeParticipant = async (event, participantId) => {
  try {
    const dbRef = ref(db, `participants/${event}/${participantId}`)
    await remove(dbRef)
  } catch (error) {
    console.error('Error removing participant:', error)
    throw error
  }
}

/**
 * Initialize event with participants
 * @param {string} event - 'blindcoding' or 'promptverse'
 * @param {array} participants - Array of participant objects
 */
export const initializeEvent = async (event, participants) => {
  try {
    const participantsObj = {}
    participants.forEach((p) => {
      participantsObj[p.id.toString()] = p
    })

    const dbRef = ref(db, `participants/${event}`)
    await set(dbRef, participantsObj)
  } catch (error) {
    console.error('Error initializing event:', error)
    throw error
  }
}

/**
 * Get event stats
 * @param {string} event - 'blindcoding' or 'promptverse'
 * @returns {Promise<object>}
 */
export const getEventStats = async (event) => {
  try {
    const participants = await getParticipants(event)
    const totalPoints = participants.reduce((sum, p) => sum + p.score, 0)
    const avgScore = participants.length > 0 ? Math.round(totalPoints / participants.length) : 0

    return {
      totalParticipants: participants.length,
      topScore: participants[0]?.score || 0,
      averageScore: avgScore,
      totalPoints: totalPoints,
    }
  } catch (error) {
    console.error('Error getting stats:', error)
    return {}
  }
}
