                                        # News Aggregation backend


## Project Overview
This is a NestJS-based News API that fetches news from multiple sources while using:
1-JWT Authentication for user access
2-API Rate limiting (throttling) 


## Features 
# 1-  JWT Authentication: Secure access with token-based authentication.
# 2-  Rate Limiting: Prevents abuse (3 requests per 4 seconds).
# 3-  Swagger API Docs:  Provides an interactive API documentation.
# 4-  Input Validation
# 5-  CORS Enabled


## Setup & Installation
1-npm install
2-setup enviroment variables 
DATABASE_URL
NODE_ENV
PORT
JWT_TOKEN_SECRET
NEWS_API_KEY
GUARDIAN_NEWS_KEY
NYT_NEWS_KEY
REDIS_HOST
REDIS_PORT
3- npm run start:dev
5- open http://localhost:3000/api#/ in your browaer to explore the API


## API Endpoints 
1-Authentication:
POST /auth/login
POST /auth/signup
2-user 
GET /user/preferences
PUT /user/preferences
3-news 
GET /news


## Technologies Used 
NestJS (Backend Framework)
PostgreSQL / Prisma (Database)
ThrottlerModule (Rate Limiting)
Swagger (API Documentation)

