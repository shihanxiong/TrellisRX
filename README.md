# TrellisRX
Full stack implementation (exercise)

Instructions:

To start the service:
1. $cd myapp
2. $npm install
3. $npm start

The port will be :3333

APIs:
1. display all patients:
http://localhost:3333/patients/showall
2. display all medications of a given patient:
http://localhost:3333/patients/{id}/meds (e.g. http://localhost:3333/patients/598d2df6de25cc3394d8ab30/meds)
3. display a given patient's vital info:
http://localhost:3333/patients/598d2df6de25cc3394d8ab30/vitals
4. update a patient's vital info (POST):
http://localhost:3333/patients/updatevitals
    sample payload:
    {
		"id": "598d2df6de25cc3394d8ab30",
		"pulse": 60,
		"temperature": 100
    }

