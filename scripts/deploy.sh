#!/bin/sh
set -e

# setup ssh-agent and provide the GitHub deploy key
openssl aes-256-cbc -K $encrypted_81d78f03d434_key -iv $encrypted_81d78f03d434_iv -in id_ed25519.pub.enc -out id_ed25519.pub -d

# 对解密后的私钥添加权限
chmod 600 deploy

# 启动 ssh-agent
eval "$(ssh-agent -s)"

ssh-add deploy

# 删除解密后的私钥
rm deploy

git config --global user.name 'Travis'
git config --global user.email 'travis@travis-ci.com'

# commit the assets in docs-dist/ to the gh-pages branch and push to GitHub using SSH
./node_modules/.bin/gh-pages -d docs-dist/ -b gh-pages -r git@github.com:${TRAVIS_REPO_SLUG}.git
