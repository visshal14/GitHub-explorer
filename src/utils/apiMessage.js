const apiMessage = (err, fallback) => {
    if (err.response && err.response.status === 404) {
        return "no github user with that username"
    }
    if (err.response && err.response.status === 403) {
        return "github rate limit hit, try again in a few minutes"
    }
    if (err.code === "ERR_NETWORK") {
        return "cannot reach github, check your connection"
    }
    return fallback
}

export default apiMessage
