# Quick Reference - Image Editing Features

## 🎯 Feature Comparison

| Feature | Gallery Manager | Home Page Manager |
|---------|-----------------|------------------|
| Upload Images | ✅ | ✅ |
| Delete Images | ✅ | ✅ |
| Crop Images | ✅ | ❌ |
| Resize Images | ✅ | ❌ |
| Adjust Brightness | ✅ | ❌ |
| Adjust Contrast | ✅ | ❌ |
| Adjust Saturation | ✅ | ❌ |
| Rotate Images | ✅ | ❌ |
| Flip Images | ✅ | ❌ |
| Edit Metadata | ✅ | ❌ |
| Drag & Drop Reorder | ✅ | ✅ |
| Move Between Sections | ❌ | ✅ |
| Real-Time Preview | ✅ | ❌ |
| Edit History | ✅ | ❌ |

---

## 📚 File Structure

```
saralshala/
├── image-gallery-manager.html    # Professional image editor
├── home-page-manager.html        # Home page gallery manager
├── index.html                     # Main home page with galleries
├── server.js                      # Server on port 3003
├── js/
│   └── auth.js                    # Authentication module
├── lib/
│   └── supabaseClient.js          # Supabase configuration
└── supabase/
    ├── functions/
    │   └── send-sms-alert/        # SMS notification function
    └── migrations/
        ├── 0001_auth_enhancements.sql
        ├── 0002_create_attendance_table.sql
        └── 0003_gallery_management.sql
```

---

## 🔑 Key Functions

### Image Editing
```javascript
// Edit an image
editImage(image)

// Save changes
saveChanges()

// Generate edited image with all transforms
generateEditedImage()

// Update preview in real-time
updatePreview()

// Reset adjustments to defaults
resetAdjustments()
```

### Image Management
```javascript
// Upload new images
uploadImages(files)

// Delete an image
deleteImage(image)

// Reorder images
handleDrop(event, section)

// Save order to database
saveOrder()
```

---

## 🎨 Editing Modes

| Mode | Description | Usage |
|------|-------------|-------|
| **Crop** | Precise image cropping with guides | Click "Start Cropping" button |
| **Resize** | Change dimensions with aspect ratio control | Input width/height values |
| **Adjust** | Brightness, contrast, saturation, hue | Use slider controls (0-200% or 0-360°) |
| **Rotate** | 90° rotation and flipping | Click rotation/flip buttons |
| **Info** | Edit title, description, alt text | Type in text fields |

---

## 🚀 Quick Start

### For Gallery Manager:
```
1. Navigate to: http://localhost:3003/image-gallery-manager.html
2. Login as teacher or principal
3. Select a category
4. Click edit on any image
5. Make adjustments with real-time preview
6. Click "Save Changes"
```

### For Home Page Manager:
```
1. Navigate to: http://localhost:3003/home-page-manager.html
2. Login as teacher or principal
3. Click "Add Image" in any section
4. Upload and customize
5. Use drag-and-drop to reorder
```

---

## 💾 Data Storage

### Images are stored in:
- **Supabase Storage**: `gallery-images/` bucket
- **Database**: `gallery_images` table
- **Edit History**: `gallery_edit_history` table

### Home Page images stored in:
- **Browser localStorage**: `gallery_hero`, `gallery_sports`, etc.
- **Fallback**: Default images if localStorage empty

---

## 🔒 Authentication

Only accessible to:
- Teachers
- Principals

**Not accessible to:**
- Students
- Unauthenticated users
- Other roles

---

## 📊 Image Processing

**Input**: Any image format (PNG, JPG, WebP, GIF, etc.)
**Output**: JPEG at 90% quality
**Max Size**: 10MB per upload
**Canvas Dimensions**: User-specified (100-2000px)

---

## ⚡ Performance Tips

1. Use aspect ratio lock to speed up resizing
2. Keep images under 5MB for faster processing
3. Crop before resizing to reduce file size
4. Use saturated colors for better visual impact
5. Add descriptive alt text for accessibility

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Port already in use | Change port in server.js |
| Images not loading | Check Supabase bucket permissions |
| Preview not updating | Refresh page or clear browser cache |
| Edit changes not saving | Ensure you're logged in and have permissions |
| Crop not working | Use "Start Cropping" button first |

---

## 📞 Support

For issues or questions:
1. Check GALLERY_MANAGER_COMPLETE.md
2. Review IMAGE_EDITING_FEATURES.md
3. Check browser console for errors
4. Verify authentication status


