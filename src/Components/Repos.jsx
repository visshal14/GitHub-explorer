import { useEffect, useState } from "react"
import { languageBreakdown, shortCount, sortRepos, timeAgo } from "../utils/repoStats"

const colors = ["#4c9aff", "#f2c94c", "#eb5757", "#6fcf97", "#bb6bd9", "#f2994a", "#56ccf2"]

const Repos = ({ repos }) => {
    const [search, setSearch] = useState("")
    const [sortBy, setSortBy] = useState("updated")
    const [language, setLanguage] = useState("")
    const [hideForks, setHideForks] = useState(false)

    useEffect(() => {
        setSearch("")
        setSortBy("updated")
        setLanguage("")
        setHideForks(false)
    }, [repos])

    const languages = languageBreakdown(repos)

    const matches = repos.filter((repo) => {
        if (hideForks && repo.fork) {
            return false
        }
        if (language && repo.language !== language) {
            return false
        }

        const term = search.toLowerCase()
        if (repo.name.toLowerCase().includes(term)) {
            return true
        }
        if (repo.description && repo.description.toLowerCase().includes(term)) {
            return true
        }

        return false
    })

    const shown = sortRepos(matches, sortBy)



    return (
        <div>
            {languages.length > 0 && (
                <div className="card">
                    <h3>language breakdown</h3>

                    <div className="language-bar">
                        {languages.map((item, index) => (
                            <span
                                key={item.name}
                                className="language-slice"
                                style={{ width: item.percent + "%", background: colors[index % colors.length] }}
                                title={item.name + " " + item.percent + "%"}
                            />
                        ))}
                    </div>

                    <div className="tag-row">
                        {languages.map((item, index) => (
                            <button
                                key={item.name}
                                className={"tag" + (language === item.name ? " tag-active" : "")}
                                onClick={() => setLanguage(language === item.name ? "" : item.name)}
                            >
                                <span className="dot" style={{ background: colors[index % colors.length] }} />
                                {item.name} {item.percent}%
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <h3>repositories</h3>

            <div className="toolbar">
                <input
                    className="search"
                    value={search}
                    placeholder="search repositories"
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="updated">recent activity</option>
                    <option value="stars">most stars</option>
                    <option value="forks">most forks</option>
                    <option value="name">name</option>
                </select>

                <label className="check">
                    <input
                        type="checkbox"
                        checked={hideForks}
                        onChange={(e) => setHideForks(e.target.checked)}
                    />
                    hide forks
                </label>
            </div>

            {shown.length === 0 && (
                <p className="muted">
                    {repos.length === 0 ? "no public repositories." : "nothing matches that."}
                </p>
            )}


            <div className="repo-list">
                {shown.map((repo) => (
                    <div key={repo.id} className="card">
                        <a href={repo.html_url} target="_blank" rel="noreferrer">
                            {repo.name}
                        </a>

                        <p className="muted repo-about">{repo.description || "no description"}</p>

                        <div className="repo-meta">
                            {repo.language && <span className="tag">{repo.language}</span>}
                            <span className="muted">{shortCount(repo.stargazers_count)} stars</span>
                            <span className="muted">{shortCount(repo.forks_count)} forks</span>
                            <span className="muted">updated {timeAgo(repo.pushed_at)}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Repos
// <!-- ℑ♑︎  亖⌽⎭🂱⎶☀️☀️⌶⍱   -->
