@echo off
echo ========================================
echo    BBE NGO - Image Copy Tool
echo ========================================
echo.

echo This tool will help you copy images to your project's public folder.
echo.

:select_folder
echo Please select the folder containing your images:
echo 1. Browse for folder
echo 2. Use current directory
echo 3. Exit
echo.
set /p choice="Enter your choice (1-3): "

if "%choice%"=="1" goto browse_folder
if "%choice%"=="2" goto use_current
if "%choice%"=="3" goto exit
echo Invalid choice. Please try again.
goto select_folder

:browse_folder
set /p source_folder="Enter the path to your images folder: "
if not exist "%source_folder%" (
    echo Error: Folder does not exist!
    goto select_folder
)
goto copy_files

:use_current
set source_folder=%cd%
echo Using current directory: %source_folder%
goto copy_files

:copy_files
echo.
echo Copying images from: %source_folder%
echo To: public folder
echo.

if not exist "public" (
    echo Creating public folder...
    mkdir public
)

echo Copying image files...
for %%f in ("%source_folder%\*.png" "%source_folder%\*.jpg" "%source_folder%\*.jpeg" "%source_folder%\*.gif" "%source_folder%\*.svg" "%source_folder%\*.webp") do (
    if exist "%%f" (
        echo Copying: %%~nxf
        copy "%%f" "public\%%~nxf" >nul
        if !errorlevel! equ 0 (
            echo   ✓ Successfully copied
        ) else (
            echo   ✗ Failed to copy
        )
    )
)

echo.
echo ========================================
echo Copy operation completed!
echo ========================================
echo.
echo Missing images that were detected in your project:
echo - bbe-logo.png
echo - placeholder.png  
echo - placeholder.svg
echo.
echo If you have these images, make sure they are named exactly as shown above.
echo.
pause

:exit
exit 