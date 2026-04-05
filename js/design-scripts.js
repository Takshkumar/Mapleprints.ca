// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });

        // Add touch event for mobile
        menuToggle.addEventListener('touchstart', function(e) {
            e.preventDefault();
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
});

// Design Path Navigation
function showUploadSection() {
    document.getElementById('upload-section').classList.add('active');
    document.getElementById('design-form-section').classList.remove('active');
    document.querySelector('.design-paths').style.display = 'none';
    
    // Scroll to upload section
    document.getElementById('upload-section').scrollIntoView({ behavior: 'smooth' });
}

function showDesignForm() {
    document.getElementById('design-form-section').classList.add('active');
    document.getElementById('upload-section').classList.remove('active');
    document.querySelector('.design-paths').style.display = 'none';
    
    // Scroll to form section
    document.getElementById('design-form-section').scrollIntoView({ behavior: 'smooth' });
}

function showPathSelection() {
    document.getElementById('upload-section').classList.remove('active');
    document.getElementById('design-form-section').classList.remove('active');
    document.querySelector('.design-paths').style.display = 'grid';
    
    // Scroll to path selection
    document.querySelector('.design-paths').scrollIntoView({ behavior: 'smooth' });
}

// File Upload Enhancement
const dropZone = document.getElementById('drop-zone');
const fileUpload = document.getElementById('file-upload');
const filePreview = document.getElementById('file-preview');

// Prevent default drag behaviors
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    if (dropZone) {
        dropZone.addEventListener(eventName, preventDefaults, false);
    }
    document.body.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

// Highlight drop zone when item is dragged over it
['dragenter', 'dragover'].forEach(eventName => {
    if (dropZone) {
        dropZone.addEventListener(eventName, highlight, false);
    }
});

['dragleave', 'drop'].forEach(eventName => {
    if (dropZone) {
        dropZone.addEventListener(eventName, unhighlight, false);
    }
});

function highlight(e) {
    dropZone.classList.add('drag-over');
}

function unhighlight(e) {
    dropZone.classList.remove('drag-over');
}

// Handle dropped files
if (dropZone) {
    dropZone.addEventListener('drop', handleDrop, false);
}

function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    handleFiles(files);
}

function handleFiles(files) {
    const file = files[0];
    if (file) {
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
        const maxSize = 10 * 1024 * 1024; // 10MB
        
        if (allowedTypes.includes(file.type)) {
            if (file.size <= maxSize) {
                showFilePreview(file);
            } else {
                showUploadError('File size must be less than 10MB');
            }
        } else {
            showUploadError('Please upload only PDF, JPG, or PNG files');
        }
    }
}

function showFilePreview(file) {
    if (!filePreview) return;
    
    filePreview.style.display = 'block';
    
    if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
            filePreview.innerHTML = `
                <img src="${e.target.result}" alt="File preview" class="preview-image">
                <div class="file-info">
                    <span class="file-name">${file.name}</span>
                    <span class="file-size">${formatFileSize(file.size)}</span>
                </div>
            `;
        };
        reader.readAsDataURL(file);
    } else {
        filePreview.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">📄</div>
                <div class="file-info">
                    <span class="file-name">${file.name}</span>
                    <span class="file-size">${formatFileSize(file.size)}</span>
                </div>
            </div>
        `;
    }
}

function showUploadError(message) {
    const errorDiv = document.getElementById('upload-error');
    if (!errorDiv) return;

    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 5000);
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Set up file upload
    if (fileUpload) {
        fileUpload.addEventListener('change', (e) => {
            handleFiles(e.target.files);
        });
    }
});
