# Accounts API

A simple REST API for managing an Accounts collection in MongoDB.

## Stack

nodejs, express, mongodb, zod

## Installation

```
npm install
```

Add constants in .env. Use example.env as an example

## Start

```
npm run dev
```

## Available Endpoints

### 1. Create Account

- **POST** `/api/accounts`
- **Request body:**
  ```json
  {
    "name": "John Doe",
    "scope": "account"
  }
  ```
- **Response:**
  ```json
  {
    "_id": "...",
    "name": "John Doe",
    "scope": "account",
    "createdAt": "...",
    "updatedAt": "..."
  }
  ```

### 2. Update Account

- **PUT** `/api/accounts/:id`
- **Request body:**
  ```json
  {
    "name": "Jane Doe",
    "scope": "prospect"
  }
  ```
- **Response:**
  ```json
  {
    "_id": "...",
    "name": "Jane Doe",
    "scope": "prospect",
    "createdAt": "...",
    "updatedAt": "..."
  }
  ```

### 3. Get Stats

- **GET** `/api/accounts/stats`
- **Response:**
  ```json
  {
    "accounts": 5,
    "prospects": 3,
    "children": 2
  }
  ```

## Validation

- All fields are validated using Zod.
- If validation fails, a list of errors is returned.
