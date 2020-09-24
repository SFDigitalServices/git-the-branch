const { getInput, exportVariable, setOutput } = require('@actions/core')
const { spawnSync } = require('child_process')

const git = (cmd, args = []) => {
  return spawnSync('git', [cmd, ...args], {
    stdio: ['ignore', 'pipe', 'inherit'],
    encoding: 'utf8',
  }).stdout.trim()
}

git('fetch')

const { GITHUB_SHA } = process.env
const nameRev = git('name-rev', ['--name-only', GITHUB_SHA])
const branch = nameRev.replace('remotes/origin/', '')
const ref = `refs/heads/${branch}`

setOutput('branch', branch)
setOutput('ref', ref)
exportVariable('GIT_BRANCH', branch)
exportVariable('GITHUB_REF', ref)

if (getInput('checkout') === true) {
  git('checkout', [branch])
}
