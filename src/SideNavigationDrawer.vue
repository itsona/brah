<template>
    <v-navigation-drawer  v-model="drawer" fixed temporary class="sidebar-drawer">
        <v-list dense class="py-0 sidebar">
            <v-list-item-group class="drawer-items">
                <v-list-item
                    v-for="(item, idx) in items"
                    class="expanded-item"
                    :class="{ 'title-active': itemActive(item) }"
                    :key="idx"
                >
                    <router-link :to="{ name: item.route }">
                        <v-list-item-icon class="sidebar-icon text--secondary">
                            <v-icon class="mr-6 ml-2">
                                {{ item.icon }}
                            </v-icon>
                          {{$t(item.name)}}
                        </v-list-item-icon>
                    </router-link>
                </v-list-item>
                <v-list-item @click="clickDrawer"
                    class="drawer-open-btn">
                  <a class="router-link-active">
                    <v-list-item-icon class="sidebar-icon  text--secondary">
                      <v-icon class="mr-6 ml-2">
                        chevron_left
                      </v-icon>
                      Close sidebar
                    </v-list-item-icon>
                  </a>
                </v-list-item>
                <v-row
                    active-class="none"
                    class="languages ml-5">
                  <a class="router-link-active">
                    <v-btn class="sidebar-icon flex align-center justify-center " icon width="40px" height="40px">
                      <img class="pa-2" :src="require('./assets/img/ka.svg')" @click="$i18n.locale = 'ka'; callSnack('set_to_ka')">
                    </v-btn>
                    <v-btn class="sidebar-icon mx-3" icon width="40px" height="40px" >
                      <img class="pa-2" :src="require('./assets/img/en.svg')" @click="$i18n.locale = 'en'; callSnack('set_to_ka')">
                    </v-btn>
                    <v-btn class="sidebar-icon flex align-center justify-center mr-3" icon width="40px" height="40px"
                           @click="changeTheme">
                      <v-icon class="pa-2">
                        wb_sunny
                      </v-icon>
                    </v-btn>
                  </a>
                </v-row>
            </v-list-item-group>

        </v-list>

    </v-navigation-drawer>
</template>

<script>
export default {
	name: "SideNavigationDrawer",
	props: ["items"],
	data () {
		return {
			drawer: false,
		};
	},
	methods: {
		clickDrawer () {
			this.drawer = !this.drawer;
		},
		changeTheme(){
			this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
			if(this.$vuetify.theme.dark) {
				window.localStorage.setItem("dark", "true");
				this.callSnack("set_to_dark");
			}
			else {
				window.localStorage.removeItem("dark");

				this.callSnack("set_to_light");
			}
		},
		callSnack(snack){
			this.$store.dispatch("setSnack", this.$t(snack));
		},
		itemActive (item) {
			if (item.name === "Settings") {
				if (this.$route.path.split("/")[1] === "settings") {
					return true;
				}
			}
			if (this.$route.name === item.route) {
				return true;
			} else {
				return false;
			}
		},
	},
};
</script>

<style lang="scss" scoped>

.drawer-open-btn {
  width: 100%;
}
</style>
<style lang="scss" >
.expanded-item {
    width: 100%;
    display: flex;
    height: 70px;
    border-bottom: 1px solid var(--border-color);
}
.drawer-open-btn {
  position: absolute;
  bottom: 0;
}

.languages {
  position: absolute;
  width: 100%;
  bottom: 50px
}

.drawer-items {
  height: 100vh;
  box-sizing: border-box;
}
.list {
  height: 100vh;
}
.sidebar-drawer {
    box-shadow: none !important;
    box-shadow: inset 0px 2px 2px #ccc !important;
    left: 0 !important;
    position: fixed;
    z-index: 10000;
    height: 100vh !important;
    .item-title {
        color: var(--text-sub-black);
        font-size: 14px !important;
        font-weight: 600 !important;
    }
    .v-list-item.title-active {
        border-right: 2px solid var(--primary);
    }
    a {
        text-decoration: none;
    }
}
</style>
