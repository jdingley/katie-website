require("date-format-lite"); // add date format
var xssFilters = require('xss-filters');

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
			"INSERT INTO ?? (start_date, end_date, name, phone, email, message) VALUES (?,?,?,?,?,?)",
			[this.table, data.start_date, data.end_date, data.name, data.phone, data.email, data.text]);

		return {
			action: "inserted",
			tid: result.insertId
		}
	}

	// update event
	async update(id, data) {
		await this._db.query(
			"UPDATE ?? SET start_date = ?, end_date = ?, , name = ?, , phone = ?, , email = ?, message = ? WHERE id = ?",
			[this.table, data.start_date, data.end_date, data.name, data.phone, data.email, data.text, id]);

		return {
			action: "updated"
		}
	}

	// delete event
	async delete(id) {
		await this._db.query(
			"DELETE FROM ?? WHERE `id`=? ;",
			[this.table, id]);

		return {
			action: "deleted"
		}
	}
}

module.exports = Storage;
