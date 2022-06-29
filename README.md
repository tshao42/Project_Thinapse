# ThoughtBubble React/Redux
- Live on heroku at [ThoughtBubble](https://mediumthoughtbubble.herokuapp.com/)
- Github Repository available at https://github.com/tshao42/ThoughtBubble_React_Redux

# About

- ThoughtBubble Medium-like Web Application. The goal of the website is to create a user-friendly User Interface for light blog posting. Users are able to create their own blog posts, edit, and delete them, and they are also able to comment on other people’s posts.

# Run it on local machine:

1. Clone the project to your local machine here: https://github.com/tshao42/ThoughtBubble_React_Redux
2. There are two folders under root directory. Navigate into `/backend` and `/frontend` directories and run `npm install`.
3. In `backend` directory, create `.env` file according to the information on `.env.example`
4. Create the user using postgres CLI. Make sure to give it `CREATEDB` privilege.
5. Run `npx dotenv sequelize db:create`. This will create the database for you.
6. Run `npx dotenv sequelize db:migrate` and `npx dotenv sequelize db:seed:all` to properly migrate and seed the database on your machine. For your convenience, a script named `cleanSlate` has been created in `.package` and you can simply run `npm run cleanSlate` as an alternative.
7. Open two terminals in total, the first one inside `/backend` and the second one in `frontend`. Upon successful initiation, the webstite would be available locally on [http://localhost:3000/](http://localhost:3000/)

# Features

## Current Features

### Posts (Core Feature)

- Create plain text as an authenticated user
- Read everyone’s post (authentication not required)
- Edit your own existing post
- Delete your own post

### Comments

- Comment on other people’s post as an authenticated user
- Read other people’s posts (authentication not required)
- Delete your own comment

## Future features

- Likes
- Tags (Topic & Categories)
- Likes
- Followers
- Feed
- User Profile Page (Following, Liked, and Posts)
- AW3 Upload (allow more contents)

# Technical Difficulties

- Database Design
    - Database association is extremely crucial. It was very important to understand how to properly design the relations of the database.
- Understanding of React/Redux mechanism
    - React and Redux are two relatively difficult tools to comprehend, and the abstract thinking involved in the understanding led to very significant difficulties in the initial stage of this project. Hydrating state upon rerending and the understanding of React hooks, Redux thunk functions and reducers, and asynchronicity of JavaScript all made it very essential to keep a good control over the order or events when re-rendering.

# Stack used
- ExpressJs, Sequelize
- React, Redux, CSS



