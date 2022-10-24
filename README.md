# Jubo doctor

- ...

## Prerequisite

- Here are some essential tools that you need to have to running project properly, and some optional tools if you want to change the repository.
And please feel free to make any changes that suit your interest.

- [docker](https://www.docker.com/)
- [make](https://www.gnu.org/software/make/)
- [node(Optional)](https://nodejs.org/en/)
- [PostgreSQL(Optional)](https://www.postgresql.org/)
- [Typescript(Optional)](https://www.typescriptlang.org/)


### Get Started

- Once you finished pulling the repository, you will have a simple file structure like this. To look up more specificly you can exec `tree -I 'node_modules|dist|public'`

```text
├── LICENCE
├── Makefile
├── README.md
├── apps
├── docker-compose.yaml
└── services
```

- If you are not going to make any changes, the only two things you need is inside `docker-compose.yaml` and `Makefile`. To execute and running the application.
You can start with `make help` to see what kinds of commands you can use. That's get started.

### Install and Run

-- Before running the application you need to build the entire app first, if you have questions about `make` commands go down below and take a look what our `makefile` can help you.

```shell
// Build Application
make build
```

-- Once you finished building the application, you will know be able to spin up the multi-containers. 

```shell
// Run Application
make up
```

** The App will running on `localhost:8080` as default, if you want to make any change, feel free to do so. **


-- When you finished spinning up the application, you can go and see this log if you wanted. If you have any
questions about logging, see `make logs` command down description below.

-- Here are lists of containers which you can refer to their logs
    -- doctordb
    -- doctorpgadmin
    -- doctorserver
    -- doctorclient
    -- nginx

### Migrations

-- The entites migration is not auto generate by orm, you can find them in `services/manul_migration`

```text
|-- LICENCE
|-- Makefile
|-- README.md
|-- docker-compose.yaml
-- services
    |-- manul_migration
    |   |-- default.sql
    |   |-- order.create.sql
    |   |-- order.insert.sql
    |   |-- patient.create.sql
    |   `-- patient.insert.sql
```

Execution sequence
- First you have to execute `default.sql`
- Second execute `patient.create.sql`
- Third execute `order.create.sql`
- Fourth execute `patient.insert.sql`
- Fifth execute `order.insert.sql`

#### Helper command

- list all commands available for make

```shell
make help
```

#### Build command

- build the image from Dockerfile. In our applications we have a server build on top of Nestjs framework, and Vue Typescript frontend binding with Nginx.

```shell
make build            # building all containers
make build c=doctordb # building database only
```

#### Up command

- Stopping and recreating the containers

```shell
make up            # up all containers
make up c=doctordb # up database only
```

#### Start command

- Is used to start the containers. To start only one container for example if I only want to start db container run `make start c=doctordb`

```shell
make start            # starting all containers
make start c=doctordb # starting database only
```

#### Down command

- Is used to stop and remove containers. To delete specific container use for example if I only want to delete db container run `make down c=doctordb`

```shell
make down            # delete all containers
make down c=doctordb # delete database only
```

#### Restart command

- Is used to restart containers. To restart specific container use for example if I only want to restart db container run `make down c=doctordb`

```shell
make restart            # restart all containers
make restart c=doctordb # restart database only
```

#### Logs command

- Is used to see the log of the containers. To log specific container use for example if I only want to log db container run `make log c=doctordb`

```shell
make log            # log all containers
make log c=doctordb # log database only
```
