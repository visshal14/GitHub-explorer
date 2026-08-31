import { useState } from "react"

const App = () => {
    const [username, setUsername] = useState("")

    const onSubmit = (e) => {
        e.preventDefault()
        console.log("searching for", username)
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

                <button type="submit">search</button>
            </form>
        </div>
    )
}

export default App
