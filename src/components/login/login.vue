<template>
  <div id="login" style="">

      <div class="main-content" style="" >

        <div class="main-title" style="">
          <span>账号登录</span>
        </div>

        <div class="main-account" style="">
          <input class="input-account" type="text" placeholder="请输入账号" style="" v-model="username" />
        </div>

        <div class="main-account main-mobile" style="">
          <input class="input-account" type="text" placeholder="请输入手机" style="" v-model="mobile" />
        </div>

        <div class="main-account main-certno" style="">
          <input class="input-account" type="text" placeholder="请输入身份证号后6位" style="" v-model="certno" />
        </div>

        <div class="main-login" style="" >
          <span class="span-login" style="" @click="userLogin" >登录</span>
        </div>

        <div class="main-loading" :style=" loading ? 'display:block;':'display:none;' ">
          <van-loading type="spinner" size="48px" style="text-align:text;" />
        </div>

      </div>

  </div>
</template>
<script>
import * as storage from '@/request/storage';
import * as tools from '@/request/tools';
import * as contact from '@/vuex/contacts';
import * as query from '@/request/query';

export default {
    mixins: [window.mixin],
    data() {
        return {
            pageName: "登录",
            momentNewMsg: true,
            customActiveKey: "tab1",
            loginInfo:{},
            username:'',
            mobile:'',
            password:'',
            certno:'',
            loading:false,
            contactsInitialList:[],
            contactsList:[],
        }
    },
    activated() {
    },
    mounted() {
    },
    created(){
    },
    methods:{
      async userLogin(){

        //检查用户是否存在
        let vuser = await query.queryUserInfoByUserMobileCertNO(this.username , this.mobile , this.certno);

        //显示加载状态
        this.loading = true;

        try {
          if(tools.isNull(this.username)){
            vant.Toast('请输入您的OA账号！');
          } else if(tools.isNull(this.mobile)){
            vant.Toast('请输入您的手机号码！');
          } else if(tools.isNull(this.certno)){
            vant.Toast('请输入您的身份证号后六位！');
          } else if(tools.isNull(vuser) || !vuser.success){
            vant.Toast('此账户不存在！');
          } else {

            let response = await query.queryUserInfoByUserName(this.mobile);
            let back = tools.queryUrlString('back','history');

            if(!tools.isNull(response)){
                //设置system_userinfo
                storage.setStore('system_linfo', JSON.stringify({ username: response.userinfo.userid, password: '************' }), 3600 * 24 * 30);
                storage.setStore('system_userinfo', JSON.stringify(response.userinfo), 3600 * 24 * 30);
                storage.setStore('system_department', JSON.stringify(response.userinfo.department), 3600 * 24 * 30);
                storage.setStore('system_login_time', dayjs().format('YYYY-MM-DD HH:mm:ss'), 3600 * 24 * 30);

                vant.Toast('登录成功！');

                // 等待登录成功提示显示1000ms
                await tools.sleep(1000);

                // 查询back是否有值，如果存在，则返回back页面，如果不存在，则返回工作台
                tools.isNull(back) ? this.$router.push(`/`) : this.$router.push(back);

                this.loading = false;
            } else {
                vant.Toast('登录失败，错误码(' + response.errcode + ')');
                this.loading = false;
            }
          }
        } catch (error) {
          this.loading = false;
        }

      },
      async clearLoginInfo(){

        try {

          let userinfo = await storage.getStore('system_linfo');

          if(userinfo && userinfo.username && userinfo.password){
            this.username = userinfo.username;
            this.password = userinfo.password;
          }

          storage.clearStore('system_userinfo');
          storage.clearStore('system_token');
          storage.clearStore('system_department');
          storage.clearStore('system_login_time');

        } catch (error) {
          console.log(error);
        }

      }
    }
}
</script>
<style>
@import "../../assets/css/explore.css";
</style>
