# Project Repo: expo-camera-with-firebase-build-error

Prerequisites and Setup/Run used with Windows 11 OS

## Prerequisites

- git
- Visual Studio Code
- Nodejs (v24.13.0)
- java jdk version 17 minimum
- android studio similator

## Setup and Run Project

- Open powershell in the directory you want to clone the project
- Execute command: `git clone https://github.com/jamespageced/expo-camera-with-firebase-build-error.git`
- Execute command: `cd .\expo-camera-with-firebase-build-error\`
- select the branch("main", or "failure", or "success") to run the project with
  - stay on the main branch
  - or
  - Execute command: `git checkout failure`
  - or
  - Execute command: `git checkout success`
    - note: no solution is yet provided for the issue shown in the failure branch
- Execute command: `npm install`
- Execute command: `npm run dev-android` (for mac: `npm run dev-ios`)

### failure branch

Notice the error in powershell after running the command `npm run dev-android`...

![powershell - npm run dev-android -> fails](https://github.com/jamespageced/expo-camera-with-firebase-build-error/blob/main/assets/expo-camera-firebase-npm-run-build-failure.png?raw=true)

**See temporary workarounds to get project to allowed to build and run below**

- note: these temporary workarounds are not solutions, because neither allow for both expo-camera and firebase to run together

1. Disable firebase plugin
  - in the file app.config.js, comment out the lines `\\ ['@react-native-firebase/app'],` and `\\ ['@react-native-firebase/crashlytics'],`
  - back in powershell, execute command: `npm run dev-android`

2. Disable expo-camera plugin
  - in the file package.json, delete the line `"expo-camera": "~16.1.11",`
  - delete the file package-lock.json
  - delete the node_modules folder (and the folders ".expo" and "android" if they exist)
  - back in powershell, execute command: `npm install`
  - execute command: `npm run dev-android`

### success branch

ToDo...
