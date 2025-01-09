"use client"

import React, { useState } from 'react'

export default function UCMFormatter() {
  const [input, setInput] = useState('')
  const [formattedOutput, setFormattedOutput] = useState('')

  const parseCPMMessage = () => {
    // Combine all lines into a single string, replacing newlines with spaces
    const combinedInput = input.replace(/\n/g, ' ')

    // Split the combined input by '-' and filter out empty segments
    const segments = combinedInput.split('-').filter(segment => segment.trim() !== '')
 alert(segments)
    const flightInfo = segments[0].split('.')
    const flightNumber = flightInfo[0].split('/')[0]
    const date = flightInfo[0].split('/')[1]
    const registration = flightInfo[1] // Dynamically extract registration

    // Extract cargo pallet codes (ending with '/C')
    const palletCodes = segments
      .slice(1)  // Skip the first element (header)
      .flatMap(segment => {
        const regex = /([A-Z]{3}\d+)TK(?=.*?\/C)/g
        const matches = []
        let match

        while ((match = regex.exec(segment)) !== null) {
          matches.push(match[1] + 'TK')
        }

        return matches
      })

    formatUCM(flightNumber, date, registration, palletCodes)
  }

  const formatUCM = (flightNumber, date, registration, codes) => {
    const currentDate = new Date()
const day = currentDate.getDate().toString().padStart(2, '0');
const month = currentDate.toString('').split(' ')[1].toUpperCase();

    
    
    const formattedDateTime = `${flightNumber}/${day}${month}.${registration}.IAD`
    
    let output = 'UCM\n'
    output += formattedDateTime + '\n'
    output += 'IN\n'

    for (let i = 0; i < codes.length; i += 4) {
      const chunk = codes.slice(i, i + 4)
      output += `.${chunk.join('.')}\n`
    }

    output += 'OUT\n.N'

    setFormattedOutput(output)
  }



  return (
    <div className="ucm-formatter">
      <div className="card">
        <div className="card-header">
          <h1 className="card-title">
            <span className="emoji" aria-hidden="true">✈️</span>
            CPM to UCM Formatter (Cargo Only)
          </h1>
          <p className="card-description">
            Parse CPM messages and format as UCM (Only for cargo pallets)
          </p>
        </div>
        <div className="card-content">
          <div className="input-group">
            <label htmlFor="cpmMessage" className="input-label">
              Enter CPM Message
            </label>
            <textarea
              id="cpmMessage"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your CPM message here..."
              className="input-textarea"
            />
          </div>
          <button onClick={parseCPMMessage} className="parse-button">
            <span className="emoji" aria-hidden="true">📦</span> Parse CPM and Format as UCM (Cargo Only)
          </button>
          {formattedOutput && (
            <div className="output-group">
              <h3 className="output-title">Formatted UCM Output:</h3>
              <pre className="output-content">
                {formattedOutput}
              </pre>
            </div>
          )}
        </div>
      </div>
      <style jsx>{`
        .ucm-formatter {
          min-height: 100vh;
          background-color: #f0f4f8;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          font-family: Arial, sans-serif;
        }
        .card {
          width: 100%;
          max-width: 600px;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }
        .card-header {
          background-color: #2c5282;
          color: white;
          padding: 1rem;
        }
        .card-title {
          font-size: 1.5rem;
          font-weight: bold;
          display: flex;
          align-items: center;
          margin: 0;
        }
        .emoji {
          margin-right: 0.5rem;
        }
        .card-description {
          margin: 0.5rem 0 0;
          font-size: 0.875rem;
        }
        .card-content {
          padding: 1.5rem;
        }
        .input-group {
          margin-bottom: 1rem;
        }
        .input-label {
          display: block;
          margin-bottom: 0.5rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: #4a5568;
        }
        .input-textarea {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #e2e8f0;
          border-radius: 4px;
          font-size: 1rem;
          min-height: 150px;
          resize: vertical;
        }
        .parse-button {
          width: 100%;
          background-color: #4299e1;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 0.75rem;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        .parse-button:hover {
          background-color: #3182ce;
        }
        .output-group {
          margin-top: 1.5rem;
        }
        .output-title {
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }
        .output-content {
          background-color: #2d3748;
          color: #48bb78;
          padding: 1rem;
          border-radius: 4px;
          overflow-x: auto;
          font-family: monospace;
          font-size: 0.875rem;
          white-space: pre-wrap;
          word-break: break-all;
        }
      `}</style>
    </div>
  )
}

