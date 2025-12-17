#!/bin/bash
export PATH=$PATH:./node_modules/.bin
echo "Starting Deployment..." > deploy.log

# Cleanup
echo "Cleaning..." >> deploy.log
rm -rf .next out dist node_modules/.cache >> deploy.log 2>&1

# Build
echo "Building..." >> deploy.log
npx next build >> deploy.log 2>&1
BUILD_STATUS=$?
echo "Build Status: $BUILD_STATUS" >> deploy.log

if [ $BUILD_STATUS -ne 0 ]; then
  echo "Build Failed!" >> deploy.log
  exit 1
fi

# Serve
echo "Serving on 3005..." >> deploy.log
# Using nohup to detach properly
nohup npx serve@latest -l 3005 out >> serve_3005.log 2>&1 &
echo "Server PID: $!" >> deploy.log
echo "Done." >> deploy.log
