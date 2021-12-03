import Dashboard from "@views/user/Dashboard";
import Invoices from "@views/user/Invoices";
import Customers from "@views/user/Customers";
import Reports from "@views/user/Reports";
import IncomeByCustomer from "@views/user/IncomeByCustomer";
import AgedReceivables from "@views/user/AgedReceivables";
import Customer from "@views/user/Customer";
import Settings from "@views/user/AccountSettings";
import Invoice from "@views/user/invoices/invoice/Invoice";
import Imports from "../../../views/user/Imports";

export default [
	{
		path: "/user",
		component: Dashboard,
		meta: {
			authRequired: true,
			userManagement: true
		},
		children: [
			{ path: "", component: Invoices },

			{
				path: "settings",
				name: "User.AccountSettings",
				component: Settings
			},
			{
				path: "invoices",
				name: "User.Invoices",
				component: Invoices
			},
			{
				path: "imports",
				name: "User.Imports",
				component: Imports
			},
			{
				path: "invoices/:id",
				name: "User.Invoice",
				component: Invoice
			},
			{
				path: "invoices/create",
				name: "User.Invoices.Create",
				component: Invoice
			},
			{
				path: "customers",
				name: "User.Customers",
				component: Customers
			},
			{
				path: "customers/:id",
				name: "User.Customer",
				component: Customer
			},
			{
				path: "customers/create",
				name: "User.Customer.Create",
				component: Customer
			},
			{
				path: "reports",
				name: "User.Reports",
				component: Reports
			},
			{
				path: "reports/income-by-customer",
				name: "User.Reports.IBC",
				component: IncomeByCustomer
			},
			{
				path: "reports/aged-receivables",
				name: "User.Reports.AR",
				component: AgedReceivables
			}
		]
	}
];
