// Test script for Home Page Manager functionality

// Function to set a test user in localStorage
function setTestUser() {
    const user = {
        email: 'principal@school.com',
        role: 'principal',
        name: 'Test Principal'
    };
    localStorage.setItem('currentUser', JSON.stringify(user));
    console.log('Test user set in localStorage');
}

// Function to check if user is properly set
function checkUser() {
    const userStr = localStorage.getItem('currentUser');
    if (userStr) {
        const user = JSON.parse(userStr);
        console.log('Current user:', user);
        return user;
    } else {
        console.log('No user found in localStorage');
        return null;
    }
}

// Function to set some test gallery images
function setTestGalleryImages() {
    const testImages = [
        'https://images.pexels.com/photos/256455/pexels-photo-256455.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/1720184/pexels-photo-1720184.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/265076/pexels-photo-265076.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ];
    
    localStorage.setItem('gallery_hero', JSON.stringify(testImages));
    console.log('Test gallery images set for hero section');
}

// Function to check gallery images
function checkGalleryImages() {
    const galleryKeys = Object.keys(localStorage).filter(key => key.startsWith('gallery_'));
    console.log('Gallery sections found:', galleryKeys);
    
    galleryKeys.forEach(key => {
        const images = localStorage.getItem(key);
        console.log(`${key}:`, images ? JSON.parse(images).length : 0, 'images');
    });
}

// Function to test auth module
function testAuthModule() {
    // Import auth module
    import('/js/auth.js').then((module) => {
        const authManager = module.default;
        
        console.log('=== Auth Module Test ===');
        console.log('Current user:', authManager.getCurrentUser());
        console.log('Is authenticated:', authManager.isAuthenticated());
        console.log('Is teacher:', authManager.isTeacher());
        console.log('Is principal:', authManager.isPrincipal());
        console.log('Can access home page manager:', authManager.canAccessHomePageManager());
        console.log('=== Test Complete ===');
    }).catch((error) => {
        console.error('Error importing auth module:', error);
    });
}

// Run tests
console.log('=== Home Page Manager Test ===');
setTestUser();
checkUser();
setTestGalleryImages();
checkGalleryImages();
testAuthModule();
console.log('=== Test Complete ===');