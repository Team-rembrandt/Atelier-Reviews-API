# Atelier Reviews API

Lightweight, scalable microservice serving a growing [ecommerce front-end](https://github.com/FEC-Athena/Front-End-Capstone)

## Contents

- [Contributing](CONTRIBUTING.md)
- [Using the API](docs/API-usage.md)
- [Deploying to AWS](docs/Deployment.md)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)

## Test results with Loader.io

#### Result with 30,000 requests per second using x2Large AWS instance as Nginx server (note: having 3 local machines to run the same test simultaneously)
![30k](https://res.cloudinary.com/de6ct75k5/image/upload/v1631389740/30k_tmaaj5.png)

#### Result with 8,000 requests per second using free tier micro AWS instance as Nginx server
![8k](https://res.cloudinary.com/de6ct75k5/image/upload/v1631389739/8k_myfncq.png)
---

### Tech Stack

![node](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

- Node.js provides an asynchronous event-driven runtime environment for building scalable network applications

![express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)

- Express was chosen for it's minimal interface and flexible HTTP routing methods

![postgresql](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

- PostreSQL is used here as a robust and stable open source database

![nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)

- NGINX enables load balancing HTTP traffic between between many routers

![loader.io](https://res.cloudinary.com/de6ct75k5/image/upload/c_thumb,w_200,g_face/v1631389510/Screen_Shot_2021-09-11_at_12.44.56_PM_oy7do5.png)

- Loader.io is used to stress test the performance of our system

---

### System Architecture

![System Architecture](https://res.cloudinary.com/de6ct75k5/image/upload/v1631389166/Screen_Shot_2021-09-11_at_12.39.09_PM_moiuqf.png)
