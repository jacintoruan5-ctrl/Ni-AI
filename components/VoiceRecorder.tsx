'use client'
import { useState } from 'react'

export default function VoiceRecorder({ onAudio }: { onAudio: (blob: Blob) => void }) {
  const [recording, setRecording] = useState(false)
  let mediaRecorder: MediaRecorder | null = null
  let chunks: BlobPart[] = []

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    mediaRecorder = new MediaRecorder(stream)
    mediaRecorder.ondataavailable = (e) => chunks.push(e.data)
    mediaRecorder.onstop = () => onAudio(new Blob(chunks, { type: 'audio/webm' }))
    mediaRecorder.start()
    setRecording(true)
  }

  const stopRecording = () => {
    mediaRecorder?.stop()
    setRecording(false)
    chunks = []
  }

  return (
    <button
      onClick={recording ? stopRecording : startRecording}
      className={`px-4 py-2 rounded-lg ${recording ? 'bg-red-600' : 'bg-green-600'}`}
    >
      {recording ? 'Parar Gravação' : 'Gravar Áudio'}
    </button>
  )
}