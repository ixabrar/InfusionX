import React, { useState, useEffect } from 'react'
import { verifyAndSyncData, subscribeToBothEvents } from '../services/firebaseService'

/**
 * Real-time data sync monitor for live events
 * Ensures all participant entries are captured in Firebase
 */
export default function DataSyncMonitor() {
  const [syncStatus, setSyncStatus] = useState({
    blindcodingCount: 0,
    promptverseCount: 0,
    totalParticipants: 0,
    blindcodingTopScore: 0,
    promptverseTopScore: 0,
    syncTime: null,
    status: 'loading',
  })
  const [isAutoRefresh, setIsAutoRefresh] = useState(true)
  const [refreshInterval, setRefreshInterval] = useState(5000) // 5 seconds
  const [logs, setLogs] = useState([])

  // Initial verification on mount
  useEffect(() => {
    const initialVerify = async () => {
      const result = await verifyAndSyncData()
      if (result.stats) {
        setSyncStatus(result.stats)
        addLog('✅ Initial data verification complete', 'success')
      }
    }
    initialVerify()
  }, [])

  // Real-time subscription to both events
  useEffect(() => {
    const unsubscribe = subscribeToBothEvents((data) => {
      setSyncStatus({
        blindcodingCount: data.blindcoding.length,
        promptverseCount: data.promptverse.length,
        totalParticipants: data.blindcoding.length + data.promptverse.length,
        blindcodingTopScore: data.blindcoding[0]?.score || 0,
        promptverseTopScore: data.promptverse[0]?.score || 0,
        syncTime: new Date().toLocaleString(),
        status: 'synced',
      })
      addLog(`📡 Real-time sync: ${data.blindcoding.length} + ${data.promptverse.length} participants`, 'info')
    })

    return () => unsubscribe()
  }, [])

  // Auto-refresh verification at intervals
  useEffect(() => {
    if (!isAutoRefresh) return

    const interval = setInterval(async () => {
      const result = await verifyAndSyncData()
      if (result.stats) {
        setSyncStatus(result.stats)
        addLog('🔄 Auto-refresh verification', 'success')
      }
    }, refreshInterval)

    return () => clearInterval(interval)
  }, [isAutoRefresh, refreshInterval])

  const addLog = (message, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString()
    setLogs((prev) => [{ message, type, timestamp }, ...prev].slice(0, 50)) // Keep last 50 logs
  }

  const handleManualVerify = async () => {
    setSyncStatus((prev) => ({ ...prev, status: 'loading' }))
    const result = await verifyAndSyncData()
    if (result.stats) {
      setSyncStatus(result.stats)
      addLog('✅ Manual verification complete', 'success')
    }
  }

  const handleClearLogs = () => {
    setLogs([])
    addLog('📋 Logs cleared', 'info')
  }

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 text-white">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <span className="text-2xl">📡</span>
          Real-Time Data Sync Monitor
        </h2>
        <div className="flex gap-2">
          <button
            onClick={handleManualVerify}
            disabled={syncStatus.status === 'loading'}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded-lg font-semibold transition"
          >
            {syncStatus.status === 'loading' ? '🔄 Verifying...' : '🔍 Verify Now'}
          </button>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Blind Coding Event */}
        <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg p-4">
          <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
            <span>👨‍💻</span> Blind Coding
          </h3>
          <div className="space-y-2">
            <p className="text-3xl font-bold">{syncStatus.blindcodingCount}</p>
            <p className="text-sm text-purple-200">Participants</p>
            <p className="text-xl font-semibold mt-3">Top Score: {syncStatus.blindcodingTopScore}</p>
          </div>
        </div>

        {/* Prompt Verse Event */}
        <div className="bg-gradient-to-br from-cyan-600 to-cyan-800 rounded-lg p-4">
          <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
            <span>🤖</span> Prompt Verse
          </h3>
          <div className="space-y-2">
            <p className="text-3xl font-bold">{syncStatus.promptverseCount}</p>
            <p className="text-sm text-cyan-200">Participants</p>
            <p className="text-xl font-semibold mt-3">Top Score: {syncStatus.promptverseTopScore}</p>
          </div>
        </div>
      </div>

      {/* Total Stats */}
      <div className="bg-slate-700 rounded-lg p-4 mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-gray-400">Total Participants</p>
            <p className="text-2xl font-bold">{syncStatus.totalParticipants}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Sync Status</p>
            <p className={`text-lg font-semibold ${syncStatus.status === 'synced' ? 'text-green-400' : 'text-yellow-400'}`}>
              {syncStatus.status === 'synced' ? '🟢 Live' : '🟡 ' + syncStatus.status}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Last Sync</p>
            <p className="text-sm font-mono">{syncStatus.syncTime || 'Waiting...'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Auto-Refresh</p>
            <div className="flex items-center gap-2 mt-1">
              <input
                type="checkbox"
                checked={isAutoRefresh}
                onChange={(e) => setIsAutoRefresh(e.target.checked)}
                className="w-4 h-4"
              />
              <select
                value={refreshInterval}
                onChange={(e) => setRefreshInterval(Number(e.target.value))}
                disabled={!isAutoRefresh}
                className="bg-slate-600 text-sm rounded px-2 py-1 disabled:opacity-50"
              >
                <option value={3000}>3s</option>
                <option value={5000}>5s</option>
                <option value={10000}>10s</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Logs */}
      <div className="bg-slate-700 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold flex items-center gap-2">
            <span>📋</span> Activity Log
          </h3>
          <button
            onClick={handleClearLogs}
            className="text-xs px-2 py-1 bg-slate-600 hover:bg-slate-500 rounded"
          >
            Clear
          </button>
        </div>
        <div className="bg-slate-900 rounded p-3 max-h-48 overflow-y-auto space-y-1 font-mono text-sm">
          {logs.length === 0 ? (
            <p className="text-gray-500">No logs yet...</p>
          ) : (
            logs.map((log, idx) => (
              <div
                key={idx}
                className={`flex gap-2 ${
                  log.type === 'success'
                    ? 'text-green-400'
                    : log.type === 'error'
                      ? 'text-red-400'
                      : 'text-blue-400'
                }`}
              >
                <span className="text-gray-500 flex-shrink-0">[{log.timestamp}]</span>
                <span>{log.message}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
