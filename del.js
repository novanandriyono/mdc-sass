const del = require('del');
del(['dist/@material/theme/_mixins.scss',]).then(paths => {
    console.log('Deleted files and folders:\n', paths.join('\n'));
});
