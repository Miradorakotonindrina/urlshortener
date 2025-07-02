import { useState, useEffect } from 'react'
import axios from 'axios'

interface ShortUrlEntry {
  original: string
  short: string
}

function App() {
  const [originalUrl, setOriginalUrl] = useState<string>('')
  const [shortUrl, setShortUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [history, setHistory] = useState<ShortUrlEntry[]>([])

  const API_BASE = 'http://127.0.0.1:8000'

  // Charger tous les liens au démarrage
  useEffect(() => {
    axios.get(`${API_BASE}/api/links`)
      .then((res) => {
        const allLinks = res.data.map((link: any) => ({
          original: link.original_url,
          short: `${link.token}`,
          clicks: link.clicks
        }))
        setHistory(allLinks)
      })
      .catch(() => {
        setError("Impossible de charger les liens existants.")
      })
  }, [])

  const handleShorten = async () => {
    try {
      const response = await axios.post(`${API_BASE}/api/links`, {
        original_url: originalUrl
      })

      const newToken = response.data.token
      const newShortUrl = `${API_BASE}/api/redirect/${newToken}`
      setShortUrl(newShortUrl)
      setError(null)
      setOriginalUrl('')

      // Recharger tous les liens après ajout
      const linksRes = await axios.get(`${API_BASE}/api/links`)
      const allLinks = linksRes.data.map((link: any) => ({
        original: link.original_url,
        short: `${link.token}`,
        clicks: link.clicks
      }))
      setHistory(allLinks )

    } catch (err) {
      setError('Une erreur est survenue. Veuillez vérifier l’URL ou le serveur.')
      setShortUrl(null)
    }
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Raccourcisseur d'URL</h1>
      <h3> Assurez vous d'avoir bien mis http:// avant votre URl </h3>
      <h3> Veillez entre une URL valide </h3>

      <input
        type="text"
        placeholder="Entrez l'URL à raccourcir"
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
        style={styles.input}
      />

      <button onClick={handleShorten} style={styles.button}>
        Raccourcir
      </button>

      {shortUrl && (
        <div style={styles.result}>
          Lien raccourci :{' '}
          <a href={shortUrl} target="_blank" rel="noreferrer" style={styles.link}>
            {shortUrl}
          </a>
        </div>
      )}

      {error && <div style={styles.error}>{error}</div>}

      {history.length > 0 && (
        <div style={styles.tableContainer}>
          <h2 style={{ marginBottom: 10 }}>Historique</h2>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>URL originale</th>
                <th style={styles.th}>Lien raccourci</th>
                <th style={styles.th}>Nombres de clique</th>
              </tr>
            </thead>
            <tbody>
              {history.map((entry, index) => (
                <tr key={index}>
                  <td style={styles.td}>{entry.original}</td>
                  <td style={styles.td}>
                    <a
                      href={`http://127.0.0.1:8000/s/${entry.short}`}
                      target="_blank"
                      rel="noreferrer"
                      style={styles.link}
                    >
                      {entry.short}
                    </a>
                  </td>
                  <td>{entry.clicks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
const styles = {
  container: {
    maxWidth: 700,
    margin: '40px auto',
    padding: '20px',
    backgroundColor: '#fdfdfd',
    borderRadius: 10,
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    textAlign: 'center' as const,
    fontFamily: 'Segoe UI, sans-serif'
  },
  title: {
    fontSize: '28px',
    marginBottom: '20px'
  },
  input: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    marginBottom: '10px',
    boxSizing: 'border-box' as const
  },
  button: {
    padding: '12px 20px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginBottom: '20px'
  },
  result: {
    marginTop: '20px',
    fontSize: '18px'
  },
  error: {
    color: 'red',
    marginTop: '15px'
  },
  link: {
    color: '#007bff',
    textDecoration: 'none'
  },
  tableContainer: {
    marginTop: '30px',
    textAlign: 'left' as const
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const
  },
  th: {
    textAlign: 'left' as const,
    padding: '10px',
    backgroundColor: '#f0f0f0',
    borderBottom: '2px solid #ddd'
  },
  td: {
    padding: '10px',
    borderBottom: '1px solid #eee'
  }
}
  export default App;
