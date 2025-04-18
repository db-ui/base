#!/usr/bin/env bash

# SPDX-FileCopyrightText: 2025 DB Systel GmbH
#
# SPDX-License-Identifier: Apache-2.0

if [[ $GITHUB_REF == refs/tags/v*  ]]
then
	if [[ $GITHUB_ACTOR != 'dependabot[bot]' ]]
	then
		if [[ ( $GITHUB_COMMITISH == 'main' || $GITHUB_COMMITISH == 'release-branch') && $GITHUB_PRE_RELEASE == false ]]
		then
		  echo "RELEASE"
		else
		  echo "PRE_RELEASE"
		fi
	else
		echo "Dependabot has no permission to publish!"
		exit 1
	fi
else
	echo "Your tag has to start with 'v'"
	exit 1
fi
