const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

const { Pool } = require('pg');
const db = new Pool();

const resolvers = {
	Query: {
		users: async () => {
			try {
				const arrOfUsers = await db.query(
					'SELECT * FROM users WHERE isActive = true AND isDeleted = false'
				);
				return arrOfUsers.rows;
			} catch (e) {
				console.log(e.stack);
			}
		},
		user: async (obj, { id }) => {
			try {
				const numId = parseInt(id);
				const arrOfusers = await db.query(
					`SELECT * FROM users WHERE id = '${numId}' AND isActive = true AND isDeleted = false;`
				);
				return arrOfusers.rows[0];
			} catch (e) {
				console.log(e.stack);
			}
		},
		sites: async () => {
			try {
				const sites = await db.query(`SELECT * FROM sites;`);
				return sites.rows;
			} catch (e) {
				console.log(e.stack);
			}
		},
		site: async (obj, { id }) => {
			try {
				const numId = parseInt(id);
				const foundSite = await db.query(
					`SELECT * FROM sites WHERE site_number = '${numId}';`
				);
				return foundSite.rows[0];
			} catch (e) {
				console.log(e.stack);
			}
		},
		bills: async () => {
			try {
				const bills = await db.query(`SELECT * FROM bills;`);
				return bills.rows;
			} catch (e) {
				console.log(e.stack);
			}
		},
		bill: async (obj, { id }) => {
			try {
				const foundBill = await db.query(
					`SELECT * FROM bills WHERE id = '${id}'`
				);
				console.log(foundBill.rows);
				return foundBill.rows[0];
			} catch (e) {
				console.log(e.stack);
			}
		},
		payments: async () => {
			try {
				const payments = await db.query(`SELECT * FROM payments;`);
				return payments.rows;
			} catch (e) {
				console.log(e.stack);
			}
		},
		payment: async (obj, { id }) => {
			try {
				const foundPayment = await db.query(
					`SELECT * FROM payments WHERE id = '${id}'`
				);
				return foundPayment.rows[0];
			} catch (e) {
				console.log(e.stack);
			}
		},
	},

	User: {
		sites: async (obj, arg, context) => {
			try {
				const arrOfSites = await db.query(
					`SELECT * FROM sites WHERE user_id = '${obj.id}'`
				);
				return arrOfSites.rows;
			} catch (e) {
				console.log(e.stack);
			}
		},
	},

	Site: {
		users: async (obj, arg, context) => {
			try {
				const arrOfUsers = await db.query(
					`SELECT * FROM users WHERE site_id = '${obj.site_number}'`
				);
				return arrOfUsers.rows;
			} catch (e) {
				console.log(e.stack);
			}
		},
	},

	Bill: {
		payments: async (obj, arg, context) => {
			try {
				const arrOfPayments = await db.query(
					`SELECT * FROM payments WHERE bill_id = '${obj.id}'`
				);
				return arrOfPayments.rows;
			} catch (e) {
				console.log(e.stack);
			}
		},
	},

	Payment: {
		users: async (obj, arg, context) => {
			try {
				const arrOfUsers = await db.query(
					`SELECT * FROM users WHERE id = '${obj.paid_by}'`
				);
				return arrOfUsers.rows;
			} catch (e) {
				console.log(e.stack);
			}
		},
	},

	Mutation: {
		createUser: async (obj, { user }, context) => {
			try {
				const newUser = await db.query(`INSERT INTO users 
					(
						last_name, 
						first_name, 
						email, 
						password, 
						role
					)
					VALUES ('${user.last_name}','${user.first_name}', '${user.email}', '${user.password}', '${user.role}')
					RETURNING *`);
				return newUser.rows;
			} catch (e) {
				console.log(e.stack);
			}
		},
		updateUser: async (obj, { user }, context) => {
			try {
				const updatedDate = new Date().toISOString();
				const statement =
					'UPDATE users SET last_name = $1, first_name = $2, email = $3, password = $4, role = $5, updatedAt = $6 WHERE id = $7 RETURNING *';
				const values = [
					`${user.last_name}`,
					`${user.first_name}`,
					`${user.email}`,
					`${user.password}`,
					user.role,
					`${updatedDate}`,
					user.id,
				];
				const updateUser = await db.query(statement, values);
				return updateUser.rows;
			} catch (e) {
				console.log(e.stack);
			}
		},
		createSite: async (obj, { site }, context) => {
			try {
				const newSite = await db.query(`INSERT INTO sites (site_number,
					tl_address,
					tl_city,
					tl_state,
					tl_zip_code,
					tl_road_side,
					tl_phone_number,
					trout_lake_water,
					land_company,
					owners_association) VALUES (${site.site_number},
						'${site.tl_address}',
						'${site.tl_city}',
						'${site.tl_state}',
						${site.tl_zip_code},
						'${site.tl_road_side}',
						'${site.tl_phone_number}',
						${site.trout_lake_water},
						'${site.land_company}',
						'${site.owners_association}') RETURNING *`);
				return newSite.rows;
			} catch (e) {
				console.log(e.stack);
			}
		},
		updateSite: async (obj, args, context) => {
			try {
				const statement =
					'UPDATE sites SET tl_phone_number = $1, trout_lake_water = $2, user_id = $3  WHERE id = $4 RETURNING *';
				const values = [
					`${args.tl_phone_number}`,
					`${args.trout_lake_water}`,
					`${args.user_id}`,
					args.id,
				];
				const updatedSite = await db.query(statement, values);
				return updatedSite.rows;
			} catch (e) {
				console.log(e.stack);
			}
		},
		// TODO Finish creating bills
		createBills: async (obj, { bill }, context) => {
			try {
				const tlWaterSites = await db.query(
					`SELECT id FROM sites WHERE trout_lake_water = true RETURNING * `
				);
				const query = {
					text: 'INSERT INTO bills VALUES ()',
					values: ['Brian', 'Carlson'],
					rowMode: 'array',
				};
				const newBills = await db.query();
				return newBills.rows;
			} catch (e) {
				console.log(e.stack);
			}
		},
		createPayment: async (obj, { payment }, context) => {
			try {
				const newPayment = await db.query(
					`INSERT INTO payments (amount, payment_type, payment_status, paid_by, bill_id)
					VALUES (${payment.amount},'${payment.payment_type}','${payment.payment_status}',${payment.paid_by},${payment.bill_id})
					RETURNING *`
				);
				return newPayment.rows;
			} catch (e) {
				console.log(e.stack);
			}
		},
		updatePayment: async (obj, { payment }, context) => {
			try {
				const statement = `UPDATE payments SET amount = $1, payment_type = $2, payment_status = $3, paid_by = $4, bill_id = $5 WHERE id = $6 RETURNING *`;

				const values = [
					payment.amount,
					`${payment.payment_type}`,
					`${payment.payment_status}`,
					payment.paid_by,
					`${payment.bill_id}`,
					payment.id,
				];

				const updatedPayment = await db.query(statement, values);
				return updatedPayment.rows;
			} catch (e) {
				console.log(e.stack);
			}
		},
	},

	Date: new GraphQLScalarType({
		name: 'Date',
		description: `Date custom scalar type`,
		parseValue(value) {
			// value from the client
			return new Date(value);
		},
		serialize(value) {
			// value sent to the client
			return value.getTime();
		},
		parseLiteral(ast) {
			if (ast.kind === Kind.INT) {
				return new Date(ast.value);
			}
			return null;
		},
	}),
};

module.exports = { resolvers };
