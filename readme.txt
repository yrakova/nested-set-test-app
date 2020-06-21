To run the server launch in cmd:

node server.js

Server will run on http://localhost:8080/


To run the client launch

npm run serve

Client will run on http://localhost:8081


It is supposed that ONLY_FULL_GROUP_BY is disabled. To do it write in mysql console:

set GLOBAL sql_mode='STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
