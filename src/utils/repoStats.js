export const languageBreakdown = (repos) => {
    const counts = {}
    let total = 0

    repos.forEach((repo) => {
        if (repo.language) {
            counts[repo.language] = (counts[repo.language] || 0) + 1
            total++
        }
    })

    const list = Object.keys(counts).map((name) => ({
        name: name,
        count: counts[name],
        percent: Math.round((counts[name] / total) * 100)
    }))

    return list.sort((a, b) => b.count - a.count)
}

export const sortRepos = (repos, sortBy) => {
    const list = [...repos]

    if (sortBy === "stars") {
        return list.sort((a, b) => b.stargazers_count - a.stargazers_count)
    }
    if (sortBy === "forks") {
        return list.sort((a, b) => b.forks_count - a.forks_count)
    }
    if (sortBy === "name") {
        return list.sort((a, b) => a.name.localeCompare(b.name))
    }

    return list.sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
}


export const timeAgo = (value) => {
    const oneDay = 1000 * 60 * 60 * 24
    const days = Math.floor((Date.now() - new Date(value)) / oneDay)

    if (days < 1) {
        return "today"
    }
    if (days < 30) {
        return days + " days ago"
    }
    if (days < 365) {
        return Math.floor(days / 30) + " months ago"
    }

    return Math.floor(days / 365) + " years ago"
}

export const shortCount = (value) => {
    if (value < 1000) {
        return value
    }

    return (value / 1000).toFixed(1) + "k"
}
