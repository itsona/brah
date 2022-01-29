<template>
  <v-col col="12" style="min-height: 80vh; padding-top: 24px">
    <v-tabs v-model="activeTab" class="mt-5">
    <v-tabs-slider />
    <v-tab class="px-8">{{ $t('clients_table') }}</v-tab>
    <v-tab class="px-8">{{ $t('vauchers_table') }}</v-tab>
  </v-tabs>
    <v-tabs-items v-model="activeTab">
      <v-tab-item>
        <ClientsTable></ClientsTable>
      </v-tab-item>
      <v-tab-item>
        <VauchersTable></VauchersTable>
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