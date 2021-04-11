# restartapp
Node.js REST API for restarting a Docker container.
Application must run on the host machine and have permission to call `docker container restart`.

###### Environment variables
| Variable name | Description |
| --- | --- |
| TOKEN | Authorisation token to validate secure endpoint requests |
| PORT | Port to have the server listen on |

### Endpoints
###### /restart/:container
Restarts a Docker container with the name of `:container` on the sever's host machine.
