# CDN

Although the package is designed to be used as an npm dependency, it is possible to use it through a CDN. This CDN points to an `index.min.js` file in the official repository.

CDN
```text
https://cdn.jsdelivr.net/gh/CristianRG/game_engine/dist/index.min.js
```

# Usage

To use, you only need to include the following line in your JavaScript file or HTML document:

HTML
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <canvas ref="canvas" width="679" height="300" />        
</body>
<script>
    import { /* import whatever you need */ } from 
    "https://cdn.jsdelivr.net/gh/CristianRG/game_engine/dist/index.min.js"
</script>
</html>
```

That's it! With the code above, you should be ready to use the engine.