<p align="center">
  <img src="https://barbhackk.github.io/rekord/src/assets/icons/png/128x128.png" width="128" title="Rekord" alt="logo">
</p>

# About
Rekord is an application for download YouTube videos and convert them to MP3.
The latter is running on electron and Angular

# Use
Launch the app and copy any Youtube link with the right mouse button or with the combination [Ctrl] + c on Windows and Linux, [cmd] + c on Mac.

No need to past Youtube link into the application. This automatically captures all youtube links validating copy in the clipboard. When this is the case, it displays the video information. Just click on the red 'save' button.

A 'download' folder is created at the root of the project.

# Install
To clone and run this repository, you'll need Git and Node.js (which comes with npm) installed on your computer. From your command line:

```
# Clone this repository
git clone https://github.com/barbhackk/rekord.git
# Go into the repository
cd rekord
# Install dependencies
npm install
```

## Development server
This app works with a local environment variable system. This config is in .env file.
For development, set variables like this:

```
PACKAGE=false
HOST=http://localhost:4200/
```

Run in first terminal `npm run start` for a dev server. In second terminal run `npm run electron`.

The app will automatically reload if you change any of the source files.

## Build

Set variables like this:

```
PACKAGE=true
HOST=http://localhost:4200/
```

Run `npm run electron-build`.
The build artifacts will be stored in the `dist/` directory with a production build.

# Warning : 
  > This app is not a hacking tool. In case you are tempted to use Rekord to download nonfree music, you have an original copy at home. In addition, I created this application to show what I can do in application development using Angular. I therefore release myself from all responsabilities in case of improper use of this application :+1:
