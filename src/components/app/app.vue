<template>
  <div id="app">
    <section>
      <div class="weui-cells" style="margin-top:0px;">
      </div>
    </section>
  </div>
</template>
<script>
import * as storage from '@/request/storage';
import * as tools from '@/request/tools';
import * as workconfig from '@/request/workconfig';
import * as query from '@/request/query';

export default {
    mixins: [window.mixin],
    data() {
        return {
            pageName: "智慧行政",
            momentNewMsg: true,
            userinfo:{},
            imageTableName: 'bs_home_pictures',
            images: storage.getStore('system_app_image'),
            showNotice:false,
            role:'view',
        }
    },
    activated() {
      this.queryInfo();
    },
    mounted() {
      this.queryInfo();
    },
    methods: {
        /**
         * @function 企业微信登录处理函数
         */
        async weworkLogin(){
          this.role = await storage.getStore('system_role_rights');
          this.userinfo = await query.queryWeworkUser();
          const userinfo = await storage.getStore('system_userinfo');
          return this.userinfo;
        },
        async queryInfo(){
          try {
            await this.weworkLogin();
          } catch (error) {
            console.log(error);
          }
        },
        async clearLoginInfo(){

          try {
            let info = await storage.getStore('system_linfo');

            this.username = info.username;
            this.password = info.password;

            storage.clearStore('system_userinfo');
            storage.clearStore('system_token');
            storage.clearStore('system_department');
            storage.clearStore('system_login_time');
          } catch (error) {
            console.log(error);
          }

        },
        async userStatus(){
          try {
            let info = await storage.getStore('system_userinfo');
            if( tools.isNull(info) ){
              vant.Toast('尚未登录！');
              await this.clearLoginInfo();
              this.$router.push(`/login`);
            }
          } catch (error) {
            console.log(error);
          }
        },
    }
}
</script>
<style>
    @import "../../assets/css/explore.css";
    @import "../../assets/css/app.css";
</style>
