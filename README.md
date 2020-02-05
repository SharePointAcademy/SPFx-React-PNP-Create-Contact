## react-pnp-cadastro

This is where you include your WebPart documentation.

### Lists and Picture Library

Create a List - Areas
Fields      Type       
Title       text


Create a List - Usuarios
Fields          Type       
name            text
email           text
phone           text
type            text
area            lookup (list Areas)
defaultImage    text


Create a Picture Library - 


### Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp
```

This package produces the following:

* lib/* - intermediate-stage commonjs build artifacts
* dist/* - the bundled script, along with other resources
* deploy/* - all resources which should be uploaded to a CDN.

### Build options

gulp clean - TODO
gulp test - TODO
gulp serve - TODO
gulp bundle - TODO
gulp package-solution - TODO
