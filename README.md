# StreamingTest
Simple web app with ReactJS + C# that is steaming data computed by AKKA.net thru gRPC
## **Setup**
### Requerements
* docker
* docker-compose

### Run the application
* Clone repo.
* Build images. From root directory: `docker compose build`.
* Run app. From root directory: `docker compose up -d`.
* Open browser, then go to http://localhost/.

## **Using**
* Press "Сonnect" button. This will start a stream on server and then listen to it.
* On "Formulas" page you can add or edit functions that applies to original point.

## **Troubleshooting**
Test on Docker Desktop 4.19.0, another version not tested.
Ensure that nothing already started on ports 80,8080 and 9901
