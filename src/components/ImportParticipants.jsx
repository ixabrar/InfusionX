import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ImportParticipants({
  currentEvent,
  onImportComplete,
}) {
  const [showImportDialog, setShowImportDialog] = useState(false)
  const [csvData, setCsvData] = useState('')
  const [importError, setImportError] = useState('')
  const [importSuccess, setImportSuccess] = useState(false)
  const [previewData, setPreviewData] = useState([])

  const parseCSV = (data) => {
    try {
      setImportError('')
      const lines = data.trim().split('\n')
      const parsed = []

      // Check if first line is header
      const startIdx = lines[0].toLowerCase().includes('name') ? 1 : 0

      for (let i = startIdx; i < lines.length; i++) {
        const line = lines[i].trim()
        if (!line) continue

        const parts = line.split(',').map(p => p.trim())
        const name = parts[0]
        const score = parts[1] ? parseInt(parts[1]) : 0

        if (name) {
          const initials = name
            .split(' ')
            .slice(0, 2)
            .map(word => word.charAt(0).toUpperCase())
            .join('')

          parsed.push({
            name,
            initials: initials || name.charAt(0).toUpperCase(),
            score: Math.max(0, score),
          })
        }
      }

      if (parsed.length === 0) {
        throw new Error('No valid participants found in data')
      }

      setPreviewData(parsed)
      return parsed
    } catch (error) {
      setImportError(error.message)
      setPreviewData([])
      return []
    }
  }

  const handleImport = () => {
    const parsed = parseCSV(csvData)
    if (parsed.length > 0) {
      onImportComplete(parsed)
      setImportSuccess(true)
      setTimeout(() => {
        setShowImportDialog(false)
        setCsvData('')
        setImportSuccess(false)
        setPreviewData([])
      }, 1500)
    }
  }

  return (
    <>
      <button
        onClick={() => setShowImportDialog(true)}
        className="font-mono text-xs tracking-[0.1em] py-2 px-3 rounded transition-all"
        style={{
          background: 'rgba(100,200,255,0.15)',
          border: '1px solid rgba(100,200,255,0.3)',
          color: '#64C8FF',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(100,200,255,0.25)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(100,200,255,0.15)'
        }}
        title="Import participants from CSV/Excel"
      >
        📥 IMPORT CSV
      </button>

      <AnimatePresence>
        {showImportDialog && (
          <motion.div
            className="fixed inset-0 z-[1000]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowImportDialog(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl rounded-lg"
              style={{
                background: 'rgba(13,19,24,0.95)',
                border: '1px solid rgba(0,255,135,0.2)',
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="p-8 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-hero text-2xl tracking-[0.1em] text-accent">
                      📥 IMPORT PARTICIPANTS
                    </h2>
                    <p className="font-mono text-xs text-muted tracking-[0.1em] mt-2">
                      Import from CSV/Excel for {currentEvent === 'promptverse' ? 'PROMPTVERSE' : 'BLIND CODING'}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowImportDialog(false)}
                    className="text-2xl text-muted hover:text-accent transition-colors"
                  >
                    ✕
                  </button>
                </div>

                {/* Instructions */}
                <div
                  className="p-4 rounded border"
                  style={{
                    background: 'rgba(100,200,255,0.05)',
                    borderColor: 'rgba(100,200,255,0.2)',
                  }}
                >
                  <p className="font-mono text-xs text-muted leading-relaxed">
                    <strong>CSV Format (copy from Excel):</strong>
                    <br />
                    <code className="text-blue-400">Name,Score</code>
                    <br />
                    <code className="text-blue-400">John Doe,100</code>
                    <br />
                    <code className="text-blue-400">Jane Smith,85</code>
                    <br />
                    <br />
                    Score is optional (defaults to 0). First row is skipped if it contains "name" or "score".
                  </p>
                </div>

                {/* CSV Input */}
                <div>
                  <label className="block font-mono text-xs tracking-[0.2em] text-accent uppercase mb-2">
                    Paste CSV Data
                  </label>
                  <textarea
                    value={csvData}
                    onChange={(e) => setCsvData(e.target.value)}
                    placeholder="Name,Score&#10;John Doe,100&#10;Jane Smith,85"
                    className="w-full h-40 font-mono text-xs px-4 py-3 rounded outline-none resize-none text-text"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: importError ? '1px solid #FF6B6B' : '1px solid rgba(0,255,135,0.2)',
                    }}
                    disabled={importSuccess}
                  />
                </div>

                {/* Error Message */}
                {importError && (
                  <motion.div
                    className="p-3 rounded text-xs font-mono"
                    style={{
                      background: 'rgba(255,107,107,0.1)',
                      border: '1px solid rgba(255,107,107,0.3)',
                      color: '#FF6B6B',
                    }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    Error: {importError}
                  </motion.div>
                )}

                {/* Preview */}
                {previewData.length > 0 && (
                  <motion.div
                    className="p-4 rounded border max-h-48 overflow-y-auto"
                    style={{
                      background: 'rgba(0,255,135,0.05)',
                      borderColor: 'rgba(0,255,135,0.2)',
                    }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <p className="font-mono text-xs text-accent uppercase mb-3 font-bold">
                      Preview ({previewData.length} participants)
                    </p>
                    <div className="space-y-2">
                      {previewData.map((p, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between text-xs p-2 rounded"
                          style={{
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.05)',
                          }}
                        >
                          <div>
                            <span className="text-text">{p.name}</span>
                            <span className="text-muted ml-2">({p.initials})</span>
                          </div>
                          <span className="text-accent font-bold">{p.score}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Success Message */}
                {importSuccess && (
                  <motion.div
                    className="p-3 rounded text-xs font-mono text-center"
                    style={{
                      background: 'rgba(0,255,135,0.1)',
                      border: '1px solid rgba(0,255,135,0.3)',
                      color: '#00FF87',
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    ✓ Participants imported successfully!
                  </motion.div>
                )}

                {/* Actions */}
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => setShowImportDialog(false)}
                    disabled={importSuccess}
                    className="font-mono text-xs tracking-[0.1em] py-2 px-4 rounded transition-all"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: '#6B7280',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                    }}
                  >
                    CANCEL
                  </button>
                  <button
                    onClick={handleImport}
                    disabled={!csvData.trim() || importSuccess}
                    className="font-mono text-xs tracking-[0.1em] py-2 px-6 rounded transition-all font-bold"
                    style={{
                      background:
                        !csvData.trim() || importSuccess
                          ? 'rgba(0,255,135,0.1)'
                          : 'rgba(0,255,135,0.15)',
                      border: '1px solid rgba(0,255,135,0.3)',
                      color: !csvData.trim() || importSuccess ? 'rgba(0,255,135,0.5)' : '#00FF87',
                      cursor: !csvData.trim() || importSuccess ? 'not-allowed' : 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      if (csvData.trim() && !importSuccess) {
                        e.currentTarget.style.background = 'rgba(0,255,135,0.25)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (csvData.trim() && !importSuccess) {
                        e.currentTarget.style.background = 'rgba(0,255,135,0.15)'
                      }
                    }}
                  >
                    {importSuccess ? '✓ IMPORTED' : 'IMPORT'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
