<template>
  <div :id="iswechat?`reward-home-wechat`:'reward-home'" style="background-color:#f0f0f0;width:100%;height:auto;">
      <div style="background-color:#f0f0f0;width:100%;height:auto;">
      <a-row :gutter="24">

        <keep-alive>
          <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24" style="position:relative;background-color:#f9f9f9;">

            <div v-if="!iswechat" style="position:absolute;left:0px width:80px;" >
              <van-sidebar v-model="activeTabKey">
                <van-sidebar-item style="display:block;" title="审批" :to="`/reward/message`" />
                <van-sidebar-item style="display:none;" title="云文档" :to="`/reward/netdisk`" />
                <van-sidebar-item style="display:none;" title="联系人" :to="`/reward/contact`" />
                <van-sidebar-item title="工作台" :to="`/reward/workspace`" />
                <van-sidebar-item style="display:none;" title="收藏" :to="`/reward/collect`" />
                <van-sidebar-item style="display:none;" title="设置" :to="`/reward/setup`" />
              </van-sidebar>
            </div>

            <header v-if="iswechat" id="wx-header" class="header-menu" style="overflow-x: hidden;" >
              <div class="center" style="position:relative;">
                  <span>奖罚申请</span>
              </div>
            </header>

            <van-swipe v-if="iswechat" :autoplay="3000" style="margin-bottom:1.25rem;">
              <van-swipe-item v-for="(image, index) in images" :key="index">
                <img width="100%" height="200px;" v-lazy="image.files" />
              </van-swipe-item>
            </van-swipe>

            <div :id="iswechat?`reward-workspace-content-wechat`:'reward-workspace-content' " :style="iswechat?`position:absolute; left:0rem; width:100%;`:`position:absolute; left:80px; width:900px;`" >
              <template v-for="(pane,index) in paneflows"  >
                <a-card  :key="pane.id"  :title="pane.title"  class="pane-flow-card" >
                  <template v-for="(item , index ) in pane.taskflows"  >
                    <a-card-grid  :key="item.href" :style="iswechat?`width:24%;textAlign:'center'`:`width:25%;textAlign:'center'`">
                      <a-card-meta :style="index%4 == 0 ? `margin-left:0.55rem;` : (index%4 == 3 ? `margin-right:0.35rem;`:``)">
                        <div slot="title" class="card-title pane-flow-card-meta" @click="item.click" >
                          <div class="pane-flow-card-meta-icon" :style="iswechat?`display:block;width:100%;margin-left:0.5rem;`:''">
                            <a-avatar size="large"  :src="item.avatar" />
                          </div>
                          <div class="pane-flow-card-meta-title" :style="iswechat?`display:block;width:100%;margin-left:0.25rem;margin-top:0.15rem;`:''">
                            <a v-if="!iswechat" class="pane-flow-card-meta-tname" style="text-align: center;">{{ iswechat ? item.name.replace('我的',''):item.name }}</a>
                            <div v-if="!iswechat" class="pane-flow-card-meta-description" > {{ item.description }} </div>
                            <div v-if="!!iswechat" class="pane-flow-card-meta-description" style="margin-top:0.35rem;"> {{ iswechat ? item.name : item.name }} </div>
                          </div>
                        </div>
                      </a-card-meta>
                    </a-card-grid>
                  </template>
                </a-card>
                <a-card v-if="index <= 2" :key="pane.id + pane.title" :title="' '" class="pane-flow-card-middle" >
                </a-card>
              </template>
            </div>

            <div v-if="!iswechat" style="position:absolute; left:1000px; width: 300px;">
                <a-card
                  title="便捷导航"
                  style="margin-bottom: 24px"
                  :bordered="false"
                  :body-style="{padding: 0}"
                >
                  <div class="item-group">
                    <div class="pane-right-item-group" >
                      <template v-for=" item in quicktags">
                        <a-tag class="pane-right-item-group-tag" :key="item.name" :color="item.color" @click="item.click" >{{item.name}}</a-tag>
                      </template>
                    </div>
                  </div>
                </a-card>
                <a-card :loading="loading" title="奖罚流程" :bordered="false" style="margin-top:20px;">
                  <a-tag
                    color="blue"
                    @click="handleWriteBlog()"
                    style="margin-bottom:10px;position:absolute;top:18px;right:20px;display:none;"
                  ></a-tag>
                  <div class="members">
                    <a-row>
                      <a-col :span="12" v-for="item in wflows" :key="item.href">
                        <a @click="item.click">
                          <a-avatar class="pane-right-avatar" size="small" :src="item.avatar" />
                          <span class="member">{{ item.name }}</span>
                        </a>
                      </a-col>
                    </a-row>
                  </div>
                </a-card>
            </div>

          </a-col>
        </keep-alive>

      </a-row>
    </div>
  </div>
</template>
<script>
import * as storage from '@/request/storage';
import * as tools from '@/request/tools';
import * as announce from '@/request/announce';
import * as task from '@/request/task';
import * as query from '@/request/query';
import * as constant from '@/request/constant';
import * as workflow from '@/request/workflow';
import * as manageAPI from '@/request/manage';
import * as wflowprocess from '@/request/wflow.process';
import * as workconfig from '@/request/workconfig';

export default {
  mixins: [window.mixin],
  data() {
    return {
      iswechat:false,
      iswework:false,
      pageName: "奖罚管理",
      momentNewMsg: true,
      activeTabKey: 3,
      paneflows: workconfig.reward(this),
      wflows: workconfig.getRewardWflow(this),
      quicktags: workconfig.getRewardQuickTag(this),
      images: storage.getStore('system_app_image'),
      imageTableName: 'bs_home_pictures',
      userinfo:null,
    };
  },
  activated() {
    this.queryInfo();
  },
  mounted() {
    this.queryInfo();
  },
  methods: {
    // 查询初始化信息
    async queryInfo() {
      try {
        await this.userStatus(); //检查用户是否登录
        this.iswechat = (document.body.clientWidth || window.screen.width) > 875 ?  false : tools.isWechat(); //查询当前是否微信端
        this.iswework = tools.isWework(); //查询是否为企业微信
        this.userinfo = await this.weworkLogin(); //查询当前登录用户
        this.queryImagesUrl();
      } catch (error) {
        console.log(error);
      }
    },
    // 企业微信登录处理函数
    async weworkLogin(){
      try {
        return await query.queryWeworkUser();
      } catch (error) {
        console.log(error);
      }
    },
    async userStatus(){
      try {
        let userinfo = await storage.getStore('system_userinfo');
        let hash = window.location.hash.slice(1);
        if( tools.isNull(userinfo) || tools.isNull(userinfo.username) || userinfo.username == 'common'){
          vant.Toast('尚未登录，请登录后在进行审批！');
          this.$router.push(`/login?back=${encodeURIComponent(hash)}`);
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 查询首页图片
    async queryImagesUrl(){
      const image = await storage.getStore('system_app_image'); // 获取缓存中的图片
      if(image && image.length > 0){ // 如果存在图片数据，则直接使用图片数据
        return this.images = image;
      }
      const userinfo = await storage.getStore('system_userinfo'); //获取当前登录用户信息
      let whereSQL = `~and(bpm_status,in,4,5)~and(create_by,in,admin,manager)~and(type,eq,REWARD)`;  //查询SQL
      try {
        this.images = await query.queryTableDataByWhereSQL(this.imageTableName , `_where=(status,in,3)${whereSQL}&_fields=files&_sort=-id`);
        this.images.map(item => { item.files = `https://upload.yunwisdom.club:30443/${item.files}`; });
        storage.setStore('system_app_image',JSON.stringify(this.images), 3600 * 24 * 3);
      } catch (error) {
        console.log(error);
      }

    },
  },
};
</script>
<style scoped >
    @import "../../assets/css/reward.home.css";
</style>
