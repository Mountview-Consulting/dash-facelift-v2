window.util = window.util || {}; // Ensure Util exists

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// The sharePage function
util.sharePage = debounce(function (url = window.location.href) {
    console.log('sharePage called at', new Date().toISOString());

    if (navigator.share) {
        navigator.share({
            title: document.title,
            url: url
        })
        .then(() => console.log('Successfully shared'))
        .catch((error) => console.log('Error sharing:', error));
    } else if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url)
            .then(() => {
                alert('URL copied to clipboard: ' + url);
                console.log('URL copied successfully');
            })
            .catch((err) => console.error('Could not copy text:', err));
    } else {
        let textArea = document.createElement('textarea');
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            alert('URL copied to clipboard:\n' + url);
        } catch (err) {
            console.error('Fallback: Could not copy text', err);
        }
        document.body.removeChild(textArea);
    }
}, 200);  // Debounce time (500ms)


util.adeObjectToQueryString = function(obj) {
    const params = new URLSearchParams();

    function addParam(key, value) {
        if (Array.isArray(value)) {
            value.forEach(v => params.append(`${key}[]`, v));
        } else {
            params.append(key, value);
        }
    }

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            addParam(key, obj[key]);
        }
    }

    return params.toString();
}

util.sanitizeID = function(str) {
    return str
        .toLowerCase()
        .trim()                        
        .replace(/[^a-z0-9-_]/g, '-')    
        .replace(/-+/g, '-');     
}