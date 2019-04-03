<template>
<div>
    {{ output }}
    <form @submit.prevent="test">
        <input type="text" v-model="input">
    </form>
</div>
</template>

<script>

import {api} from '../api'

export default {
    data : function() {
        return {
            output : "",
            input : ""
        }
    },
    created(){
        api.login('will','Fourtyeight-48');
    },
    methods : {
        async test(){
            let threads = await api.getThreads();
            this.output = threads;
        },
    }
}
</script>

<style>

</style>
