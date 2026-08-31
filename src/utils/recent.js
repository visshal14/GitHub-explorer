const KEY = "recentProfiles"

export const readRecent = () => {
    const saved = window.localStorage.getItem(KEY)
    if (!saved) {
        return []
    }

    try {
        return JSON.parse(saved)
    } catch (err) {
        return []
    }
}

export const writeRecent = (list) => {
    window.localStorage.setItem(KEY, JSON.stringify(list))
}
