'use client'
import { useState } from 'react'
import axios from 'axios'

export default function Chat() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([])

  const sendMessage = async () => {
    if (!input) return
    const newMessage = { role: 'user', content: input }
    setMessages([...messages, newMessage])
    setInput('')
    try {
      const res = await axios.post('/api/generate', { prompt: input })
      setMessages((prev) => [...prev, { role: 'ai', content: res.data.result }])
    } catch (err) {
      setMessages((prev) => [...prev, { role: 'ai', content: 'Erro ao gerar resposta.' }])
    }
  }

  return (
    <div className="w-full max-w-xl bg-gray-800 p-4 rounded-lg shadow-lg">
      <div className="h-64 overflow-y-auto mb-4 space-y-2">
        {messages.map((msg, idx) => (
          <div key={idx} className={msg.role === 'user' ? 'text-right' : 'text-left'}>
            <span className="inline-block px-3 py-1 rounded-lg bg-gray-700">{msg.content}</span>
          </div>
        ))}
      </div>
      <div className="flex space-x-2">
        <input
          className="flex-1 p-2 rounded-lg bg-gray-700 text-white"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite sua mensagem..."
        />
        <button className="px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-500" onClick={sendMessage}>
          Enviar
        </button>
      </div>
    </div>
  )
}