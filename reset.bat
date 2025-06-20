@echo off
echo 🚀 Starting full cleanup and rebuild...

REM الانتقال إلى مجلد المشروع
cd /d %~dp0

REM حذف مجلد .next بالكامل
echo 🧹 Deleting .next cache folder...
rmdir /s /q .next

REM حذف كاش Webpack داخل Next
echo 🧼 Deleting .next/cache ...
rmdir /s /q .next\cache

REM حذف node_modules
echo 🔥 Deleting node_modules...
rmdir /s /q node_modules

REM حذف package-lock.json (اختياري)
echo 🔃 Deleting package-lock.json...
del package-lock.json

REM إعادة تثبيت الحزم
echo ⏳ Installing packages...
npm install

REM بدء السيرفر
echo 🚦 Starting development server...
npm run dev

pause
