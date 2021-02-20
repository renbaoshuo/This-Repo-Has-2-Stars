require('dotenv').config()
const { Octokit } = require('@octokit/rest');

const octokit = new Octokit({
    auth: process.env.GH_TOKEN,
});

const getRepoStars = () => {
    return octokit.request('GET /repositories/:id', {
        id: process.env.REPO_ID
    }).then(repo => repo.data.stargazers_count);
};

const renameRepo = (name) => {
    return octokit.request('PATCH /repositories/:id', {
        id: process.env.REPO_ID,
        name,
    });
};

const main = async () => {
    try {
        const stars = await getRepoStars();
        await renameRepo(`This-Repo-Has-${stars}-Stars`);
    } catch (err) {
        console.log(err);
    }
}

main();
