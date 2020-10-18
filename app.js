const index = require('./index');

const port = process.env.PORT || 3000;

index.listen(port);

console.log(`app running on port ${port}`);

