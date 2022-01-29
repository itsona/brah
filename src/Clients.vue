<template>
  <v-col col="12" style="min-height: 80vh; padding-top: 24px">
    <v-row class="justify-space-between">
      <v-card
          class="mx-4 pa-4 px-8"
      >
        <v-card-title>{{$t('total_day_income')}}</v-card-title>
        <v-card-text>
          <v-row  class="font-32 align-center">
            <span class="title-red ">225 ₾</span>
            <v-icon color="red" class="px-3 d-block"
                    style="width: 50px">show_chart_sharp</v-icon>
            <span style="color: unset">({{$t('yesterday')}}: 248 ₾)</span>
          </v-row>
        </v-card-text>
      </v-card>
      <v-card
          class="mx-4 pa-4 px-8"
      >
        <v-card-title>{{$t('total_day_income')}}</v-card-title>
        <v-card-text>
          <v-row  class="font-32 align-center">
            <span class="title-green ">225 ₾</span>
            <v-icon color="green" class="px-3 d-block"
                    style="width: 50px">show_chart_sharp</v-icon>
            <span style="color: unset">({{$t('yesterday')}}: 188 ₾)</span>
          </v-row>
        </v-card-text>
      </v-card>
      <v-card
          class="mx-4 pa-4 px-8"
      >
        <v-card-title>{{$t('total_day_income')}}</v-card-title>
        <v-card-text>
          <v-row  class="font-32 align-center">
            <span class="title-red ">225 ₾</span>
            <v-icon color="red" class="px-3 d-block"
                    style="width: 50px">show_chart_sharp</v-icon>
            <span style="color: unset">({{$t('yesterday')}}: 248 ₾)</span>
          </v-row>
        </v-card-text>
      </v-card>
      <v-card
          class="mx-4 pa-4 px-8"
      >
        <v-card-title>{{$t('total_day_income')}}</v-card-title>
        <v-card-text>
          <v-row  class="font-32 align-center">
            <span class="title-red ">225 ₾</span>
            <v-icon color="red" class="px-3 d-block"
                    style="width: 50px">show_chart_sharp</v-icon>
            <span style="color: unset">({{$t('yesterday')}}: 248 ₾)</span>
          </v-row>
        </v-card-text>
      </v-card>
    </v-row>
    <v-data-table
        :headers="headers"
        :items="desserts"
        :items-per-page="5"
        class="pt-12 mt-15"
    ></v-data-table>
  </v-col>

</template>

<script>
export default {
	name: "Clients",
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
					sortable: true, value: "orders_count" },
				{
					text: this.$t("total_payed_net"),
					sortable: true, value: "orders_net" },
				{
					text: this.$t("vaucher_exparation_date"),
					sortable: true, value: "orders_net_payed" },
				{
					text: this.$t("last_visit_date"),
					sortable: true, value: "orders_net_bought" },
			];
		},
		desserts(){
			return [
				{
					employee: "გიორგი",
					orders_count: 4,
					orders_net: 200,
					orders_net_payed: Date("05/28/2022").substring(0, 15),
					orders_net_bought: 8,
				},
				{
					employee: "ელენე",
					orders_count: 3,
					orders_net: 150,
					orders_net_payed: 42,
					orders_net_bought: 77,
				},
				{
					employee: "ნინი",
					orders_count: 6,
					orders_net: 300,
					orders_net_payed: 0,
					orders_net_bought: 0,
				},
				{
					employee: "ლაშა",
					orders_count: 7,
					orders_net: 350,
					orders_net_payed: 0,
					orders_net_bought: 220,
				},
				{
					employee: "მაია",
					orders_count: 8,
					orders_net: 400,
					orders_net_payed: 42,
					orders_net_bought: 77,
				},
				{
					employee: "მარიამი",
					orders_count: 5,
					orders_net: 250,
					orders_net_payed: 0,
					orders_net_bought: 0,
				},
				{
					employee: "თამარი",
					orders_count: 4,
					orders_net: 200,
					orders_net_payed: 0,
					orders_net_bought: 220,
				},
			];
		}
	},
};
</script>

<style scoped>

</style>