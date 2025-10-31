/**
 * Service Worker for School Admin System
 * Provides offline support and caching functionality
 */

const CACHE_NAME = 'school-admin-v1.0.0';
const STATIC_CACHE_NAME = 'school-admin-static-v1.0.0';
const DYNAMIC_CACHE_NAME = 'school-admin-dynamic-v1.0.0';

// Files to cache for offline functionality
const STATIC_FILES = [
    '/',
    '/index.html',
    '/login.html',
    '/dashboard.html',
    '/principal-dashboard.html',
    '/attendance.html',
    '/gradebook.html',
    '/teacher-profile.html',
    '/teacher-timetable.html',
    '/teacher-notices.html',
    '/student-management.html',
    '/bulk-attendance-upload.html',
    '/bulk-grade-upload.html',
    '/home-page-manager.html',
    '/sms-configuration.html',
    '/js/auth-service.js',
    '/js/sms-service.js',
    '/lib/supabaseClient.js',
    'https://cdn.tailwindcss.com',
    'https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js'
];

// API endpoints that should be cached
const API_CACHE_PATTERNS = [
    /\/api\/attendance/,
    /\/api\/students/,
    /\/api\/grades/,
    /\/api\/notices/
];

// Install event - cache static files
self.addEventListener('install', (event) => {
    console.log('Service Worker installing...');
    
    event.waitUntil(
        caches.open(STATIC_CACHE_NAME)
            .then((cache) => {
                console.log('Caching static files...');
                return cache.addAll(STATIC_FILES);
            })
            .then(() => {
                console.log('Static files cached successfully');
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('Error caching static files:', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('Service Worker activating...');
    
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== STATIC_CACHE_NAME && 
                            cacheName !== DYNAMIC_CACHE_NAME) {
                            console.log('Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('Service Worker activated');
                return self.clients.claim();
            })
    );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }
    
    // Skip chrome-extension and other non-http requests
    if (!url.protocol.startsWith('http')) {
        return;
    }
    
    event.respondWith(
        handleRequest(request)
    );
});

/**
 * Handle different types of requests
 */
async function handleRequest(request) {
    const url = new URL(request.url);
    
    // Handle API requests
    if (url.pathname.startsWith('/api/')) {
        return handleAPIRequest(request);
    }
    
    // Handle static files
    if (isStaticFile(url.pathname)) {
        return handleStaticRequest(request);
    }
    
    // Handle HTML pages
    if (url.pathname.endsWith('.html') || url.pathname === '/') {
        return handleHTMLRequest(request);
    }
    
    // Default: try network first, then cache
    return networkFirst(request);
}

/**
 * Handle API requests with cache-first strategy
 */
async function handleAPIRequest(request) {
    try {
        // Try cache first for API requests
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            // Return cached response and update in background
            updateCacheInBackground(request);
            return cachedResponse;
        }
        
        // If not in cache, try network
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            // Cache successful responses
            const cache = await caches.open(DYNAMIC_CACHE_NAME);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.log('API request failed, serving from cache:', request.url);
        
        // Return cached response if available
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // Return offline response for API requests
        return new Response(
            JSON.stringify({ 
                error: 'Offline', 
                message: 'This request is not available offline' 
            }),
            { 
                status: 503, 
                statusText: 'Service Unavailable',
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
}

/**
 * Handle static file requests
 */
async function handleStaticRequest(request) {
    try {
        // Try cache first for static files
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // If not in cache, try network
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            // Cache static files
            const cache = await caches.open(STATIC_CACHE_NAME);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.log('Static file request failed:', request.url);
        
        // Return cached response if available
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // Return 404 for missing static files
        return new Response('File not found', { status: 404 });
    }
}

/**
 * Handle HTML page requests
 */
async function handleHTMLRequest(request) {
    try {
        // Try network first for HTML pages
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            // Cache HTML pages
            const cache = await caches.open(DYNAMIC_CACHE_NAME);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.log('HTML request failed, serving from cache:', request.url);
        
        // Return cached response if available
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // Return offline page
        return caches.match('/offline.html') || 
               new Response('Offline - Please check your internet connection', { 
                   status: 503 
               });
    }
}

/**
 * Network first strategy
 */
async function networkFirst(request) {
    try {
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            // Cache successful responses
            const cache = await caches.open(DYNAMIC_CACHE_NAME);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.log('Network request failed, serving from cache:', request.url);
        
        // Return cached response if available
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        throw error;
    }
}

/**
 * Update cache in background
 */
async function updateCacheInBackground(request) {
    try {
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const cache = await caches.open(DYNAMIC_CACHE_NAME);
            cache.put(request, networkResponse.clone());
        }
    } catch (error) {
        console.log('Background cache update failed:', request.url);
    }
}

/**
 * Check if file is static
 */
function isStaticFile(pathname) {
    const staticExtensions = ['.js', '.css', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.woff', '.woff2'];
    return staticExtensions.some(ext => pathname.endsWith(ext));
}

/**
 * Background sync for offline data
 */
self.addEventListener('sync', (event) => {
    console.log('Background sync triggered:', event.tag);
    
    if (event.tag === 'attendance-sync') {
        event.waitUntil(syncAttendanceData());
    } else if (event.tag === 'grades-sync') {
        event.waitUntil(syncGradesData());
    }
});

/**
 * Sync attendance data when back online
 */
async function syncAttendanceData() {
    try {
        const pendingAttendance = await getPendingAttendance();
        
        for (const attendance of pendingAttendance) {
            try {
                const response = await fetch('/api/attendance', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(attendance)
                });
                
                if (response.ok) {
                    // Remove from pending
                    await removePendingAttendance(attendance.id);
                    console.log('Attendance synced:', attendance.id);
                }
            } catch (error) {
                console.error('Failed to sync attendance:', attendance.id, error);
            }
        }
    } catch (error) {
        console.error('Error syncing attendance data:', error);
    }
}

/**
 * Sync grades data when back online
 */
async function syncGradesData() {
    try {
        const pendingGrades = await getPendingGrades();
        
        for (const grade of pendingGrades) {
            try {
                const response = await fetch('/api/grades', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(grade)
                });
                
                if (response.ok) {
                    // Remove from pending
                    await removePendingGrades(grade.id);
                    console.log('Grades synced:', grade.id);
                }
            } catch (error) {
                console.error('Failed to sync grades:', grade.id, error);
            }
        }
    } catch (error) {
        console.error('Error syncing grades data:', error);
    }
}

/**
 * Get pending attendance data from IndexedDB
 */
async function getPendingAttendance() {
    // This would typically use IndexedDB
    // For now, return empty array
    return [];
}

/**
 * Get pending grades data from IndexedDB
 */
async function getPendingGrades() {
    // This would typically use IndexedDB
    // For now, return empty array
    return [];
}

/**
 * Remove pending attendance after successful sync
 */
async function removePendingAttendance(id) {
    // This would typically use IndexedDB
    console.log('Removing pending attendance:', id);
}

/**
 * Remove pending grades after successful sync
 */
async function removePendingGrades(id) {
    // This would typically use IndexedDB
    console.log('Removing pending grades:', id);
}

/**
 * Push notification handler
 */
self.addEventListener('push', (event) => {
    console.log('Push notification received:', event);
    
    const options = {
        body: event.data ? event.data.text() : 'New notification from School Admin',
        icon: '/icon-192x192.png',
        badge: '/badge-72x72.png',
        tag: 'school-admin-notification',
        data: {
            url: '/dashboard.html'
        }
    };
    
    event.waitUntil(
        self.registration.showNotification('School Admin System', options)
    );
});

/**
 * Notification click handler
 */
self.addEventListener('notificationclick', (event) => {
    console.log('Notification clicked:', event);
    
    event.notification.close();
    
    event.waitUntil(
        clients.openWindow(event.notification.data.url || '/dashboard.html')
    );
});

