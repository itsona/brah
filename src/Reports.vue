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
	name: "Reports",
	computed: {
		headers(){
			return [
				{
					text: this.$t("employee"),
					align: "start",
					sortable: true,
					value: "employee",
				},
				{
					text: this.$t("orders_count"),
					sortable: true, value: "orders_count" },
				{
					text: this.$t("orders_net"),
					sortable: true, value: "orders_net" },
				{
					text: this.$t("orders_net_payed"),
					sortable: true, value: "orders_net_payed" },
				{
					text: this.$t("orders_net_bought"),
					sortable: true, value: "orders_net_bought" },
			];
		},
		desserts(){
			return [
				{
					employee: "ხვიჩა",
					orders_count: 27,
					orders_net: 185,
					orders_net_payed: 112,
					orders_net_bought: 8,
				},
				{
					employee: "მაია",
					orders_count: 76,
					orders_net: 85,
					orders_net_payed: 42,
					orders_net_bought: 77,
				},
				{
					employee: "გოჩა",
					orders_count: 120,
					orders_net: 2732,
					orders_net_payed: 0,
					orders_net_bought: 0,
				},
				{
					employee: "თამუნა",
					orders_count: 61,
					orders_net: 850,
					orders_net_payed: 0,
					orders_net_bought: 220,
				},
				{
					employee: "მაია",
					orders_count: 76,
					orders_net: 85,
					orders_net_payed: 42,
					orders_net_bought: 77,
				},
				{
					employee: "გოჩა",
					orders_count: 120,
					orders_net: 2732,
					orders_net_payed: 0,
					orders_net_bought: 0,
				},
				{
					employee: "თამუნა",
					orders_count: 61,
					orders_net: 850,
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