---
title: "My Mac OSX Setup"
excerpt: "Some snippets for my reference."
created_at: 2019-01-15T00:00:00.000Z
lang: en
---

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
brew doctor
brew cask
brew tap caskroom/versions
brew install curl
brew install git
brew install wget
brew cask install sublime-text
brew cask install iterm2
brew cask install sourcetree
brew cask install discord
brew cask install google-chrome
brew cask install iterm2
brew cask install insomniax
brew cask install insomnia
brew cask install dropbox
brew cask install kap
brew cask install slack
brew cask install appcleaner
brew tap caskroom/fonts
brew cask install font-fira-code font-inter-ui
```

## Ruby

```bash
brew install rbenv ruby-build
echo 'eval "$(rbenv init -)"' >> ~/.bash_profile
source ~/.bash_profile
curl -fsSL https://github.com/rbenv/rbenv-installer/raw/master/bin/rbenv-doctor | bash
rbenv install 2.5.1 && rbenv global 2.5.1
```

```ruby
# ~/.irbrc

require "irb/completion"
require "irb/ext/save-history"
IRB.conf[:SAVE_HISTORY] = 10000
require "awesome_print"
AwesomePrint.irb!
```

## Node.js

```bash
brew install nodenv node-build
echo 'eval "$(nodenv init -)"' >> ~/.bash_profile
source ~/.bash_profile
nodenv install 8.11.1 && nodenv global 8.11.1
```

## PostgreSQL

```bash
brew install postgresql
brew services start postgresql
createdb $(whoami)
sudo -u $(whoami) psql $(whoami)
```

```sql
CREATE USER postgres SUPERUSER;
CREATE DATABASE postgres WITH OWNER postgres;
ALTER ROLE postgres WITH PASSWORD 'postgrespw';
```

## Bash

### Bash Prompt

```bash
cd ~/
curl https://raw.githubusercontent.com/nicolashery/mac-dev-setup/master/.bash_prompt | grep -v "export PS1" > .bash_prompt
echo "source ~/.bash_prompt" >> ~/.bash_profile
```

```bash
# ~/.bash_profile

alias ll='ls -l'
alias f='open -a Finder ./'
alias d='cd ~/Downloads'
alias gs='git status'
alias gac='git add . && git commit'
alias gp='git push'
alias gdf='git diff'
alias gpl='git pull'
alias gl='git log --graph --pretty=format:"%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset" --abbrev-commit'
```

## GitHub

### SSH

```bash
ssh-keygen -t rsa -C "karis612@gmail.com"
cat ~/.ssh/id_rsa.pub | pbcopy && open "https://github.com/settings/keys"
```

### Config

```bash
git config --global user.name "Eunjae Lee"
git config --global user.email "xxx@xxx.com"
git config --global github.user eunjae-lee
git config --global color.ui true
```

## Setapp

- CleanShot X
- Rocket Typist
- Lungo
- Bartender
- TextSniper
- Unite
- Sip
- AirBuddy
- CleanMyMac X

## Mac OSX

```bash
# Set a blazingly fast keyboard repeat rate
defaults write NSGlobalDomain KeyRepeat -int 0.02

# Set a shorter Delay until key repeat
defaults write NSGlobalDomain InitialKeyRepeat -int 12

# Add a context menu item for showing the Web Inspector in web views
defaults write NSGlobalDomain WebKitDeveloperExtras -bool true

# Show the ~/Library folder
chflags nohidden ~/Library

# Store screenshots in subfolder on desktop
mkdir ~/Desktop/Screenshots
defaults write com.apple.screencapture location ~/Desktop/Screenshots
```

- Trackpad

## VSCode

```bash
brew cask install visual-studio-code

2gua.rainbow-brackets
dbaeumer.vscode-eslint
eamodio.gitlens
eg2.tslint
eg2.vscode-npm-script
esbenp.prettier-vscode
k--kato.intellij-idea-keybindings
mohsen1.prettify-json
octref.vetur
sysoev.language-stylus
VisualStudioExptTeam.vscodeintellicode
wmaurer.change-case
```

```json
{
  "git.autofetch": true,
  "editor.fontFamily": "Fira Code",
  "editor.tabSize": 2,
  "editor.renderWhitespace": "boundary",
  "editor.fontLigatures": true,
  "editor.fontSize": 18,
  "editor.detectIndentation": false,
  "workbench.colorTheme": "Monokai Dimmed",
  "files.autoSave": "off",
  "terminal.integrated.scrollback": 100000,
  "terminal.integrated.shellArgs.osx": ["-l"],
  "editor.formatOnSave": true,
  "explorer.confirmDragAndDrop": false,
  "explorer.confirmDelete": false,
  "workbench.editor.enablePreview": false,
  "editor.multiCursorModifier": "ctrlCmd",
  "editor.rulers": [80, 120],
  "typescript.updateImportsOnFileMove.enabled": "always",
  "gitlens.advanced.messages": {
    "suppressShowKeyBindingsNotice": true
  },
  "gitlens.currentLine.enabled": false,
  "gitlens.hovers.currentLine.over": "line",
  "gitlens.codeLens.enabled": false,
  "breadcrumbs.enabled": true,
  "window.zoomLevel": 0,
  "git.alwaysShowStagedChangesResourceGroup": true,
  "javascript.updateImportsOnFileMove.enabled": "always"
}
```

settings.json

## Other Apps

[Cron | Early access](https://cron.com/)

[DaVinci Resolve 18 | Blackmagic Design](https://www.blackmagicdesign.com/products/davinciresolve)

[Keyboard Maestro 10.1.1: Work Faster with Macros for macOS](https://www.keyboardmaestro.com/main/)

[Krisp - Noise Cancellation and Echo Removal](https://krisp.ai/)

[LanguageTool - Online Grammar, Style & Spell Checker](https://languagetool.org/)

[Open Broadcaster Software | OBS](https://obsproject.com/)

