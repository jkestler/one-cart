# one-cart
A real-time shopping app that syncs shopping items on all your devices


### Live DEMO
[Heroku App](https://lorenz21-one-cart.herokuapp.com/)

## Build Setup

1. Clone the repository
  ```sh
  git clone https://github.com/lorenz21/one-cart.git
  ```

2. Change Directories into the project
  ```sh
  cd one-cart
  ```

3. Install dependencies for Client and Server
  ```sh
  npm install; npm install --prefix client
  ```

4. Create .env file - creat a string called `cookieSecret` and set it `=` to any random string for a session key. 

  ```sh
  touch .env
  ```
  ex. 
  ```sh
  cookieSecret='mysupersecretkey'
  ```

5. Run sequlize migrate if this is the first time the app is being used
  ```sh
   sequelize db:migrate
  ```

6. You can run the client or server by themselves or run both together with the following commands.

#### Togeter
```sh
npm run dev
```
#### Client
```sh
npm run client
```
#### Server
```sh
npm run server
```