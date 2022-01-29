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
    <v-tabs v-model="activeTab" class="mt-5">
    <v-tabs-slider />
    <v-tab class="px-8">{{ $t('clients_table') }}</v-tab>
    <v-tab class="px-8">{{ $t('vauchers_table') }}</v-tab>
  </v-tabs>
    <v-tabs-items v-model="activeTab">
      <v-tab-item>
        <ClientsTable></ClientsTable>
      </v-tab-item>
        <VauchersTable></VauchersTable>
      <v-tab-item>
      </v-tab-item>
      <v-tab-item>
      </v-tab-item>
    </v-tabs-items>
  </v-col>

</template>

<script>
import ClientsTable from "./ClientsTable";
import VauchersTable from "./plugins/VauchersTable";
export default {
	name: "Clients",
	data() {
	  return {
			activeTab: 0,
		};
	},
	components: {VauchersTable, ClientsTable}
};
</script>

<style scoped>


</style>