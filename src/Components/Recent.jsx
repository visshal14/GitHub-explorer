const Recent = ({ recent, onPick, onRemove, onClear }) => {
    if (recent.length === 0) {
        return null
    }

    return (
        <div className="recent">
            <div className="recent-head">
                <h3>recent profiles</h3>
                <button className="btn-plain" onClick={onClear}>
                    clear
                </button>
            </div>

            <div className="tag-row">
                {recent.map((item) => (
                    <span key={item.login} className="chip">
                        <img className="avatar-small" src={item.avatar_url} alt={item.login} />

                        <button className="btn-link" onClick={() => onPick(item.login)}>
                            {item.login}
                        </button>

                        <button className="btn-link muted" onClick={() => onRemove(item.login)}>
                            x
                        </button>
                    </span>
                ))}
            </div>
        </div>
    )
}
// <!-- ℑ♑︎  亖⌽⎭🂱⎶☀️☀️⌶⍱   -->
export default Recent
