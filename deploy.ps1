#!/usr/bin/env pwsh
# Deployment script for GitHub Pages

Write-Host "Building the application..." -ForegroundColor Green
npm run build

Write-Host "Adding images to build..." -ForegroundColor Green
# Copy images to dist with the expected filenames from the build
Copy-Item "src\assets\logo.png" "dist\assets\logo-CTUL2qC9.png" -Force
Copy-Item "src\assets\mainpic.png" "dist\assets\mainpic-BtbLI4Xp.png" -Force

Write-Host "Adding images to build..." -ForegroundColor Green
# Copy images to dist with the expected filenames from the build
Copy-Item "src\assets\logo.png" "dist\assets\logo-CTUL2qC9.png" -Force
Copy-Item "src\assets\mainpic.png" "dist\assets\mainpic-BtbLI4Xp.png" -Force

Write-Host "Cleaning up old built files..." -ForegroundColor Yellow
# Remove old built files (but keep source files)
if (Test-Path "assets") {
    Remove-Item "assets\index-*.js" -Force -ErrorAction SilentlyContinue
    Remove-Item "assets\index-*.css" -Force -ErrorAction SilentlyContinue
    Remove-Item "assets\logo-*.png" -Force -ErrorAction SilentlyContinue
    Remove-Item "assets\mainpic-*.png" -Force -ErrorAction SilentlyContinue
}
Remove-Item "index.html" -Force -ErrorAction SilentlyContinue
Remove-Item "vite.svg" -Force -ErrorAction SilentlyContinue

Write-Host "Copying new files to root..." -ForegroundColor Green
Copy-Item -Path "dist\*" -Destination "." -Recurse -Force

Write-Host "Committing changes..." -ForegroundColor Green
git add .
git commit -m "Deploy: Updating website with latest changes"

Write-Host "Pushing to GitHub..." -ForegroundColor Green
git push origin master

Write-Host "Deployment complete! Your site will update in 1-2 minutes." -ForegroundColor Green
