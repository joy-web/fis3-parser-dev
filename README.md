fis3-parser-dev
=================

> Toggle html comments so that you can enable functionality for dev vs.
> production.

Have you ever wanted to test your web page and you smartly (for the most
part!) used appcache and forgot to update your manifest.appcache file?!
Have you ever wanted to include javascript files for development that
would not be there in production?  Well, fis3-parser-dev will help you there.

**Turn this:**
```html
<!-- !dev -->
<html manifest="manifest.appcache">
<!-- /!dev -->
<!-- dev -->
<!-- <html> -->
<!-- /dev -->
  <head><title>My Page</title></head>
  <body>
    <h1>Hello World!</h1>
  </body>
</html>
```

**Into this for development**

```html
<!-- !dev -->
<!-- <html manifest="manifest.appcache"> -->
<!-- /!dev -->
<!-- dev -->
<html>
<!-- /dev -->
  <head><title>My Page</title></head>
  <body>
    <h1>Hello World!</h1>
  </body>
</html>
```

**Or into this for production**

```html
<!-- !dev -->
<html manifest="manifest.appcache">
<!-- /!dev -->
<!-- dev -->
<!-- <html> -->
<!-- /dev -->
  <head><title>My Page</title></head>
  <body>
    <h1>Hello World!</h1>
  </body>
</html>
```

### fis3 

```
fis.match('*.html', {
  parser: fis.plugin('dev', {
  	 // `inDevelopmentMode` is a boolean value that helps us decide what to keep and what to remove.
    inDevelopmentMode: true
  })
})

```
