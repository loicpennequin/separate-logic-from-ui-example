# Separating the logic from the UI

This repository is an example of how you can split your core business logic from your UI, framework-bound logic and components.

The same app is implemented twice using different JavaScript frameworks (React and Vue) without duplication of the business logic. Both versions just reimplement the UI component and the "glue" code between the business and the framework.

The business logic is located in the `libs/shared package`.

## Prerequisites

- node > 16
- yarn 1.22
- docker and docker-compose

## Local development

- Install docker and docker-compose
- Start the database and mailing service using `docker-compose up -d`
- Install the app dependencies using `yarn install`
- Run `yarn dev`
- Api will be available on`http://localhost:5000
- Vue front end will be available on`http://localhost:5173
- React front end will be available on`http://localhost:5174

## TODO

- Move server side business logic to the shared packaghe to show how you could do the same thing as the front end code, for example using a graphQL or REST API instead of tRPC
- Add tests (I know, I know :D)
- Add animations to the react app (framer motion ? treac-transition-group ?)
