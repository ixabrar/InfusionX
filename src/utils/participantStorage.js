/**
 * Participant Storage Management System
 * Manages participants separately for blind coding and promptverse events
 */

const STORAGE_KEYS = {
  BLIND_CODING: 'arena-blind-coding-participants',
  PROMPTVERSE: 'arena-promptverse-participants',
  LAST_PARTICIPANT_ID: 'arena-last-participant-id',
}

/**
 * Initialize participant storage for an event
 * @param {string} event - 'blindcoding' or 'promptverse'
 * @param {array} initialParticipants - Initial participants data
 */
export const initializeParticipantStorage = (event, initialParticipants = []) => {
  const key = event === 'blindcoding' ? STORAGE_KEYS.BLIND_CODING : STORAGE_KEYS.PROMPTVERSE
  const existing = localStorage.getItem(key)
  
  if (!existing) {
    localStorage.setItem(key, JSON.stringify(initialParticipants))
  }
  
  // Initialize last participant ID counter
  if (!localStorage.getItem(STORAGE_KEYS.LAST_PARTICIPANT_ID)) {
    const maxId = initialParticipants.length > 0 
      ? Math.max(...initialParticipants.map(p => p.id))
      : 0
    localStorage.setItem(STORAGE_KEYS.LAST_PARTICIPANT_ID, String(maxId))
  }
}

/**
 * Get all participants for an event
 * @param {string} event - 'blindcoding' or 'promptverse'
 * @returns {array} Array of participant objects
 */
export const getParticipants = (event) => {
  const key = event === 'blindcoding' ? STORAGE_KEYS.BLIND_CODING : STORAGE_KEYS.PROMPTVERSE
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : []
}

/**
 * Add a new participant to an event
 * @param {string} event - 'blindcoding' or 'promptverse'
 * @param {string} name - Participant name
 * @returns {object} The newly created participant
 */
export const addParticipant = (event, name) => {
  if (!name || !name.trim()) {
    throw new Error('Participant name cannot be empty')
  }

  const key = event === 'blindcoding' ? STORAGE_KEYS.BLIND_CODING : STORAGE_KEYS.PROMPTVERSE
  const participants = getParticipants(event)
  
  // Generate next ID
  let lastId = parseInt(localStorage.getItem(STORAGE_KEYS.LAST_PARTICIPANT_ID)) || 0
  const newId = lastId + 1
  localStorage.setItem(STORAGE_KEYS.LAST_PARTICIPANT_ID, String(newId))
  
  // Create initials from name
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map(word => word.charAt(0).toUpperCase())
    .join('')
  
  const newParticipant = {
    id: newId,
    name: name.trim(),
    initials: initials || name.charAt(0).toUpperCase(),
    score: 0,
  }
  
  participants.push(newParticipant)
  // Sort by score descending
  participants.sort((a, b) => b.score - a.score)
  
  localStorage.setItem(key, JSON.stringify(participants))
  return newParticipant
}

/**
 * Remove a participant from an event
 * @param {string} event - 'blindcoding' or 'promptverse'
 * @param {number} participantId - ID of participant to remove
 */
export const removeParticipant = (event, participantId) => {
  const key = event === 'blindcoding' ? STORAGE_KEYS.BLIND_CODING : STORAGE_KEYS.PROMPTVERSE
  const participants = getParticipants(event)
  
  const filtered = participants.filter(p => p.id !== participantId)
  localStorage.setItem(key, JSON.stringify(filtered))
}

/**
 * Update participant score
 * @param {string} event - 'blindcoding' or 'promptverse'
 * @param {number} participantId - ID of participant
 * @param {number} newScore - New score value
 */
export const updateParticipantScore = (event, participantId, newScore) => {
  const key = event === 'blindcoding' ? STORAGE_KEYS.BLIND_CODING : STORAGE_KEYS.PROMPTVERSE
  const participants = getParticipants(event)
  
  const participant = participants.find(p => p.id === participantId)
  if (participant) {
    participant.score = Math.max(0, newScore) // Ensure score is not negative
    participants.sort((a, b) => b.score - a.score)
    localStorage.setItem(key, JSON.stringify(participants))
  }
}

/**
 * Reset all points to zero for an event
 * @param {string} event - 'blindcoding' or 'promptverse'
 * @returns {array} Updated participants array with points reset
 */
export const resetAllPoints = (event) => {
  const key = event === 'blindcoding' ? STORAGE_KEYS.BLIND_CODING : STORAGE_KEYS.PROMPTVERSE
  const participants = getParticipants(event)
  
  const resetParticipants = participants.map(p => ({
    ...p,
    score: 0,
  }))
  
  localStorage.setItem(key, JSON.stringify(resetParticipants))
  return resetParticipants
}

/**
 * Reset points for a specific participant
 * @param {string} event - 'blindcoding' or 'promptverse'
 * @param {number} participantId - ID of participant
 */
export const resetParticipantPoints = (event, participantId) => {
  updateParticipantScore(event, participantId, 0)
}

/**
 * Get total participants count for an event
 * @param {string} event - 'blindcoding' or 'promptverse'
 * @returns {number} Count of participants
 */
export const getParticipantCount = (event) => {
  return getParticipants(event).length
}

/**
 * Get top N participants for an event
 * @param {string} event - 'blindcoding' or 'promptverse'
 * @param {number} limit - Number of top participants to return
 * @returns {array} Top participants sorted by score
 */
export const getTopParticipants = (event, limit = 10) => {
  const participants = getParticipants(event)
  return participants.slice(0, limit)
}

/**
 * Clear all participants for an event
 * @param {string} event - 'blindcoding' or 'promptverse'
 */
export const clearAllParticipants = (event) => {
  const key = event === 'blindcoding' ? STORAGE_KEYS.BLIND_CODING : STORAGE_KEYS.PROMPTVERSE
  localStorage.setItem(key, JSON.stringify([]))
}

/**
 * Clear all participants from all events and reset ID counter
 */
export const clearAllParticipantsGlobally = () => {
  localStorage.setItem(STORAGE_KEYS.BLIND_CODING, JSON.stringify([]))
  localStorage.setItem(STORAGE_KEYS.PROMPTVERSE, JSON.stringify([]))
  localStorage.setItem(STORAGE_KEYS.LAST_PARTICIPANT_ID, '0')
}

/**
 * Export participants data as JSON
 * @param {string} event - 'blindcoding' or 'promptverse'
 * @returns {string} JSON string of participants
 */
export const exportParticipants = (event) => {
  const participants = getParticipants(event)
  return JSON.stringify(participants, null, 2)
}

/**
 * Import participants data from CSV format (Excel export)
 * Expected CSV format: Name,Score (or just Name)
 * @param {string} event - 'blindcoding' or 'promptverse'
 * @param {string} csvData - CSV string of participants
 * @returns {array} Imported participants
 */
export const importFromCSV = (event, csvData) => {
  try {
    const lines = csvData.trim().split('\n')
    const key = event === 'blindcoding' ? STORAGE_KEYS.BLIND_CODING : STORAGE_KEYS.PROMPTVERSE
    
    let lastId = parseInt(localStorage.getItem(STORAGE_KEYS.LAST_PARTICIPANT_ID)) || 0
    const participants = []

    // Skip header if present
    const startIdx = lines[0].toLowerCase().includes('name') ? 1 : 0

    for (let i = startIdx; i < lines.length; i++) {
      const line = lines[i].trim()
      if (!line) continue

      const parts = line.split(',').map(p => p.trim())
      const name = parts[0]
      const score = parts[1] ? parseInt(parts[1]) : 0

      if (name) {
        const newId = ++lastId
        const initials = name
          .split(' ')
          .slice(0, 2)
          .map(word => word.charAt(0).toUpperCase())
          .join('')

        participants.push({
          id: newId,
          name: name,
          initials: initials || name.charAt(0).toUpperCase(),
          score: Math.max(0, score),
        })
      }
    }

    localStorage.setItem(STORAGE_KEYS.LAST_PARTICIPANT_ID, String(lastId))
    localStorage.setItem(key, JSON.stringify(participants))
    return participants
  } catch (error) {
    throw new Error(`Failed to import from CSV: ${error.message}`)
  }
}

/**
 * Import participants data from JSON
 * @param {string} event - 'blindcoding' or 'promptverse'
 * @param {string} jsonData - JSON string of participants
 */
export const importParticipants = (event, jsonData) => {
  try {
    const participants = JSON.parse(jsonData)
    if (!Array.isArray(participants)) {
      throw new Error('Data must be an array')
    }
    
    const key = event === 'blindcoding' ? STORAGE_KEYS.BLIND_CODING : STORAGE_KEYS.PROMPTVERSE
    localStorage.setItem(key, JSON.stringify(participants))
    
    // Update last ID
    if (participants.length > 0) {
      const maxId = Math.max(...participants.map(p => p.id))
      localStorage.setItem(STORAGE_KEYS.LAST_PARTICIPANT_ID, String(maxId))
    }
  } catch (error) {
    throw new Error(`Failed to import participants: ${error.message}`)
  }
}
