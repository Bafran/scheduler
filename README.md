# React Scheduler

Hi! This scheduler project was built to be able to build employees schedules, which are managed by departments, which are in turn managed by companies. I began building this during my time working at a grocery store, and was built as project to help me learn React and GraphQL with Typescript.

This project has been revisited to touch up this GitHub page, and is currently in a (debatably) working state, but I do not intend to complete it as I have since learned far more about how I should have better designed this app, especially given that this was the first project I had done at this scale.

## Full Tech Stack

TypeScript
React
GraphQL
Node.js
PostgreSQL
TypeORM
Redis
React Router

# Goals & Accomplishments

The goal of this project was to create a robust backend with sufficient authentication and scalability, with the CSS taking a backseat. I would have liked to deploy this project as well, however design using a GraphQL backend and React frontend along with Redis for user sessions made it difficult to manage with what I knew at the time.

Originally, I intended for this project to have a feature where employees would be able to request switches and accept them, with a possible chat integration. After writing the basic website and learning basics of the tech stack, I wrote many of these features off as unnecessary to my learning since they would simply involve further building out the GraphQL schema.

Currently, the scheduler supports a company and employee registration and login page, with departments being registered within the company homepage. I believe the scalability of this project was well achieved, with a large number of queries and mutations written for the GraphQL server allowing for a company hierarchy to be easily built. Looking back through my code after gaining much more general programming experience, it looks bloated compared to how I would have designed it now, hence why this project will likely not have many of the originally intended features developed.

## Screenshots

Below, I've added in a few screenshots of the website. Despite the simple design, I found it quite valuable building out this project, and I think many lessons will come in handy later if I choose to build a robust web app, or a mobile app for that matter.

![Homepage with scheduler view](https://media.discordapp.net/attachments/518308724075659265/923742112535678976/unknown.png)

![Company Homepage](https://cdn.discordapp.com/attachments/518308724075659265/923745811026837564/unknown.png)
