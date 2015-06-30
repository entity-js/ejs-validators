# EntityJS - Components

## Validators

A component that allows validating a value using defined rules.

### Usage

```javascript
var validators = require('ejs-validators');

validators.validate(function (err, validates) {

  if (validates) {
    // yay
  }

}, 'machine-name', 'Hello World');
```
