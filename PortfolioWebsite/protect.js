// Disable right-click context menu
window.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    alert('Inspecting or copying code is disabled on this site.');
});

// Disable common inspect shortcuts
window.addEventListener('keydown', function(e) {
    // F12
    if (e.key === 'F12') {
        e.preventDefault();
        alert('Inspecting or copying code is disabled on this site.');
    }
    // Ctrl+Shift+I, Ctrl+Shift+C, Ctrl+U
    if ((e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'C')) ||
        (e.ctrlKey && e.key === 'u')) {
        e.preventDefault();
        alert('Inspecting or copying code is disabled on this site.');
    }
}); 