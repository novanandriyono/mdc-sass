const del = require('del');
del(['dist/@material/*','dist/theme/default/*']).then(paths => {
    console.log('Deleted files and folders:\n', paths.join('\n'));
});
