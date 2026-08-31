# GitHub Profile & Repo Explorer

Type in any public GitHub username and the app pulls the profile and all the
repositories from the GitHub API, then lets you dig through them — search, sort,
filter by language, and see what the person actually writes code in.

- **Frontend** — React (Vite) + plain CSS
- **Data** — GitHub REST API, no backend

## What it does

- profile details, avatar, bio, location, company, followers and following
- total stars and total forks added up across every public repo
- a language breakdown bar built from the repos, click a language to filter by it
- search repositories by name or description
- sort by recent activity, stars, forks or name, and hide forks if you want
- the last 6 profiles you looked at are kept in localStorage so you can jump back

## Run it

```bash
npm install
npm run dev
```

Opens on http://localhost:5173

To build:

```bash
npm run build
npm run preview
```

## About the rate limit

> The GitHub API is called without a token, which gives you **60 requests an
> hour from your IP**. Each search uses two of them, one for the profile and one
> for the repos. If you sit there searching a lot of usernames you will hit it,
> and the app will tell you to wait a few minutes. It is not broken, github is
> just counting. Waiting an hour resets it.

Only the first 100 repos of a user are fetched, which covers almost everybody.

## Folders

```
src/
  App.jsx           the search box, the fetching, the recent list
  index.css         all of the styling
  Components/
    Profile.jsx     avatar, bio and the three stat boxes
    Repos.jsx       language bar, the filters and the repo cards
    Recent.jsx      recently searched profiles
  services/
    githubAPI.js    the two api calls
  utils/
    apiMessage.js   turns an axios error into something readable
    recent.js       localStorage read and write
    repoStats.js    language counting, sorting, dates and number formatting
```
