require("date-format-lite"); // add date format
var xssFilters = require('xss-filters');
var moment = require('moment');

class Storage {
	constructor(connection) {
		this._db = connection;
		this.table = "events";
	}

	// get events from the table, use dynamic loading if parameters sent
	async getAll(params) {
		let query = "SELECT * FROM ??";
		let queryParams = [
			this.table
		];

		if (params.from && params.to) {
			query += " WHERE `end_date` >= ? AND `start_date` < ?";
			queryParams.push(params.from);
			queryParams.push(params.to);
		}

		let result = await this._db.query(query, queryParams);

		result.forEach((entry) => {
			// format date and time
			entry.id = xssFilters.inHTMLData(entry.id);
			entry.text = xssFilters.inHTMLData(entry.text);
			entry.start_date = entry.start_date.format("YYYY-MM-DD hh:mm");
			entry.end_date = entry.end_date.format("YYYY-MM-DD hh:mm");
		});
		return result;
	}

	// create new event
	async insert(data) {
		let result = await this._db.query(
			"INSERT INTO ?? (start_date, end_date, name, phone, email, text) VALUES (?,?,?,?,?,?)",
			[this.table, data.start_date, data.end_date, data.name, data.phone, data.email, data.text]);
			
		const mailjet = require ('node-mailjet')
		.connect('46a6a756be1c9368fe9e9e63eef87f39', 'ee2d1205e89662756521021ee59db8d7')
		const request = mailjet
		.post("send", {'version': 'v3.1'})
		.request({
			"Messages":[
				{
					"From": {
						"Email": "notification@upliftingcounselingservices.com",
						"Name": "Notification"
					},
					"To": [
						{
							"Email": "kadiatutarawalie2000@gmail.com",
							"Name": "Kadiatu"
						}
					],
					"Subject": "Some one scheduled an appoinment",
					"TextPart": "Hey "+data.name+" scheduled a new appointment for "+moment(data.start_date).format('MM/DD/YYYY hh:mm A')+" to "+moment(data.end_date).format('MM/DD/YYYY HH:mm A')+" and added the following message: "+data.text+" \n You can contact them either at their phone: "+data.phone+" or their email: "+data.email,
					"CustomID": "ScheduledAppointment"
				}
			]
		})
		request
			.then((result) => {
				console.log(result.body)
			})
			.catch((err) => {
				console.log(err.statusCode)
			})
		return {
			action: "inserted",
			tid: result.insertId
		}
	}

	// update event
	async update(id, data) {
		await this._db.query(
			"UPDATE ?? SET start_date = ?, end_date = ?, , name = ?, , phone = ?, , email = ?, text = ? WHERE id = ?",
			[this.table, data.start_date, data.end_date, data.name, data.phone, data.email, data.text, id]);
				const mailjet = require ('node-mailjet')
		.connect('46a6a756be1c9368fe9e9e63eef87f39', 'ee2d1205e89662756521021ee59db8d7')
		const request = mailjet
		.post("send", {'version': 'v3.1'})
		.request({
			"Messages":[
				{
					"From": {
						"Email": "notification@upliftingcounselingservices.com",
						"Name": "Notification"
					},
					"To": [
						{
							"Email": "kadiatutarawalie2000@gmail.com",
							"Name": "Kadiatu"
						}
					],
					"Subject": "An Appointment has Been Updated",
					"TextPart": "Hey, "+data.name+" updated a their appointment for "+moment(data.start_date).format('MM/DD/YYYY hh:mm A')+" to "+moment(data.end_date).format('MM/DD/YYYY HH:mm A')+" and with the following message: "+data.text+" \n You can contact them either at their phone: "+data.phone+" or their email: "+data.email,
					"CustomID": "UpdateAppointment"
				}
			]
		})
		request
			.then((result) => {
				console.log(result.body)
			})
			.catch((err) => {
				console.log(err.statusCode)
			})
		return {
			action: "inserted",
			tid: result.insertId
		}

		return {
			action: "updated"
		}
	}

	// delete event
	async delete(id) {
		await this._db.query(
			"DELETE FROM ?? WHERE `id`=? ;",
			[this.table, id]);
				const mailjet = require ('node-mailjet')
		.connect('46a6a756be1c9368fe9e9e63eef87f39', 'ee2d1205e89662756521021ee59db8d7')
		const request = mailjet
		.post("send", {'version': 'v3.1'})
		.request({
			"Messages":[
				{
					"From": {
						"Email": "notification@upliftingcounselingservices.com",
						"Name": "Notification"
					},
					"To": [
						{
							"Email": "kadiatutarawalie2000@gmail.com",
							"Name": "Kadiatu"
						}
					],
					"Subject": "Some one canceled an appoinment",
					"TextPart": "An appointment has been canceled. The calander has been updated.",
					"CustomID": "DeleteAppointment"
				}
			]
		})
		request
			.then((result) => {
				console.log(result.body)
			})
			.catch((err) => {
				console.log(err.statusCode)
			})
		return {
			action: "deleted"
		}
	}
}

module.exports = Storage;
