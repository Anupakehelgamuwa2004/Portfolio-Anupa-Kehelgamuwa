// Disable right-click context menu
window.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    alert('Sorry, not available! 😅');
});

// Disable common inspect shortcuts
window.addEventListener('keydown', function(e) {
    // F12
    if (e.key === 'F12') {
        e.preventDefault();
        alert('Sorry, not available! 😅');
    }
    // Ctrl+Shift+I, Ctrl+Shift+C, Ctrl+U
    if ((e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'C')) ||
        (e.ctrlKey && e.key === 'u')) {
        e.preventDefault();
        alert('Sorry, not available! 😅');
    }
}); 