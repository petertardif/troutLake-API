const { gql } = require('apollo-server-express');

const typeDefs = gql`
	scalar Date

	enum Role {
		ADMIN
		OWNER
	}

	enum Association {
		TLC_OWNERS_ASSOCIATION
		LHLC_OWNERS_ASSOCIATION
	}

	enum BillStatus {
		DUE
		OVERDUE
		PAID
	}

	enum BillType {
		TLC_OWNERS_ASSOCIATION
		WATER
	}

	enum LandCompany {
		TROUT_LAKE_LAND_COMPANY
		LIZARD_HEAD_LAND_COMPANY
	}

	enum PaymentStatus {
		PAID_IN_FULL
		PARTIAL_PAYMENT
	}

	enum PaymentType {
		ADVANCE
		BALANCE
	}

	enum TLRoadSide {
		NORTH
		SOUTH
	}

	type Query {
		users: [User]
		user(id: ID): User
		sites: [Site]
		site(id: ID): Site
		bills: [Bill]
		bill(id: ID): Bill
		payments: [Payment]
		payment(id: ID): Payment
	}

	input UserInput {
		id: Int
		last_name: String!
		first_name: String!
		email: String!
		password: String!
		role: Role
	}

	input SiteInput {
		site_number: Int!
		tl_address: String!
		tl_city: String!
		tl_state: String!
		tl_zip_code: Int!
		tl_road_side: TLRoadSide!
		tl_phone_number: String
		trout_lake_water: Boolean!
		land_company: LandCompany!
		owners_association: Association!
	}

	input BillsInput {
		year: Int!
		bill_amount: String!
		bill_type: BillType!
		bill_due_date: Date!
		bill_status: BillStatus!
		paid_in_full_date: Date
		site_id: Int!
		updatedAt: Date
	}

	input PaymentInput {
		id: ID
		amount: Float!
		payment_type: PaymentType!
		payment_status: PaymentStatus!
		paid_by: Int
		bill_id: Int
	}

	type Mutation {
		createUser(user: UserInput): [User]
		createSite(site: SiteInput): [Site]
		createBills(bill: BillsInput): [Bill]
		createPayment(payment: PaymentInput): [Payment]
		updateUser(user: UserInput): [User]
		updateSite(
			id: ID!
			tl_phone_number: String
			trout_lake_water: Boolean
			user_id: Int
		): [Site]
		updatePayment(payment: PaymentInput): [Payment]
	}

	type User {
		id: ID!
		last_name: String!
		first_name: String!
		address: String
		city: String
		state: String
		zip_code: Int
		perm_phone_number: String
		other_phone_number: String
		email: String!
		password: String!
		role: Role!
		site: Int
		isDeleted: Boolean
		isActive: Boolean
		updatedAt: Date
		sites: [Site]
	}

	type Site {
		id: ID!
		site_number: Int!
		tl_address: String!
		tl_city: String!
		tl_state: String!
		tl_zip_code: Int!
		tl_road_side: TLRoadSide!
		tl_phone_number: String
		trout_lake_water: Boolean!
		land_company: LandCompany!
		owners_association: Association!
		user_id: Int
		users: [User]
	}

	type Bill {
		id: ID!
		year: Int!
		bill_amount: String!
		bill_type: BillType!
		bill_due_date: Date!
		bill_status: BillStatus!
		paid_in_full_date: Date
		site_id: Int!
		updatedAt: Date
		payments: [Payment]
	}

	type Payment {
		id: ID!
		amount: String!
		payment_date: Date!
		payment_type: PaymentType!
		payment_status: PaymentStatus!
		paid_by: Int
		bill_id: Int
		users: [User]
	}
`;

module.exports = { typeDefs };
