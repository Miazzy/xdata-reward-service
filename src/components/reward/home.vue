<template>

</template>
<script>
import * as tools from '@/request/tools';

export default {
  data() {
    return {
    };
  },
  activated() {
    this.queryInfo();
  },
  mounted() {
    this.queryInfo();
  },
  created(){
    this.queryInfo();
  },
  methods: {
    async queryInfo() {
    }
  },
};
</script>
