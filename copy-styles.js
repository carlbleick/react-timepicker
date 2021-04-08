const fs = require('fs');

fs.copyFile('src/styles.css', 'dist/styles.css', (error) => {
    if (error) {
        throw error;
    }
    console.log('styles.css copied sucessfully.');
})