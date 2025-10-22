# Home Page Manager

This document describes the new Home Page Manager feature that allows teachers and principals to manage images displayed on the home page.

## Features

1. **User Authentication**: Only teachers and principals can access the Home Page Manager
2. **Image Management**: Users can:
   - Add new images to different gallery sections
   - Delete existing images
   - Reorder images using drag and drop
   - Move images between sections

3. **Gallery Sections**:
   - Main Slideshow (Hero section)
   - Sports
   - Educational
   - Competitive
   - Art
   - Activities
   - Functions

## Access

The Home Page Manager can be accessed from:
- Teacher Dashboard
- Principal Dashboard
- Teacher Profile Page

## Technical Implementation

### Files Created/Modified

1. `home-page-manager.html` - Main interface for managing home page images
2. `js/auth.js` - Authentication module for access control
3. `unauthorized.html` - Page shown to users without access
4. `test-auth.html` - Testing page for authentication

### Files Modified
1. `dashboard.html` - Added link to Home Page Manager
2. `principal-dashboard.html` - Added link to Home Page Manager
3. `teacher-profile.html` - Added link to Home Page Manager
4. `login.html` - Updated to store user info in localStorage
5. `index.html` - Updated to use images from localStorage

### How It Works

1. **Authentication**: 
   - Users must be logged in as either a teacher or principal
   - Access is controlled through the `auth.js` module
   - Unauthorized users are redirected to `unauthorized.html`

2. **Image Storage**:
   - Images are stored in the browser's localStorage
   - Each gallery section has its own key in localStorage (e.g., `gallery_hero`, `gallery_sports`)
   - Images are stored as data URLs

3. **UI Features**:
   - Drag and drop reordering within and between sections
   - Visual feedback during drag operations
   - Image previews in modals
   - Responsive design that works on all screen sizes

4. **Home Page Integration**:
   - The main `index.html` page now loads images from localStorage
   - If no images are found in localStorage, it uses default images
   - Each gallery section displays up to 5 images

## Usage Instructions

1. **Accessing the Manager**:
   - Log in as a teacher or principal
   - Navigate to the Home Page Manager from the dashboard or profile page

2. **Adding Images**:
   - Click the "Add Image" card in any section
   - Select an image file from your device
   - Click "Upload" to add the image to that section

3. **Reordering Images**:
   - Drag and drop images to reorder them within a section
   - Drag an image from one section to another to move it

4. **Deleting Images**:
   - Hover over any image to reveal the action buttons
   - Click the trash icon to delete an image
   - Confirm deletion in the modal that appears

5. **Editing Images**:
   - Hover over any image to reveal the action buttons
   - Click the edit icon to open the edit modal
   - Use the move up/down buttons to change the image's position

## Technical Notes

1. **Storage Limitations**:
   - localStorage has a limit of ~5-10MB per domain
   - Large images may cause storage issues
   - Consider implementing image compression for production use

2. **Browser Compatibility**:
   - Uses modern JavaScript features (ES6 modules)
   - Requires a modern browser with localStorage support
   - Drag and drop functionality tested on Chrome, Firefox, and Edge

3. **Security Considerations**:
   - Images are stored client-side only
   - No server-side validation of image content
   - For production, implement server-side storage and validation

4. **Performance**:
   - All operations are client-side for fast response
   - Large numbers of images may impact performance
   - Consider pagination for sections with many images

## Future Enhancements

1. **Image Editing**:
   - Add cropping, resizing, and filters
   - Implement image compression before storage

2. **Server Integration**:
   - Store images on a server instead of localStorage
   - Implement user-specific galleries

3. **Advanced Features**:
   - Add image captions and descriptions
   - Implement scheduling for image display
   - Add analytics for image engagement

4. **UI Improvements**:
   - Add search and filter capabilities
   - Implement bulk upload functionality
   - Add image tagging and categorization