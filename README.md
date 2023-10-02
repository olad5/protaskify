# Protaskify

Protaskify is a Backend API application that allows users to Manages project, tasks, deadlines, and notifications.

It has the following functionalities
* User should be able to setup project and assign task to users 
* Users should be notified when task is assigned 
* Users should be notified when task are due. 



## 1 ) To run the migrations
```
cd protaskify

#To start the infrastructure services, run
docker compose up

#To run migrations
npm run user-service:migrate:latest
npm run task-service:migrate:latest

```

## 2 ) To start the services
```


#In terminal 1, run
nx serve api-gateway

#In terminal 2, run
make run.user-service 

#In terminal 3, 
nx serve task-service
   
#In terminal 4, 
nx serve notification-service

```

### Built with

#### Backend

- [Nx](https://www.nx.dev/) - Monorepo
- [Nest js](https://www.nestjs.com/) - Node js Framework
- [Postgresql](https://www.postgresql.org/) - Database
- [Knex js](https://knexjs.org/) - The Query Builder for Node.js
- [Objection js](https://vincit.github.io/objection.js/) - The ORM for Node.js
- [Rabbit MQ](https://www.rabbitmq.com/) - Open Source Message Broker
