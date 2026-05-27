import { useState, useEffect } from 'react'
import './App.css'

function App() {
const emotions = [
  { label: '😰 Тревога', value: 'Тревога', className: 'anxiety' },
  { label: '😔 Грусть', value: 'Грусть', className: 'sadness' },
  { label: '😡 Злость', value: 'Злость', className: 'anger' },
  { label: '😊 Радость', value: 'Радость', className: 'joy' },
]

const states = [
  { label: '😴 Усталость', value: 'Усталость', className: 'tired' },
  { label: '🌿 Спокойствие', value: 'Спокойствие', className: 'calm' },
]

  const [selectedEmotion, setSelectedEmotion] = useState('')
  const [note, setNote] = useState('')
  const [entries, setEntries] = useState([])
  const [intensity, setIntensity] = useState(5)

  useEffect(() => {
    const savedEntries = JSON.parse(localStorage.getItem('emotionEntries')) || []
    setEntries(savedEntries)
  }, [])

  const saveEntry = () => {
    if (!selectedEmotion) return

    const newEntry = {
      emotion: selectedEmotion,
      note,
      intensity,
      date: new Date().toLocaleString(),
    }

    const updatedEntries = [newEntry, ...entries]
    setEntries(updatedEntries)
    localStorage.setItem('emotionEntries', JSON.stringify(updatedEntries))

    setNote('')
    setSelectedEmotion('')
    setIntensity(5)
  }

  return (
    <div className="app">
      <h1>Дневник эмоций</h1>

      <p className="subtitle">Как ты сейчас себя чувствуешь?</p>

      <div className="emotion-section">
  <h3>Эмоции</h3>

  <div className="emotions">
    {emotions.map((emotion) => (
      <button
        key={emotion.value}
        className={`emotion-btn ${emotion.className} ${
          selectedEmotion === emotion.value ? 'active' : ''
        }`}
        onClick={() => setSelectedEmotion(emotion.value)}
      >
        {emotion.label}
      </button>
    ))}
  </div>
</div>

<div className="emotion-section">
  <h3>Состояние</h3>

  <div className="emotions">
    {states.map((emotion) => (
      <button
        key={emotion.value}
        className={`emotion-btn ${emotion.className} ${
          selectedEmotion === emotion.value ? 'active' : ''
        }`}
        onClick={() => setSelectedEmotion(emotion.value)}
      >
        {emotion.label}
      </button>
    ))}
  </div>
</div>

      <textarea
        placeholder="Что вызвало это чувство?"
        className="note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <div className="intensity">
        <p>Интенсивность: {intensity}/10</p>

        <input
          type="range"
          min="1"
          max="10"
          value={intensity}
          onChange={(e) => setIntensity(e.target.value)}
        />
      </div>

      <button className="save-btn" onClick={saveEntry}>
        Сохранить состояние
      </button>

      <div className="entries">
        <h2>История</h2>

        {entries.map((entry, index) => (
          <div key={index} className="entry-card">
            <strong>{entry.emotion}</strong>
            <p>{entry.note}</p>
            <p>Интенсивность: {entry.intensity}/10</p>
            <span>{entry.date}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
