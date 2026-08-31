import { useEffect, useState } from "react"
import { getRepos, getUser } from "./services/githubAPI"
import { readRecent, writeRecent } from "./utils/recent"
import apiMessage from "./utils/apiMessage"
import Profile from "./Components/Profile"
import Repos from "./Components/Repos"
import Recent from "./Components/Recent"

const App = () => {
    const [username, setUsername] = useState("")
    const [user, setUser] = useState(null)
    const [repos, setRepos] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [recent, setRecent] = useState([])

    useEffect(() => {
        setRecent(readRecent())
    }, [])

    const saveRecent = (list) => {
        setRecent(list)
        writeRecent(list)
    }


    const search = async (name) => {
        setUsername(name)
        setLoading(true)
        setError("")
        setUser(null)
        setRepos([])

        try {
            const profile = await getUser(name)
            const repoList = await getRepos(name)

            setUser(profile)
            setRepos(repoList)

            const entry = {
                login: profile.login,
                name: profile.name,
                avatar_url: profile.avatar_url
            }

            const others = recent.filter((item) => item.login !== entry.login)
            const list = [entry, ...others]

            saveRecent(list.slice(0, 6))
        } catch (err) {
            setError(apiMessage(err, "could not load that profile"))
        } finally {
            setLoading(false)
        }
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if (username.trim()) {
            search(username.trim())
        }
    }

    const onRemove = (login) => {
        saveRecent(recent.filter((item) => item.login !== login))
    }



    return (
        <div className="page">
            <h1>github profile and repo explorer</h1>
            <p className="muted">search any public github user and explore what they build.</p>

            <form className="search-bar" onSubmit={onSubmit}>
                <input
                    className="search"
                    value={username}
                    placeholder="enter a github username"
                    onChange={(e) => setUsername(e.target.value)}
                />

                <button type="submit" disabled={loading}>
                    {loading ? "searching..." : "search"}
                </button>
            </form>

            <Recent recent={recent} onPick={search} onRemove={onRemove} onClear={() => saveRecent([])} />

            {error && <p className="error">{error}</p>}
            {loading && <p className="muted">loading the profile...</p>}

            {user && (
                <div>
                    <Profile user={user} repos={repos} />
                    <Repos repos={repos} />
                </div>
            )}
        </div>
    )
}
// <!-- ℑ♑︎  亖⌽⎭🂱⎶☀️☀️⌶⍱   -->
export default App
