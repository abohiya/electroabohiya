@echo off
echo 🚀 Cleaning Next.js and npm cache...

REM الذهاب إلى مجلد المشروع
cd /d %~dp0

REM حذف مجلد .next
echo 🔄 Removing .next folder...
rmdir /s /q .next

REM تنظيف كاش npm
echo 🧹 Cleaning npm cache...
npm cache clean --force

REM بدء تشغيل السيرفر
echo 🚦 Starting development server...
npm run dev

pause
