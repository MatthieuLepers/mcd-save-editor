# MCD Save Editor

[![GitHub release](https://img.shields.io/badge/Version-1.4.0-blue)](https://github.com/MatthieuLepers/mcd-save-editor/releases/latest)
[![GitHub release](https://img.shields.io/badge/Game%20version-1.12.1.0-blue)](#) [![GitHub release](https://img.shields.io/badge/License-GNU%20GPLv3-blue)](https://www.gnu.org/licenses/gpl-3.0.en.html)

A Minecraft Dungeons Save Editor for Windows users.

---

## Installation

Download and install [the latest release](https://github.com/MatthieuLepers/mcd-save-editor/releases/download/v1.4.0/MCD.Save.Editor.v1.4.0.exe).

I included a how to use tutorial directly into the app, have a look to the "?" at top right.

---

## Contributing
**/!\ You should read this part before contributing /!\\**

### Installation
Just clone the repository, run `npm install` to install all node dependencies, then run `npm run dev` to start the application.

The application loads automatically all Minecraft Dunegons saves located at `%homepath%\Saved Games\Mojang Studios\Dungeons`, if you don't have any, the app will notice you.

### Pull requests
Please apply the naming convention when you create a branch:
- Create your branch from `develop`
- For new feature, name your branch as `feature/{your-feature-name}`
- For bug fix, name your branch as `fix/issue-{issue-number}` or `fix/{whatever-you-fixed}`
- I'm using gitmoji for all commit, so please use it too when you commit anything

Use `develop` branch as target branch for your pull requests. To contribute properly, try to have as few commits as possible, you can use `git squash` to help you group your commits.

### Bug report
To report any bug, make an issue using the "Bug issue template" and follow the template instructions.

### Features
To make a feature or a request, make an issue using the "Feature issue template" and follow the template instructions.

---

## Disclaimer
This project is not affiliated with the game and or publishers. All rights reserved

This project was generated with a modified version of [electron-vue](https://github.com/SimulatedGREG/electron-vue)@[45a3e22](https://github.com/SimulatedGREG/electron-vue/tree/45a3e224e7bb8fc71909021ccfdcfec0f461f634) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
