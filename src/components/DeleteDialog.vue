<template>
    <v-dialog
        :value="visible"
        persistent
        width="600px"
        max-width="90%">
        <v-card class="rounded-0">
            <v-overlay absolute color="white" :value="loading">
                <v-progress-circular color="primary" indeterminate size="64" width="2" />
            </v-overlay>

            <v-card-title class="text-body-1 font-weight-medium">{{ contentTitle }}</v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <div class="text-body-1 pt-8">{{ contentText }}</div>
            </v-card-text>
            <v-card-actions>
                <v-row class="dialog-footer text-right py-2">
                    <v-col>
                        <v-btn
                            color="primary"
                            depressed
                            text
                            @click="$emit('cancel')"
                        >Cancel</v-btn>
                        <v-btn
                            depressed
                            outlined
                            @click="$emit('confirm')"
                            class="red--text mx-4"
                        >Delete</v-btn>
                    </v-col>
                </v-row>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: {
        contentTitle: {
            type: String,
            default: '',
        },
        contentText: {
            type: String,
            default: '',
        },
        visible: {
            type: Boolean,
            default: false,
        },
        loading: {
            type: Boolean,
            default: false,
        },
    },
    data () {
        return {}
    }
}

</script>
