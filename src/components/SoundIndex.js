import React from 'react'

function SoundIndex() {
  const [sounds, setSounds] = React.useState([])

  React.useEffect(() => {
    const getData = async () => {
      const res = await fetch('/api/all-sounds')
      const json = await res.json()
      setSounds(json)
    }
    getData()
  }, [])

  return (
    <div className="section">
      <h1 className="title">Sound Index</h1>
      <div className="container">
        {sounds.map(sound => <h2 key={sound._id}>{sound.fileName}</h2>)}
      </div>
    </div>
  )
}

export default SoundIndex