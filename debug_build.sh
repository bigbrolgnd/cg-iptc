#!/bin/bash
echo "Starting Debug Build..." > debug.log
echo "Node Version:" >> debug.log
node -v >> debug.log 2>&1
echo "NPM Version:" >> debug.log
npm -v >> debug.log 2>&1

echo "Cleaning artifacts..." >> debug.log
rm -rf .next out node_modules package-lock.json >> debug.log 2>&1

echo "Running npm install..." >> debug.log
npm install >> debug.log 2>&1
echo "Install Exit Code: $?" >> debug.log

echo "Running npm run build..." >> debug.log
npm run build >> debug.log 2>&1
echo "Build Exit Code: $?" >> debug.log

echo "Checking for CSS files..." >> debug.log
find out -name "*.css" >> debug.log 2>&1

echo "Checking globals.css contents..." >> debug.log
head -n 5 app/globals.css >> debug.log 2>&1

echo "Done." >> debug.log
