# Uni-Dash

Your one-stop platform to manage your university life—track your progress, stay organized, and access helpful resources.

This proof of concept dashboard application is a showcase of modern web development techniques, including SSR, dynamic code splitting, Next.js, React, Material UI, TypeScript, MongoDB and GraphQL, designed to enhance the user experience for university students during their onboarding process.

- [Uni-Dash](#uni-dash)
  - [TLDR - Get the app running](#tldr---get-the-app-running)
  - [Mongodb](#mongodb)
    - [Setup Mongodb server](#setup-mongodb-server)
    - [Setup MongoDB Compass](#setup-mongodb-compass)
    - [Populating MongoDB](#populating-mongodb)
  - [Environment Variables](#environment-variables)
  - [Getting Started](#getting-started)
  - [Tests](#tests)
    - [Unit tests](#unit-tests)
    - [linting](#linting)
    - [Functional tests](#functional-tests)
    - [NextJS bundle analyser](#nextjs-bundle-analyser)
  - [Tooling](#tooling)
    - [Commander](#commander)
  - [Technologies](#technologies)
    - [React](#react)
    - [TypeScript](#typescript)
    - [Next.js](#nextjs)
    - [Material UI](#material-ui)
    - [GraphQL](#graphql)
      - [MongoDB \& Mongoose](#mongodb--mongoose)
  - [Use cases](#use-cases)
  - [Usage](#usage)
    - [User Interface](#user-interface)
    - [GraphQL](#graphql-1)
  - [Core concepts](#core-concepts)
    - [Server side sendering (SSR)](#server-side-sendering-ssr)
    - [Hydration](#hydration)
    - [Suspense](#suspense)
    - [Dynamic loading](#dynamic-loading)
    - [Code splitting](#code-splitting)
    - [JSON Web Token (JWT)](#json-web-token-jwt)
    - [Other concepts coveraged](#other-concepts-coveraged)
    - [More information](#more-information)
  - [Whats next?](#whats-next)

## TLDR - Get the app running

1. Fork this repo
2. Ensure you are running on node v20+ ([download](https://nodejs.org/en/download/package-manager))
3. Setup mongodb, and start the service [more details here](#setup-mongodb-server)
4. To install packages, run: 
```bash
yarn
```
5. To setup your env variables, run:
```bash
yarn envs pull
```
6. To setup the database documents and pre-populate data, run: 
```bash
yarn seed all
```
7. To start the application in development mode, run:
```bash
yarn dev
```
8. Open [http://localhost:3000](http://localhost:3000) with your browser.
9. Login in with user and pass: `john@example.com`

Alternatively, to start the application in production mode:
```bash
yarn build
yarn start
```

## Mongodb

MongoDB is a NoSQL database that stores data in flexible, JSON-like documents instead of traditional rows and columns like relational databases. It's highly scalable and allows for rapid development, making it suitable for applications where the data structure may evolve over time.

### Setup Mongodb server

Mongodb installation [docs}(https://www.mongodb.com/docs/manual/administration/install-community/)

Assuming you are on Mac OS (Intel chip), you can install via:

```bash
brew tap mongodb/brew

brew update

brew install mongodb-community@8.0
```

To run mongodb:

```bash
brew services start mongodb-community@8.0
```

To stop mongodb:

```bash
brew services stop mongodb-community@8.0
```

To view your services:

```bash
brew services list
```

Finally to start the mongodb server (mongo daemon), run:

```bash
mongod
```

### Setup MongoDB Compass

MongoDB compass is a GUI (Graphical User Interface) for usage with MongoDB. You can install it [here](https://www.mongodb.com/try/download/compass)

Once set up you can connect to your local MongoDB instance with `mongodb://localhost:27017`

When you open Compass, you should be able to see `uniDashDb` containing all the documents that our GraphQL resolvers will be interacting with.

### Populating MongoDB

Commander tooling has been included to allow for easy `seeding` of data into the documents.

To seed all documents (this will create the document, delete all data and then populate with preset data), simply run:

```bash
yarn seed all
```

You should see it run through each document one by one, and if you refresh MongoDB compass, you should see the populated data.

Note if you want to only seed one table (e.g. user), you can do:

```bash
yarn seed user
```

You can also view help information via:

```bash
yarn seed --help
```

Example output:

```bash
Usage: seed [options] [command]

Options:
  -h, --help      display help for command

Commands:
  all             Seed all databases
  health          Seed the health, wellness and mindfulness databases
  program         Seed the program database
  task            Seed the task database
  timetable       Seed the timetable database
  user            Seed the user database
  university      Seed the university database
  help [command]  display help for command
```

## Environment Variables

Environment variables in a Node project store configuration values (like API keys, database URLs, or application settings) outside the code. They help separate sensitive or environment-specific data, making the app more secure and easier to configure for different environments (development, production, test, etc).

Using commander I have included an [envs script](./scripts/envs/envs.ts), this can be invoked by running

```bash
yarn envs pull
```

This script takes the values in the [env.json](env.json) file and uses it to create and populate the relevant .env files. E.g. for an env.json file with contents:

```json
{
  "constants": {
    "MONGODB_URI": "mongodb://localhost:27017/uniDashDb",
    "JWT_SECRET": "fake-secret-key"
  },
  "environments": {
    "development": {
      "JWT_SECRET": "fake-secret-dev-key"
    },
    "production": {
      "JWT_SECRET": "fake-secret-production-key"
    },
    "test": {}
  }
}
```

This will create 3 new .env files
1. .env.development
2. .env.production
3. .env.test

Anything stored in constants will be applied to all environments, but if a value is set in the environment that has the same key, e.g.`JWT_SECRET` in the example above, this would override the value in constants.

e.g. this would be what is populated for `.env.production`
```bash
MONGODB_URI=mongodb://localhost:27017/uniDashDb
JWT_SECRET=fake-secret-production-key
```

These .env files are not tracked by git, so once created you can then manually update them to store any "real" sensitive data without having them tracked.

** **DO NOT STORE SENSITIVE INFORMATION WITHIN THE env.json !!!** **

## Getting Started

First, install the full and development package dependencies:

```bash
yarn
```

You then need to set up your .env files using the env.json file, simply run:

```bash
yarn envs pull
```

You now need to seed/populate your database documents by running:

```bash
yarn seed all
```

Next to start up the development server, simply run

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To run in production mode, first you will need to run a next build, via:

```bash
yarn build
```

Then to start the production server, run:

```bash
yarn start
```

You can log in to the application using the same email and password: `john@example.com` - in the future these will be encrypted and stored in a database.

## Tests

This repo uses Jest for unit testing, and Cypress for functional testing.

### Unit tests

You can run jest tests via:

```bash
yarn test
```

You can enable watch mode via:

```bash
yarn test --watch
```

You can also gather coverage via:

```bash
yarn test:coverage
```

### linting

Linting can be ran manually via

```bash
yarn lint
```

It is also ran when performing a `$ yarn build`

Commitlint is also setup via husky that applies certain rules when comming, e.g. ensuring you have a commit message, and also ensuring the linter is ran on commit. 

Linting checks typescript also.

### Functional tests

This app supports functional testing via Cypress, this can be ran in window mode via

```bash
yarn cy:open
```

In the future we will add aat checks and the ability to run in headless mode. Also potentially plugins for visual regression checks.

### NextJS bundle analyser

The Next.js bundle analyzer helps visualise the size of your JavaScript bundles, allowing you to optimize and reduce the size of your app's build for better performance.

This can be ran via:

```bash
yarn analyse
```

Once complete, it will automaatically open the visualation dashboard in your browser.

## Tooling

### Commander

Commander is a JavaScript library used for building command-line interface (CLI) applications. It simplifies the process of parsing command-line arguments, handling options, and executing different commands. You can easily define commands, subcommands, flags, and options for CLI tools.

This allows us to create intuitive node scripts (we leverage Typescript and tsx), and a CLI to easily run locally, or on a pipeline.

The scripts are located int the [scripts/](./scripts/) directory, currently we include 2 useful scripts leveraging commander:

1. Envs - seamlessly creates .env files based on the env.json file
2. Seeds - creates a pre-populates mongodb documents

These scripts are referenced in the package json file, allowing us to easily run them with yarn, e.g.

```bash
    "envs": "tsx scripts/envs/envs.ts",
    "seed": "tsx scripts/seed/seed.ts",
```

Then to invoke them we can simply run:

```bash
yarn envs pull
yarn seed all
```

## Technologies

* React
* TypeScript
* NextJS (App Router)
* GraphQL (and Apollo Client)
* SASS
* Material UI
* Jest
* Cypress
* MongoDB

### React

Benefits:

* **Component-Based Architecture**: Encourages modular development, making it easier to reuse and maintain code, which is beneficial for building large applications like onboarding checklists, user profiles, and timetables.
* **Virtual DOM**: React's efficient re-rendering mechanism improves performance, providing a fast and responsive UI, especially when managing dynamic content like timetables or progress trackers.
* **Ecosystem**: A large ecosystem of libraries, tools, and community support, making it easier to implement features like drag-and-drop scheduling or real-time updates for collaboration tools.

Downsides:

* **Learning Curve**: Although relatively easy to get started, getting up to speed with React's advanced concepts (hooks, context, etc) can take time.
* **Boilerplate Code**: React often requires more setup and boilerplate compared to simpler frameworks or libraries, especially when integrating with other libraries like GraphQL or state management tools.

### TypeScript

Benefits:

* **Type Safety**: TypeScript's static typing helps prevent runtime errors by catching issues at compile time, making the development of complex features (like AI-powered recommendations or interactive timetables) safer.
* **Improved Code Readability**: Type annotations make code easier to understand, especially in large applications where many developers are involved.
* **Tooling**: Better autocompletion and refactoring tools in IDEs, which improves developer productivity when building or updating features like study collaboration tools or user profile sections.

Downsides:

* **Learning Curve**: Developers need to learn and understand TypeScript's types and its more complex configurations, which can slow down onboarding.
* **Overhead**: TypeScript introduces some overhead in terms of additional boilerplate and slightly longer build times due to type checking.

### Next.js

Benefits:

* **Server-Side Rendering (SSR)**: Automatically handles SSR and static site generation, improving SEO (search engine optimisation) and initial load times for content like university profiles or course recommendations.
* **API Routes**: Built-in API (serverless functions) routes allow you to easily create serverless functions, ideal for handling things like form submissions (e.g., registering for courses or RSVP for events) without needing a separate backend.
* **Optimized Performance**: Next.js provides automatic code splitting and optimized bundles, making apps more performant, especially for users with slow connections.

Downsides:

* **Complexity for Small Apps**: Next.js is powerful, but it might introduce unnecessary complexity for smaller apps or single-page applications that don’t need SSR or API routes.
* **Configuration Overhead**: Although much of Next.js is pre-configured, more complex use cases (e.g., advanced routing, state management) may require additional configuration and custom setups.

### Material UI

Benefits:

* **Pre-built Components**: Material UI provides a wide range of pre-built, customizable components (buttons, cards, progress bars), which accelerate the development of user interfaces like onboarding checklists, progress trackers, and user profiles.
* **Responsive Design**: Material UI’s grid and layout system makes it easier to build responsive applications, which is especially useful for features like interactive timetables and collaboration tools.
* **Customizable**: Material UI is highly customizable, allowing you to create consistent, theme-based designs for features like color-coded schedules or mental health resource sections.

Downsides:

* **Bundle Size**: Material UI can increase the size of the JavaScript bundle, which may impact the performance of the app, especially for users with slower connections.
* **Learning Curve**: Developers unfamiliar with Material Design principles may need some time to adjust to its design patterns and customize components effectively.

### GraphQL

Benefits:

* **Efficient Data Fetching**: GraphQL allows clients to specify exactly the data they need, reducing over/under-fetching and improving performance, which is essential for dynamic features like personalized course recommendations or interactive timetables.
* **Single API Endpoint**: GraphQL simplifies the backend architecture by exposing all available queries and mutations through a single endpoint, making it easier to maintain and extend features like study collaboration tools or wellness trackers.
* **Real-time Capabilities**: GraphQL subscriptions can be used to provide real-time updates, which is useful for features like collaboration tools.

Downsides:

* **Complexity**: Setting up and maintaining a GraphQL server, schema, and resolvers can be complex, especially when compared to simpler REST APIs.
* **Over/under-fetching on the Client Side**: While GraphQL reduces over-fetching at the API level, poorly designed queries on the client side can still lead to inefficient data usage or performance bottlenecks.
* **Caching Issues**: Managing caching can be more complicated in GraphQL, as it’s not as straightforward as with RESTful endpoints, especially when working with libraries like Apollo Client.

#### MongoDB & Mongoose

MongoDB's flexibility and scalability are beneficial for fast-growing apps with evolving data, similar to this POC application, but careful design is needed to avoid performance and consistency issues.

Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js, providing a schema-based solution to define and interact with MongoDB documents using JavaScript objects. It works well with GraphQL and allows our resolvers to interact with the schema models, and also allows us to easily seed the database tables from our scripts.

Benefits:

* **Flexibility**: You can easily model complex data (e.g., programs, courses, users) without rigid schemas, which suits evolving data structures like student information or schedules.
* **Scalability**: MongoDB handles large amounts of data and can scale horizontally, which is ideal if your university app grows with more users and tasks.
* **Fast Development**: MongoDB's document model is close to how data is structured in your app, allowing quick development and iteration.

Downsides:

* **No Transactions by Default**: MongoDB lacks multi-document ACID transactions by default, which may be a drawback for operations requiring strict consistency (e.g., complex workflows like student registrations).
* **Less Data Integrity Control**: Without a strong schema, maintaining data integrity can be more difficult, especially in a university app with complex relationships between users, courses, and schedules. I.e. the practices used to ensure that data within a database remains accurate, consistent, and reliable over its lifecycle.
* **Indexing Performance**: Queries can slow down if not properly indexed, especially with large, unstructured data.

## Use cases

* Onboarding
* University profile
* Interactive timetable
* User profile
* Course and event recommendations
* Campus map with navigation
* Study and collaboration tool
* Metal health and well being resources

## Usage

### User Interface

To view the UI endpoint navigate to [http://localhost:3000](http://localhost:3000)

When you first navigate to the UI, you will need to log in, currently we only support log in for one user, `john@example.com` (user/pass). In the future this will change once we introduce a database, and then hook up with "real-ish" persisting data. 

When logged in the home page displays several options to navigate to, each displaying different core and interseting concepts of UI design and development using React, Typescript, NextJs and Material UI. You can also interact with the side menu at the top left for quick navigation. To log out, you can click the user icon at the top right of the header, and then click the `Log out` button.

### GraphQL

To view the GraphQL endpoint navigate to [http://localhost:3000/api/graphql](http://localhost:3000/api/graphql)

This is only available in development mode. In production mode introspection has been disabled. You can still navigate to the page via the URL but you would be able to view the sandbox area like you would in development.

Note the graphql route is set up as serverless functions [here](src/app/api/graphql/route.tsx). This exposes two HTTP requests:

1. GET - This is when a user directly navigates to this route, this will render the apollo sandbox/playground.
2. POST - This is when a user makes a graphql query, note all queries are considered POST requests, even queries such as `getUser`.

## Core concepts

### Server side sendering (SSR)

Server-Side Rendering (SSR) is the process of rendering web pages on the server instead of the browser. The HTML is generated on the server and sent to the client fully rendered, allowing for faster initial page loads. Its worth noting that it may look the part, but it is not interactive when it is sent, React performs "hydration" which effectively means it boots up, applying relevant stylings and interactability to the user interface.

Benefits:

* **Faster initial load**: Students can access their dashboard and schedules quicker, even on slower connections.
* **SEO-friendly**: Important for any public pages (like university events) that might need to be indexed by search engines.
* **Improved performance**: Helps load pages with complex data like class schedules, assignments, etc. faster.

Downsides:

* **Increased server load**: Rendering on the server can be resource-intensive, especially with a large number of concurrent users (like during exam periods).
* **Complexity**: Implementing SSR requires more setup and handling compared to client-side rendering (CSR), which might lead to increased development time.
* **Longer server response times**: Since the server must fully render pages before sending them, this could slow down response times for certain interactions.

Examples:

-  [Enrolment Page](src/app/enrolment/page.tsx)
-  [Health Page](src/app/health/page.tsx)

### Hydration

Hydration is the process where a server-rendered HTML page becomes interactive when React "hydrates" it on the client side. This allows the page to load quickly with pre-rendered content before React takes over for interactivity.

Benefits:
* **Faster initial load:** Users see content immediately, making the app feel faster, which is crucial for students accessing their schedules or tasks quickly.
* **SEO-friendly**: Server-rendered content is better indexed by search engines, useful for public pages like university events.
* **Improved user experience**: Content is visible while React hydrates the page in the background, creating a smoother experience.
* **Seamless transition**: Hydration ensures a smooth handover from SSR (server-side rendering) to CSR (client-side rendering), keeping the app functional and interactive.

Downsides:

**Increased complexity**:

Managing hydration can complicate debugging and requires careful coordination between server and client rendering.
* **Performance delays**: Large apps may experience slow hydration, delaying interactivity for students trying to quickly manage tasks or schedules.
* **Hydration mismatch**: Mismatched content between server and client can lead to errors or unexpected behavior, affecting user experience.
* **Delayed interactivity**: Until hydration completes, the page may look loaded but won't respond to input, frustrating users.
* **JavaScript dependence**: Full interactivity still requires JavaScript, so users on slow connections or older devices may experience delays despite server rendering.

Examples:
- [ProgramsComponent](src/components/Programs/Programs.tsx)

### Suspense

Suspense is a React feature that allows developers to "suspend" the rendering of components until some data or resource is ready. This is useful for handling asynchronous tasks like data fetching.

Benefits:

* **Smooth user experience**: Loading states are better handled, making it more user-friendly while data like task lists or university timetables are being fetched.
* **Better user feedback**: Students can see clear indicators (e.g. loading spinners) while their information is fetched from the server.

Downsides:

* **Limited compatibility**: Suspense is still evolving, especially in handling server-side data fetching, meaning not all use cases are well-supported yet.
* **Complex error handling**: Managing errors when data fetching fails can become more complex when using Suspense, potentially leading to user frustration.
* **Async components complexity**: Coordinating multiple async components can make debugging and maintaining the app more difficult.

Examples:

- [UserProfile](src/components/UserProfile/UserProfile.tsx)

### Dynamic loading

Dynamic loading allows certain components or features of an application to be loaded only when they are needed, rather than loading everything upfront.

Benefits:

* **Faster initial page load**: Essential for students who need quick access to their schedule or task list without unnecessary features being loaded.
* **Reduced resource usage**: Helps save bandwidth and improve performance by loading content like detailed course information only when needed.

Downsides:

* **Delayed interaction**: Some components or features might not be available immediately, which can frustrate users if key information (like a class schedule) loads more slowly than expected.
* **Flickering UI**: If not implemented smoothly, dynamic loading can cause flickering or visible delays in rendering parts of the page, negatively impacting the user experience.
* **SEO issues**: Content that loads dynamically may not be indexed properly by search engines, affecting discoverability.

Examples:

- [Header Component](src/components/Header/Header.tsx)

### Code splitting

Code splitting involves breaking down an application into smaller chunks so that only the necessary parts of the code are loaded for any given page or component.

Benefits:

* **Improved performance**: Enhances the speed of the app, allowing students to access specific parts (like assignment tracking or messaging) without waiting for the entire application to load.
* **Better resource management**: Reduces the size of JavaScript bundles, which is particularly beneficial for mobile users.

Downsides:

* **Increased complexity**: Managing code-split bundles can add complexity to the development process, and improper use might lead to difficult debugging and performance issues.
* **Initial configuration**: Ensuring the app is properly optimized with code splitting requires careful setup and might lead to overhead for developers, especially for beginners.
* **Additional HTTP requests**: Code splitting can lead to more network requests (for each split file), which could affect performance if not managed properly.

Examples:
- [CampusPage](src/app/campus/page.tsx) - bundle only loaded when needed, useful as we dont need to load the images until they are needed.


### JSON Web Token (JWT)

JWT is a secure way to handle authentication and authorization. It allows the server to issue a token upon login, which is then stored on the client and sent with each subsequent request to verify the user.

Benefits:

* **Secure authentication**: Ensures that students’ personal data and academic information are protected.
* **Stateless sessions**: Reduces server load since the server doesn’t need to store session information, making the app faster and more scalable.
* **Persistent login**: Students can remain logged in across sessions, making it easier to access their dashboard quickly.

Downsides:

* **Security risks**: If a token is stolen or intercepted (e.g., in local storage), it can be used maliciously until it expires. It's essential to use secure storage (e.g., HTTP-only cookies).
* **Token size**: JWT tokens can grow large with additional payload data, which could affect performance in scenarios where they're included in every API request.
* **No built-in session revocation**: Unlike traditional sessions, where the server can invalidate a session, JWT tokens remain valid until they expire, even if a user logs out or a token is compromised.
* **Shorter lifespan**: Tokens need to expire relatively quickly for security reasons, but this could result in users needing to re-login frequently if refresh tokens aren’t used effectively.

Examples:
- [jwt util](src/lib/jwt/jwt.ts)
- [graphql api route](src/app/api/graphql/route.tsx)

### Other concepts coveraged

- Cookies (storing of jwt token and theme)
- Themeing (using material UI, and storing in cookies)
- Material UI styling (sx and sass modules)
- Suspense error handling
- Caching (graphql queries)
- GraphQL (resolvers, gql and typeDef creation)
- Apollo server and client set up
- Jest testing
- Cypress
- MongoDB & Mongoose

### More information

1. What is the difference between React.Lazy and Next.js dynamic loading?

```
The key difference between React.lazy and Next.js dynamic loading is the use case and environment:

React.lazy is used for client-side code splitting, allowing components to be loaded lazily during rendering via Suspense, but it does not support server-side rendering (SSR).

Next.js dynamic is used for both client-side and server-side dynamic imports, offering more flexibility with features like disabling SSR (ssr: false), custom loading components, and built-in handling of code splitting.
```

2. Does GraphQL support suspense or is it experimental?
```
GraphQL does not natively support Suspense on its own. However, React's useSuspenseQuery from Apollo Client, which leverages Suspense, is currently experimental. And from my experience, has a fair few issues to work out.

This feature allows React components to wait for GraphQL data without explicitly managing loading states, but it’s still in the experimental phase and not recommended for production use yet.

Essentially, GraphQL itself doesn’t directly support Suspense, but frameworks like Apollo Client are working on experimental integrations to leverage React's Suspense for data fetching.
```

3. What is the difference between the nextjs page routes and api routes?

```
Pages - Serve React components that are rendered as UI pages
App - Serve React components that are rendered as UI pages

This is not to be mistaken for the previous way of setting up a NextJs application using the Pages Router, we are using the newer App Router architecture instead.
```

4. What is the difference between the pages router and app router?

```
The Pages Router and the App Router in Next.js serve similar purposes but have key differences in how they handle routing and rendering. The App Router is a newer feature introduced in Next.js 13, focusing on improving scalability and flexibility, while the Pages Router has been the traditional way of defining routes in Next.js.

Pages router does not support React’s Server Components and lacks granular control over streaming and parallel rendering. All pages are client-side components by default.

App router has several new features: Server and Client Components, layouts, streaming (Pages can be progressively rendered and streamed to the client as they are generated) and Parallel and Intercepted Routes ( Enables more advanced routing patterns, like loading multiple sections of a page in parallel or rendering modal routes).
```

5. What is the lifecycle of a JWT?

```
A JWT (JSON Web Token) has a lifecycle that includes creation, validation, and expiration. It is typically comprised of three parts:

* Header: Specifies the token type and the signing algorithm.
* Payload: Contains claims or user data (like user ID, role).
* Signature: Ensures the token has not been tampered with.

Claims often include: iss (issuer of token), exp (expiration time), sub (subject of the token such as User ID), and aud (audience).

The token is issued when a user logs in, validated on subsequent requests, and eventually expires based on a defined duration (e.g. 1 hour), after which it needs to be renewed.
```

6. What are the principles ACID programming?

```
ACID stands for Atomicity, Consistency, Isolation, and Durability—key principles that ensure reliable database transactions. Essentially a set of key properties that define a transaction.

* Atomicity: All parts of a transaction succeed or none at all.
* Consistency: Transactions bring the database from one valid state to another.
* Isolation: Concurrent transactions don't interfere with each other.
* Durability: Once committed, data is saved even in case of a failure.
```

7. What is the difference when using Material UIs sx, and SaaS modules?

```
Material UI sx:

* Allows you to apply styles directly in your component using the sx prop.
* Styles are written as objects, enabling dynamic styles and easy access to Material UI's theme (e.g., breakpoints, colors).
* Best for quick, component-level styling and when you need styles to react to props or state.
* Can be considered a form of "JS-in-CSS." It allows you to write styles as JavaScript objects directly within your React components, instead of in separate CSS or Sass files.

Sass Modules:

* Provides modular, scoped CSS by using .module.scss files.
* Class names are auto-generated, ensuring no global style conflicts.
* Better for larger-scale, reusable styles across multiple components, but it requires managing separate CSS files and is less integrated with JavaScript logic.

Comparison:

* Material UI sx is more powerful for theme-based and dynamic styles, integrates well with JS, but can lead to inline-style bloat and hydration issues.
* Sass Modules offer clearer separation of concerns (CSS in separate files), making them better for complex, reusable styles but harder to use for dynamic styling or when you need theme access, works better with hydration.
```

## Whats next?

- Addition of AAT tests
- Addition of globalisation/translation
- Addition of the study/collaboration page using web sockets.
- Addition of the reccommendations page using ML.
- Add entitlement logic to apply bespoke permissions when using APIs and routing.
- Exploration into microfrontends and potentially deploying to a CDN using AWS.
