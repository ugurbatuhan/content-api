# Content Search API

## Introduction

The Content Search API is a Node.js-based project that provides content search capabilities using both MongoDB and Elasticsearch. It is designed to be easily set up using Docker, making it a convenient solution for searching and retrieving educational content data.

## Getting Started

To get started with the Content Search API, follow these steps:

1. **Clone this repository** to your local machine:

    ```bash
    git clone <repository-url>
    ```

2. **Build and start the containers** using Docker Compose:

    ```bash
    docker compose up
    ```

    This command will create the necessary containers and initialize the project.

3. **Access the API endpoints**:

    The API provides two search methods:

    - **MongoDB Search**:

      - Endpoint: [http://localhost:3000/content/searchContentMongoDB](http://localhost:3000/content/searchContentMongoDB)
      - Parameters:
        - `minDuration`: Minimum duration of content (optional).
        - `maxDuration`: Maximum duration of content (optional).
        - `gradeLevel`: Grade level of content (optional).
        - `pageSize`: Number of results per page.
        - `query`: Keywords or tags for searching.
      - Example: [http://localhost:3000/content/searchContentMongoDB?minDuration=30&maxDuration=100&gradeLevel=12&pageSize=10&query=Maths] (http://localhost:3000/content/searchContentMongoDB?minDuration=30&maxDuration=100&gradeLevel=12&pageSize=10&query=Maths)

    - **Elasticsearch Search**:

      - Endpoint: [http://localhost:3000/content/searchContentElasticsearch](http://localhost:3000/content/searchContentElasticsearch)
      - Parameters:
        - `minDuration`: Minimum duration of content (optional).
        - `maxDuration`: Maximum duration of content (optional).
        - `gradeLevel`: Grade level of content (optional).
        - `pageSize`: Number of results per page.
        - `query`: Keywords or tags for searching.
      - Example: [http://localhost:3000/content/searchContentElasticsearch?minDuration=30&maxDuration=100&gradeLevel=12&pageSize=10&query=Maths] (http://localhost:3000/content/searchContentElasticsearch?minDuration=30&maxDuration=100&gradeLevel=12&pageSize=10&query=Maths)

    You can use these endpoints to search for educational content based on specific criteria.

## Dockerization

This project is containerized using Docker, allowing for easy setup and deployment. By running a single command, `docker compose up`, you can have the entire project up and running, including the necessary dependencies like MongoDB and Elasticsearch.

## Data Population

Upon starting the project, fake data is generated using Faker.js and populated into the MongoDB database. Simultaneously, this data is indexed in Elasticsearch for efficient searching.


