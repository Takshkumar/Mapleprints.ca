# Video Compression Guide

## ✅ Video Folder Consolidation Complete!

Your videos have been consolidated into 2 folders:
- **`resources/carousel-videos/`** - For home page and package page carousels (5 videos)
- **`resources/recent-orders/`** - For recent orders section (5 videos)

## 📦 Compress Videos to Reduce Size

To reduce video file sizes (target: <2MB each), you have two options:

### Option 1: Use the Compression Script (Recommended)

1. **Install FFmpeg** (if not already installed):
   ```powershell
   # Using winget (Windows 10/11)
   winget install ffmpeg
   
   # OR using chocolatey
   choco install ffmpeg
   
   # OR download manually from: https://ffmpeg.org/download.html
   ```

2. **Run the compression script**:
   ```powershell
   .\compress-videos.ps1
   ```

   The script will:
   - Backup original videos to `resources/video-backups/`
   - Compress all videos in both folders
   - Show compression progress and file size savings

### Option 2: Manual Compression with FFmpeg

If you prefer to compress manually:

```powershell
# Navigate to video folder
cd resources\carousel-videos

# Compress each video (replace 1.mp4 with actual filename)
ffmpeg -i 1.mp4 -c:v libx264 -crf 28 -preset fast -c:a aac -b:a 128k -movflags +faststart 1_compressed.mp4

# Repeat for all videos, then replace originals
```

### Option 3: Online Compression Tools

If you don't want to install FFmpeg, you can use online tools:
- **CloudConvert**: https://cloudconvert.com/mp4-compressor
- **FreeConvert**: https://www.freeconvert.com/mp4-compressor
- **Clideo**: https://clideo.com/compress-video

Upload videos, compress, and download the compressed versions.

## 📊 Current Video Sizes

Check current sizes:
```powershell
Get-ChildItem resources\carousel-videos\*.mp4 | Select-Object Name, @{Name="Size(MB)";Expression={[math]::Round($_.Length/1MB, 2)}}
Get-ChildItem resources\recent-orders\*.mp4 | Select-Object Name, @{Name="Size(MB)";Expression={[math]::Round($_.Length/1MB, 2)}}
```

## 🎯 Target Sizes

- **Carousel videos**: <2MB each (for faster page loads)
- **Recent orders videos**: <2MB each

## ✅ After Compression

1. Test your website to ensure videos still play correctly
2. Commit the compressed videos:
   ```powershell
   git add resources/carousel-videos/*.mp4
   git add resources/recent-orders/*.mp4
   git commit -m "Compress videos to reduce file sizes"
   git push origin main
   ```

## 📝 Notes

- Original videos are backed up in `resources/video-backups/` (if using the script)
- Compression uses H.264 codec with CRF 28 (good quality/size balance)
- Videos will maintain good visual quality while being much smaller

