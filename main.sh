#!/bin/bash
echo "fetching branches..."
git fetch

NAME_REV=$(git name-rev --name-only "$GITHUB_SHA")
REF_BRANCH=${NAME_REV/remotes\/origin\//}

echo "GITHUB_SHA: $GITHUB_SHA"
echo "NAME_REV: $NAME_REV"
echo "REF_BRANCH: $REF_BRANCH"

echo "::set-output name=branch::$REF_BRANCH"
echo "::set-output name=ref::refs/heads/$REF_BRANCH"
echo "::set-env name=GITHUB_REF::refs/heads/$REF_BRANCH"
echo "::set-env name=GIT_BRANCH::$REF_BRANCH"
