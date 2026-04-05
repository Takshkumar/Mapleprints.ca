# Video Compression Script for MaplePrints
# This script compresses MP4 videos to reduce file size
# Requires: ffmpeg (download from https://ffmpeg.org/download.html)

Write-Host "Video Compression Script" -ForegroundColor Green
Write-Host "========================" -ForegroundColor Green
Write-Host ""

# Check if ffmpeg is available
$ffmpegPath = Get-Command ffmpeg -ErrorAction SilentlyContinue

if (-not $ffmpegPath) {
    Write-Host "ERROR: ffmpeg is not installed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install ffmpeg:" -ForegroundColor Yellow
    Write-Host "1. Download from: https://ffmpeg.org/download.html" -ForegroundColor Cyan
    Write-Host "2. Or use chocolatey: choco install ffmpeg" -ForegroundColor Cyan
    Write-Host "3. Or use winget: winget install ffmpeg" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "After installing, restart PowerShell and run this script again." -ForegroundColor Yellow
    exit 1
}

Write-Host "ffmpeg found! Starting compression..." -ForegroundColor Green
Write-Host ""

# Directories to compress
$directories = @(
    "resources\carousel-videos",
    "resources\recent-orders"
)

# Create backup directory
$backupDir = "resources\video-backups"
if (-not (Test-Path $backupDir)) {
    New-Item -ItemType Directory -Path $backupDir | Out-Null
}

foreach ($dir in $directories) {
    if (-not (Test-Path $dir)) {
        Write-Host "Skipping $dir - directory not found" -ForegroundColor Yellow
        continue
    }
    
    Write-Host "Processing: $dir" -ForegroundColor Cyan
    Write-Host "----------------------------------------" -ForegroundColor Cyan
    
    $videos = Get-ChildItem -Path $dir -Filter "*.mp4"
    
    if ($videos.Count -eq 0) {
        Write-Host "No videos found in $dir" -ForegroundColor Yellow
        continue
    }
    
    foreach ($video in $videos) {
        $originalSize = [math]::Round($video.Length / 1MB, 2)
        Write-Host "  Compressing: $($video.Name) (Original: $originalSize MB)" -ForegroundColor White
        
        # Backup original
        $backupPath = Join-Path $backupDir $video.Name
        Copy-Item $video.FullName $backupPath -Force
        
        # Compress video (target: <2MB, quality: good balance)
        $tempFile = $video.DirectoryName + "\" + $video.BaseName + "_compressed.mp4"
        
        # FFmpeg command: H.264 codec, CRF 28 (good quality, smaller size), preset fast
        $ffmpegArgs = "-i `"$($video.FullName)`" -c:v libx264 -crf 28 -preset fast -c:a aac -b:a 128k -movflags +faststart -f mp4 -y `"$tempFile`""
        
        $process = Start-Process -FilePath "ffmpeg" -ArgumentList $ffmpegArgs -Wait -NoNewWindow -PassThru
        
        if ($process.ExitCode -eq 0 -and (Test-Path $tempFile)) {
            $newSize = [math]::Round((Get-Item $tempFile).Length / 1MB, 2)
            $savings = [math]::Round((1 - ($newSize / $originalSize)) * 100, 1)
            
            Write-Host "    Compressed: $newSize MB (Saved: $savings%)" -ForegroundColor Green
            
            # Replace original with compressed
            Move-Item $tempFile $video.FullName -Force
        } else {
            Write-Host "    Compression failed for $($video.Name)" -ForegroundColor Red
            if (Test-Path $tempFile) {
                Remove-Item $tempFile -Force
            }
        }
    }
    
    Write-Host ""
}

Write-Host "Compression complete!" -ForegroundColor Green
Write-Host "Original videos backed up to: $backupDir" -ForegroundColor Cyan
Write-Host ""
