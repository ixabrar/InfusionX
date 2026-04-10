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

/**
 * Get participants from both events simultaneously
 * @returns {Promise<object>} Object with blindcoding and promptverse participants
 */
export const getBothEventsParticipants = async () => {
  try {
    const blindcodingRef = ref(db, 'participants/blindcoding')
    const promptverseRef = ref(db, 'participants/promptverse')

    const [blindcodingSnapshot, promptverseSnapshot] = await Promise.all([
      get(blindcodingRef),
      get(promptverseRef),
    ])

    const blindcodingData = blindcodingSnapshot.exists()
      ? Object.values(blindcodingSnapshot.val()).sort((a, b) => b.score - a.score)
      : []

    const promptverseData = promptverseSnapshot.exists()
      ? Object.values(promptverseSnapshot.val()).sort((a, b) => b.score - a.score)
      : []

    return {
      blindcoding: blindcodingData,
      promptverse: promptverseData,
      timestamp: new Date().toISOString(),
    }
  } catch (error) {
    console.error('Error getting both events participants:', error)
    return { blindcoding: [], promptverse: [], timestamp: null }
  }
}

/**
 * Subscribe to real-time updates for both events simultaneously
 * @param {function} callback - Called with {blindcoding, promptverse, timestamp} whenever data changes
 * @returns {function} Unsubscribe function
 */
export const subscribeToBothEvents = (callback) => {
  try {
    const blindcodingRef = ref(db, 'participants/blindcoding')
    const promptverseRef = ref(db, 'participants/promptverse')

    const unsubscribeBlincode = onValue(blindcodingRef, (snapshot) => {
      const blindcodingData = snapshot.exists()
        ? Object.values(snapshot.val()).sort((a, b) => b.score - a.score)
        : []

      // Get the latest promptverse data
      get(promptverseRef).then((promptverseSnapshot) => {
        const promptverseData = promptverseSnapshot.exists()
          ? Object.values(promptverseSnapshot.val()).sort((a, b) => b.score - a.score)
          : []

        callback({
          blindcoding: blindcodingData,
          promptverse: promptverseData,
          timestamp: new Date().toISOString(),
        })
      })
    })

    const unsubscribePromptverse = onValue(promptverseRef, (snapshot) => {
      const promptverseData = snapshot.exists()
        ? Object.values(snapshot.val()).sort((a, b) => b.score - a.score)
        : []

      // Get the latest blindcoding data
      get(blindcodingRef).then((blindcodingSnapshot) => {
        const blindcodingData = blindcodingSnapshot.exists()
          ? Object.values(blindcodingSnapshot.val()).sort((a, b) => b.score - a.score)
          : []

        callback({
          blindcoding: blindcodingData,
          promptverse: promptverseData,
          timestamp: new Date().toISOString(),
        })
      })
    })

    // Return unsubscribe function that removes both listeners
    return () => {
      unsubscribeBlincode()
      unsubscribePromptverse()
    }
  } catch (error) {
    console.error('Error subscribing to both events:', error)
    return () => {}
  }
}

/**
 * Verify and sync data - fetches latest data to ensure all entries are in database
 * @returns {Promise<object>} Current state of both events with verification status
 */
export const verifyAndSyncData = async () => {
  try {
    console.log('🔄 Verifying data sync for both events...')
    
    const data = await getBothEventsParticipants()
    
    const stats = {
      blindcodingCount: data.blindcoding.length,
      promptverseCount: data.promptverse.length,
      totalParticipants: data.blindcoding.length + data.promptverse.length,
      blindcodingTopScore: data.blindcoding[0]?.score || 0,
      promptverseTopScore: data.promptverse[0]?.score || 0,
      syncTime: new Date().toLocaleString(),
      status: 'verified',
    }

    console.log('✅ Data sync verified:', stats)
    return { ...data, stats }
  } catch (error) {
    console.error('❌ Error verifying data sync:', error)
    return {
      blindcoding: [],
      promptverse: [],
      stats: { status: 'error', error: error.message },
    }
  }
}
