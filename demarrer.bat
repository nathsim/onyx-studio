@echo off
title onyx studio - serveur local
cd /d "%~dp0"
start "" http://localhost:4519
node server.js
pause
