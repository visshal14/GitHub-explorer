import { shortCount } from "../utils/repoStats"

const Profile = ({ user, repos }) => {
    const stars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0)
    const forks = repos.reduce((sum, repo) => sum + repo.forks_count, 0)

    return (
        <div>
            <div className="card profile-card">
                <img className="avatar" src={user.avatar_url} alt={user.login} />

                <div>
                    <h2>{user.name || user.login}</h2>

                    <a className="muted" href={user.html_url} target="_blank" rel="noreferrer">
                        @{user.login}
                    </a>

                    {user.bio && <p>{user.bio}</p>}

                    <div className="meta-row">
                        {user.location && <span className="muted">{user.location}</span>}
                        {user.company && <span className="muted">{user.company}</span>}
                        <span>
                            <strong>{shortCount(user.followers)}</strong> followers
                        </span>
                        <span>
                            <strong>{shortCount(user.following)}</strong> following
                        </span>
                    </div>
                </div>
            </div>

            <div className="stats-grid">
                <div className="card stat">
                    <strong>{user.public_repos}</strong>
                    <span className="muted">public repos</span>
                </div>

                <div className="card stat">
                    <strong>{shortCount(stars)}</strong>
                    <span className="muted">total stars</span>
                </div>

                <div className="card stat">
                    <strong>{shortCount(forks)}</strong>
                    <span className="muted">total forks</span>
                </div>
            </div>
        </div>
    )
}
// <!-- ℑ♑︎  亖⌽⎭🂱⎶☀️☀️⌶⍱   --> 
export default Profile
