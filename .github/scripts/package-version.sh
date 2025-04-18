#!/usr/bin/env bash

# SPDX-FileCopyrightText: 2025 DB Systel GmbH
#
# SPDX-License-Identifier: Apache-2.0

SEMVER_VERSION=$(npx --no find-versions-cli "$TAG")
if [[ $RELEASE == "true" ]]
then
  if [[ $SEMVER_VERSION == *-* ]]
  then
    echo "Version $SEMVER_VERSION contains hyphen, maybe you forgot to check the prerelease checkbox in github. A release should not have a hyphen!"
    exit 1
  fi
  echo "$SEMVER_VERSION"
elif [[ $PRE_RELEASE == "true" ]]
then
  GITHUB_SHA_SHORT=$(echo "$GITHUB_SHA" | cut -c1-7)
  VALID_SEMVER_VERSION=$(echo "$SEMVER_VERSION"-"$GITHUB_SHA_SHORT")
  echo "$VALID_SEMVER_VERSION"
else
  echo "nothing found in environment for RELEASE or PRE_RELEASE"
  exit 1
fi
