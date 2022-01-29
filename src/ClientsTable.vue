<template>

  <v-data-table
      :headers="headers"
      :items="desserts"
      :items-per-page="5"
      class="pt-12 mt-15"
  ></v-data-table>
</template>

<script>
export default {
	name: "ClientsTable",
	computed: {
		headers(){
			return [
				{
					text: this.$t("client"),
					align: "start",
					sortable: true,
					value: "employee",
				},
				{
					text: this.$t("vouchers_count"),
					sortable: true, value: "vouchers_count" },
				{
					text: this.$t("total_payed_net"),
					sortable: true, value: "total_payed_net" },
				{
					text: this.$t("vaucher_exparation_date"),
					sortable: true, value: "vaucher_exparation_date" },
				{
					text: this.$t("last_visit_date"),
					sortable: true, value: "last_visit_date" },
			];
		},
		desserts(){
			return [
				{
					employee: "გიორგი",
					vouchers_count: 4,
					total_payed_net: 200,
					vaucher_exparation_date: Date("05/28/2022").substring(0, 15),
					last_visit_date: 8,
				},
				{
					employee: "ელენე",
					vouchers_count: 3,
					total_payed_net: 150,
					vaucher_exparation_date: 42,
					last_visit_date: 77,
				},
				{
					employee: "ნინი",
					vouchers_count: 6,
					total_payed_net: 300,
					vaucher_exparation_date: 0,
					last_visit_date: 0,
				},
				{
					employee: "ლაშა",
					vouchers_count: 7,
					total_payed_net: 350,
					vaucher_exparation_date: 0,
					last_visit_date: 220,
				},
				{
					employee: "მაია",
					vouchers_count: 8,
					total_payed_net: 400,
					vaucher_exparation_date: 42,
					last_visit_date: 77,
				},
				{
					employee: "მარიამი",
					vouchers_count: 5,
					total_payed_net: 250,
					vaucher_exparation_date: 0,
					last_visit_date: 0,
				},
				{
					employee: "თამარი",
					vouchers_count: 4,
					total_payed_net: 200,
					vaucher_exparation_date: 0,
					last_visit_date: 220,
				},
			];
		}
	},
};
</script>

<style scoped>

</style>