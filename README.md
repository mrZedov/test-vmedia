# NestJS Proxy Server

## Overview

This project is a TypeScript-based proxy server built with NestJS. The proxy server fetches content from `https://docs.nestjs.com` (or any other site) and modifies the content as follows:

- Adds the ™ symbol to each six-letter word in the text.
- Replaces all internal navigation links with the proxy server's address.
- Ensures that navigation to sections of the site is handled entirely by the proxy server.

## Features

- **Text Modification**: Adds ™ symbol to six-letter words in the text content.
- **Proxy Navigation**: Replaces internal links with proxy paths to handle site navigation within the proxy server.
- **Preserved Functionality**: The functionality of the original site is maintained, with modifications only to text content and internal links.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/mrZedov/test-vmedia.git
   cd test-vmedia

2. **Install Dependencies**
   ```bash
    npm install

### Configuration
No additional configuration is required for the basic setup. The proxy server is set to handle requests to https://jekyllrb.com.

### Running the Application

1. **Start the Application**
    ```bash
    npm run start

This command will start the NestJS server on port 3000 by default.

2. **Access the Proxy**

Open your browser and navigate to http://localhost:3000/proxy. You can use this address to request different paths, for example:

    http://localhost:3000/proxy/news/


This will fetch and display the content of https://jekyllrb.com/news with modified six-letter words and proxy-replaced internal links.

## Building and Running with Docker

### Prerequisites
- Docker
- Docker Compose (optional, if using `docker-compose.yml`)

### Building the Docker Image

To build the Docker image for the project, run the following command in the root directory of the repository:

    cd ./services
    docker-compose build

### Running the Docker Container
To run the Docker container, use the following command:

    docker-compose up -d


## Known Issues:

Originally chosen for the project was docs.nestjs.com. But a problem arose that some scripts or styles were loaded incorrectly, since the nestjs site is somewhat dynamic.
Therefore, jekyllrb.com was chosen, without violating the terms of the technical specifications.

In this case, the proxy works great and you can navigate the site