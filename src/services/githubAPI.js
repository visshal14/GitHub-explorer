import axios from "axios"

const githubAxios = axios.create({
    baseURL: "https://api.github.com"
})


export const getUser = async (username) => {
    const { data } = await githubAxios.get("/users/" + username)
    return data
}

export const getRepos = async (username) => {

    const { data } = await githubAxios.get("/users/" + username + "/repos", {
        params: {
            per_page: 100,
            sort: "updated"
        }
    })

    return data
}
// <!-- ℑ♑︎  亖⌽⎭🂱⎶☀️☀️⌶⍱   -->
