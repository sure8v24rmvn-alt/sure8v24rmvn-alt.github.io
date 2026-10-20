@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo.
echo  徐鑫悦 · 个人主页   本地预览
echo  地址：http://localhost:8080/
echo  关掉这个黑窗口就停止预览
echo  （直接双击 index.html 也能看，这个脚本只是起一个本地服务器）
echo.
start "" cmd /c "timeout /t 2 >nul ^& start "" http://localhost:8080/"
where py >nul 2>nul
if %errorlevel%==0 (
  py -3 -m http.server 8080
) else (
  python -m http.server 8080
)
pause
