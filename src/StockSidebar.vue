<template>
    <div class="sidebar mr-4 ">
        <side-navigation-drawer :items="items" ref="drawer" />
        <div class="sidebar-wrapper">
            <div class="sidebar-items">
                <router-link :to="{ name: item.route }"
                             active-class="none"
                             v-for="(item, idx) in items"
                             :key="idx"
                             style="text-decoration: none; color: inherit;">
                    <div
                        class="sidebar-item item-active"
                    >
                        <v-icon class="sidebar-icon"> {{ item.icon }} </v-icon>
                    </div>

                </router-link>
                <div class="drawer-open-btn" @click="clickDrawer">
                    <v-icon class="sidebar-icon">
                        chevron_right
                    </v-icon>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SideNavigationDrawer from "./SideNavigationDrawer.vue";

export default {
	name: "StockSidebar",
	data () {
		return {
			drawer: false,
			items: [
				{ name: "home", icon: "home", route: "stock-home" },
				{ name: "overview", icon: "analytics", route: "stock-overview" },
				{ name: "assortment", icon: "category", route: "stock-assortment" },
				{ name: "transfers", icon: "swap_calls", route: "stock-transfers" },
				{ name: "operate", icon: "build", route: "stock-operate" },
				{ name: "settings", icon: "settings", route: "stock-settings-main" },
			],
		};
	},
	methods: {
		clickDrawer () {
			this.$refs.drawer.clickDrawer();
		}

	},
	components: {
		SideNavigationDrawer
	}
};
</script>

<style lang="scss" scoped>
.sidebar{
  width: 100%;
  display: flex;
  height: 100vh;
  color: var(--text-sub-black);
  border-right: 1px solid rgba(180,180, 180, 0.6);
}
.sidebar {
  width: 50px;
}

.sidebar-icon {
  width: 50px;
  height: 50px;
}

.drawer-open-btn {
  display: flex;
  position: absolute;
  bottom: 8px;
}

</style>
