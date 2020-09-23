# Get the branch in GitHub Actions

If you've used Actions for long enough, you've probably run into issues with
certain workflows, actions, or other tools not knowing which branch you're "on"
in the context of certain events. This action attempts to solve this problem.
Here's how:

```yml
on:
  - deployment_status
  # - or any other action that isn't "push" or "pull_request"

jobs:
  build:
    runs-on: ubuntu-latest
    steps:

      # check out your git repo
      - uses: actions/checkout@v2

      - uses: SFDigitalServices/git-the-branch@main
        id: git-branch

      - run: |
          echo "GITHUB_REF: '$GITHUB_REF'"
          echo "steps.git-branch.outputs.branch: '${{ steps.git-branch.outputs.branch }}'"
```
