<template>
  <v-flex>
    <v-data-table
        :items="pagination.records"
        :disable-sort="disableSort"
        :headers="tableHeaders" :server-items-length="pagination.total_records"
        :page="pagination.cur_page"
        :mobile="false"
        :mobile-breakpoint="1"
        @update:page="(data)=> {
          pagination.cur_page = data;
          $emit('onPageChange', {page: data, per_page})
        }"
        @update:items-per-page="
          n => {
            per_page = n;
            $emit('onPageChange',{page: pagination.cur_page,per_page});
          }
        "
        :footer-props="{
          itemsPerPageText: $t('snippets.rows_on_page'),
          itemsPerPageAllText: $t('words.all'),
          pageText: '{0}-{1} / {2}'
        }">
      <template v-slot:body="{ items }">
        <tbody v-if="items.length > 0">
          <common-data-entry :key="item.id" v-for="item in items" :info="item" :fields="fields"
            @entry-click="(info)=> $emit('entry-click', info)">
            <template v-slot:left="slotProps">
              <slot name="left" v-bind:info="slotProps.info"></slot>
            </template>
            <template v-slot:right="slotProps">
              <slot name="right" v-bind:info="slotProps.info"/>
            </template>
          </common-data-entry>
        </tbody>
        <tbody v-else>

          <tr style="height: 60px" class="align-center test">
            <td style="background-color: #F2F2F2; cursor: pointer " colspan="5" class="text-center"
                @click="$emit('empty-state-click')">
              <v-icon color="#00d369" class="font-24">mdi-plus</v-icon>
              {{ empty_state_text }}
            </td>
          </tr>
        </tbody>
      </template>
    </v-data-table>
  </v-flex>
</template>

<script>
import CommonDataEntry from "./CommonDataEntry";
export default {
	name: "CommonDataTable",
	components: {CommonDataEntry},
	props: {
		per_page: {
		  default: 5,
		},
		empty_state_text: {
		  default: "",
		},
		disableSort: {
		  default: true,
		},
		sections: {},
		fields: {},
		tableHeaders: {},
		pagination: {
			default() {
				return {
					total_pages: 0,
					total_records: 0,
					per_page: 5,
					cur_page: 0,
					records: []
				};
			}
		},
		tableData: {
			default() {
				return {records: []};
			}
		},
	},
};
</script>
