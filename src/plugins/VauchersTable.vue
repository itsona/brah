<template>
  <v-data-table
      :headers="headers"
      :items="vouchers"
      :items-per-page="5"
      class=""
  ></v-data-table>
</template>

<script>
export default {
	name: "VauchersTable",
	data() {
	  return {
			headers: [],
			vouchers: [],
		};
	},
	created() {
	    this.headers = this.getHeaders();
	    this.vouchers = this.getVouchers();
	    this.$store.state.vouchers = this.vouchers;
	},
	methods: {
		getHeaders(){
			return [
				{
					text: this.$t("voucher_id"),
					align: "start",
					sortable: true,
					value: "voucher_id",
				},
				{
					text: this.$t("voucher_type"),
					sortable: true, value: "voucher_type" },
				{
					text: this.$t("voucher_price"),
					sortable: true, value: "voucher_price" },
				{
					text: this.$t("voucher_money_left"),
					sortable: true, value: "voucher_money_left" },
				{
					text: this.$t("voucher_exp_date"),
					sortable: true, value: "voucher_exp_date" }
			];
		},
		getVouchers(){
			return [
				{
					voucher_type: "თმის შეჭრის ვაუჩერი",
					voucher_price: 50,
					voucher_id: 1,
					voucher_money_left: 30,
					voucher_exp_date: Date()
				},
				{
					voucher_type: "თმის შეღებვის ვაუჩერი",
					voucher_price: 30,
					voucher_id: 2,
					voucher_money_left: 22,
					voucher_exp_date: Date()
				},
				{
					voucher_type: "წვერის შეჭრა/შესწორების ვაუჩერი",
					voucher_price: 40,
					voucher_id: 3,
					voucher_money_left: 20,
					voucher_exp_date: Date()
				},
				{
					voucher_type: "თმის შეჭრის ვაუჩერი",
					voucher_price: 50,
					voucher_id: 4,
					voucher_money_left: 40,
					voucher_exp_date: Date()
				},
				{
					voucher_type: "თმის შეღებვის ვაუჩერი",
					voucher_price: 30,
					voucher_id: 5,
					voucher_money_left: 15,
					voucher_exp_date: Date()
				},
				{
					voucher_type: "წვერის შეჭრა/შესწორების ვაუჩერი",
					voucher_price: 40,
					voucher_id: 6,
					voucher_money_left: 15,
					voucher_exp_date: Date()
				},
				{
					voucher_type: "თმის შეჭრის ვაუჩერი",
					voucher_price: 50,
					voucher_id: 7,
					voucher_money_left: 30,
					voucher_exp_date: Date()
				},
			];
		}
	}
};
</script>

<style scoped>

</style>