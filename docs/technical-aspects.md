# Technical Aspects

## Intro

Below we will list some words regarding the tools we have used. The table serves as a *TL/DR*

|Name of service|What it is?|Why we used it?|
|:---|:---|:---|
|[Firebase](#firebase)|A Backend-as-a-Service used for authenticating users and saving app data|We don't need to maintain our own server which gives more development time on the frontend|
|[Styled Components](#styled-components)|CSS-in-JS solution that uses native CSS syntax|Allows us to not worry about component class names and importing stylesheets|

### Firebase

Firebase is a [Backend-as-a-Service](https://www.cloudflare.com/en-gb/learning/serverless/glossary/backend-as-a-service-baas/) solution for developers, allowing them to focus primarily on the front-end while the rest it outsourced to Google Cloud to maintain. The service offers **authentication, database management, cloud storage, & more** which can be found via their [docs](https://firebase.google.com/docs).


### Styled-Components

For styling we will be using [styled components](https://styled-components.com/)

> In order to clear all the browser defaults we will need to use a CSS reset. There are many version out there, [this one](https://unpkg.com/tailwindcss@3.2.4/src/css/preflight.css) seems to be work best in our project.

### Vite

Vite is a tool to help build modern day web applications. It acts as an alternative to  Create React App with many of the same great features such as **hot-reloading, local development server and bundling.** However the performance outshines CRA and leads to a better overall development experience. They have some additional words for why they exists [here](https://vitejs.dev/guide/why.html)

### Jest/Vitest

Testing is useful for learning how to interact with a newly introduced service (such as Firebase) where we can unit test functions before using them in production.

> We need to use a vite compatible version of Jest called *vitest*. They are identical in usage and syntax however the latter is specific for vite projects. Vite offer an detailed explanation [here](https://vitest.dev/guide/why.html)

### Preact

<!-- TODO -->
For the library we will be using [preact](https://preactjs.com/)


### Wouter

<!-- TODO -->
For routing we will be using [wouter](https://github.com/molefrog/wouter)



Import Path Aliasing [here](https://vueschool.io/articles/vuejs-tutorials/import-aliases-in-vite/)

## Footnotes

Here is some links to useful websites that was used to help with researching and development of this project.

- Firebase
  - [Adding data](https://firebase.google.com/docs/firestore/manage-data/add-data)

- Vite
  - []