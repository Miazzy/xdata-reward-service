// import Vue from 'vue'
// import Router from 'vue-router';

Vue.use(VueRouter);

// app整体由店面页和店内页组成 暂时并没有用到嵌套路由
const routes = [{
    path: '/reward',
    name: "奖罚管理",
    component: resolve => require(["../components/reward/home.vue"], resolve)
}, {
    path: '/',
    name: "奖罚工作台",
    components: {
        "default": resolve => require(["../components/reward/home.vue"], resolve),
        "subPage": resolve => require(["../components/reward/workspace.vue"], resolve)
    }
}, {
    path: '/reward/workspace',
    name: "奖罚工作台",
    components: {
        "default": resolve => require(["../components/reward/home.vue"], resolve),
        "subPage": resolve => require(["../components/reward/workspace.vue"], resolve)
    }
}, {
    path: '/reward/rewardapply',
    name: "奖罚申请",
    components: {
        "default": resolve => require(["../components/reward/home.vue"], resolve),
        "subPage": resolve => require(["../components/reward/rewardapply.vue"], resolve)
    }
}, {
    path: '/reward/rewardview',
    name: "奖罚申请查看",
    components: {
        "default": resolve => require(["../components/reward/home.vue"], resolve),
        "subPage": resolve => require(["../components/reward/rewardview.vue"], resolve)
    }
}, {
    path: '/reward/netdisk',
    name: "奖罚云文件",
    components: {
        "default": resolve => require(["../components/reward/home.vue"], resolve),
        "subPage": resolve => require(["../components/reward/netdisk.vue"], resolve)
    }
}, {
    path: '/reward/collect',
    name: "奖罚收藏",
    components: {
        "default": resolve => require(["../components/reward/home.vue"], resolve),
        "subPage": resolve => require(["../components/reward/collect.vue"], resolve)
    }
}, {
    path: '/reward/setup',
    name: "奖罚设置",
    components: {
        "default": resolve => require(["../components/reward/home.vue"], resolve),
        "subPage": resolve => require(["../components/reward/setup.vue"], resolve)
    }
}, {
    path: '/reward/contact',
    name: "奖罚联系人",
    components: {
        "default": resolve => require(["../components/reward/home.vue"], resolve),
        "subPage": resolve => require(["../components/reward/contact.vue"], resolve)
    }
}, {
    path: '/reward/message',
    name: "奖罚消息",
    components: {
        "default": resolve => require(["../components/reward/home.vue"], resolve),
        "subPage": resolve => require(["../components/reward/message.vue"], resolve)
    }
}, {
    path: '/reward/rewardmonth',
    name: "奖罚月度报表",
    components: {
        "default": resolve => require(["../components/reward/home.vue"], resolve),
        "subPage": resolve => require(["../components/reward/rewardmonth.vue"], resolve)
    }
}, {
    path: '/reward/rewardquarter',
    name: "奖罚季度报表",
    components: {
        "default": resolve => require(["../components/reward/home.vue"], resolve),
        "subPage": resolve => require(["../components/reward/rewardquarter.vue"], resolve)
    }
}, {
    path: '/reward/rewardyear',
    name: "奖罚年度报表",
    components: {
        "default": resolve => require(["../components/reward/home.vue"], resolve),
        "subPage": resolve => require(["../components/reward/rewardyear.vue"], resolve)
    }
}, {
    path: '/wechat',
    name: "消息",
    component: resolve => require(["../components/wechat/wechat.vue"], resolve)
}, {
    path: '/wechat/dialogue',
    name: "",
    components: {
        "default": resolve => require(["../components/wechat/wechat.vue"], resolve),
        "subPage": resolve => require(["../components/wechat/dialogue.vue"], resolve)
    }
}, {
    path: '/wehchat/add-friend',
    name: "",
    components: {
        "default": resolve => require(["../components/wechat/wechat.vue"], resolve),
        "subPage": resolve => require(["../components/contact/add-friend.vue"], resolve)
    }
}, {
    path: '/wechat/dialogue/dialogue-info',
    name: "",
    components: {
        "subPage": resolve => require(["../components/wechat/dialogue-info.vue"], resolve)
    }
}, {
    path: '/wechat/dialogue/dialogue-detail',
    name: "",
    components: {
        "subPage": resolve => require(["../components/wechat/dialogue-detail.vue"], resolve)
    }
}, {
    path: '/search',
    name: "联系人",
    component: resolve => require(["../components/common/searchs.vue"], resolve)
}, {
    path: '/contact',
    name: "联系人",
    component: resolve => require(["../components/contact/contact.vue"], resolve)
}, {
    path: '/contact/add-friend',
    name: "",
    components: {
        "default": resolve => require(["../components/contact/contact.vue"], resolve),
        "subPage": resolve => require(["../components/contact/add-friend.vue"], resolve)
    }
}, {
    path: '/contact/search',
    name: "",
    components: {
        "default": resolve => require(["../components/contact/contact.vue"], resolve),
        "subPage": resolve => require(["../components/common/search.vue"], resolve)
    }
}, {
    path: '/contact/details',
    name: "",
    components: {
        "default": resolve => require(["../components/contact/contact.vue"], resolve),
        "subPage": resolve => require(["../components/contact/details.vue"], resolve)
    }
}, {
    path: '/contact/new-friends/mobile-contacts',
    name: "联系人朋友",
    components: {
        "subPage": resolve => require(["../components/contact/mobile-contacts.vue"], resolve)
    }
}, {
    path: '/contact/official-accounts',
    name: "",
    components: {
        "default": resolve => require(["../components/contact/contact.vue"], resolve),
        "subPage": resolve => require(["../components/contact/official-accounts.vue"], resolve)
    }
}, {
    path: '/contact/group-list',
    name: "",
    components: {
        "default": resolve => require(["../components/contact/contact.vue"], resolve),
        "subPage": resolve => require(["../components/contact/group-list.vue"], resolve)
    }
}, {
    path: '/contact/new-friends',
    name: "",
    components: {
        "default": resolve => require(["../components/contact/contact.vue"], resolve),
        "subPage": resolve => require(["../components/contact/new-friends.vue"], resolve)
    }
}, {
    path: '/contact/tags',
    name: "新的朋友",
    components: {
        "default": resolve => require(["../components/contact/contact.vue"], resolve),
        "subPage": resolve => require(["../components/contact/tags.vue"], resolve)
    }
}, {
    path: '/app',
    name: "智慧行政",
    component: resolve => require(["../components/app/app.vue"], resolve)
}, {
    path: '/app/moments',
    name: "圈子",
    components: {
        "default": resolve => require(["../components/app/app.vue"], resolve),
        "subPage": resolve => require(["../components/app/moments.vue"], resolve)
    }
}, {
    path: '/app/news',
    name: "公告",
    components: {
        "default": resolve => require(["../components/app/app.vue"], resolve),
        "subPage": resolve => require(["../components/explore/news.vue"], resolve)
    }
}, {
    path: '/app/donetask',
    name: "已办",
    components: {
        "default": resolve => require(["../components/app/app.vue"], resolve),
        "subPage": resolve => require(["../components/app/donetask.vue"], resolve)
    }
}, {
    path: '/app/doingtask',
    name: "待办",
    components: {
        "default": resolve => require(["../components/app/app.vue"], resolve),
        "subPage": resolve => require(["../components/app/doingtask.vue"], resolve)
    }
}, {
    path: '/app/sign',
    name: "签到",
    components: {
        "default": resolve => require(["../components/app/app.vue"], resolve),
        "subPage": resolve => require(["../components/explore/sign.vue"], resolve)
    }
}, {
    path: '/app/punch',
    name: "打卡",
    components: {
        "default": resolve => require(["../components/app/app.vue"], resolve),
        "subPage": resolve => require(["../components/explore/punch.vue"], resolve)
    }
}, {
    path: '/explore',
    name: "首页",
    components: { "default": resolve => require(["../components/explore/explore.vue"], resolve) }
}, {
    path: '/explore/task',
    name: "任务",
    components: {
        "default": resolve => require(["../components/explore/explore.vue"], resolve),
        "subPage": resolve => require(["../components/explore/task.vue"], resolve)
    }
}, {
    path: '/explore/news',
    name: "公告",
    components: {
        "default": resolve => require(["../components/explore/explore.vue"], resolve),
        "subPage": resolve => require(["../components/explore/news.vue"], resolve)
    }
}, {
    path: '/explore/punch',
    name: "打卡",
    components: {
        "default": resolve => require(["../components/explore/explore.vue"], resolve),
        "subPage": resolve => require(["../components/explore/punch.vue"], resolve)
    }
}, {
    path: '/explore/sign',
    name: "签到",
    components: {
        "default": resolve => require(["../components/explore/explore.vue"], resolve),
        "subPage": resolve => require(["../components/explore/sign.vue"], resolve)
    }
}, {
    path: '/explore/content',
    name: "详情",
    components: {
        "default": resolve => require(["../components/explore/explore.vue"], resolve),
        "subPage": resolve => require(["../components/explore/content.vue"], resolve)
    }
}, {
    path: '/explore/announce',
    name: "公告",
    components: {
        "default": resolve => require(["../components/explore/explore.vue"], resolve),
        "subPage": resolve => require(["../components/explore/announce.vue"], resolve)
    }
}, {
    path: '/self',
    name: "我的",
    component: resolve => require(["../components/self/self.vue"], resolve)
}, {
    path: '/login',
    name: "登录",
    component: resolve => require(["../components/login/login.vue"], resolve)
}, {
    path: '/self/album',
    components: {
        "default": resolve => require(["../components/self/self.vue"], resolve),
        "subPage": resolve => require(["../components/common/album.vue"], resolve)
    }
}, {
    path: '/self/settings',
    components: {
        "default": resolve => require(["../components/self/self.vue"], resolve),
        "subPage": resolve => require(["../components/self/settings.vue"], resolve)
    }
}, {
    path: '/self/settings/security',
    components: {
        "subPage": resolve => require(["../components/self/settings/security.vue"], resolve)
    }
}, {
    path: '/self/settings/notice',
    components: {
        "subPage": resolve => require(["../components/self/settings/notice.vue"], resolve)
    }
}, {
    path: '/self/settings/privacy',
    components: {
        "subPage": resolve => require(["../components/self/settings/privacy.vue"], resolve)
    }
}, {
    path: '/self/settings/common',
    components: {
        "subPage": resolve => require(["../components/self/settings/common.vue"], resolve)
    }
}, {
    path: '/self/profile',
    components: {
        "default": resolve => require(["../components/self/self.vue"], resolve),
        "subPage": resolve => require(["../components/common/profile.vue"], resolve)
    }
}, {
    path: '/self/profile/my-qrcode',
    components: {
        "subPage": resolve => require(["../components/self/my-qrcode.vue"], resolve)
    }
}, {
    path: '/self/settings',
    components: {
        "subPage": resolve => require(["../components/settings/settings.vue"], resolve)
    }
}, {
    path: '/self/settings/common',
    components: {
        "subPage": resolve => require(["../components/settings/common/common.vue"], resolve)
    }
}, {
    path: '/self/settings/common/language',
    components: {
        "subPage": resolve => require(["../components/settings/common/language.vue"], resolve)
    }
}];

const router = new VueRouter({
    base: "/vue-wechat/",
    routes,
})

// history模式跳转到新页面，返回顶部
router.afterEach((to, from, next) => {
    window.scrollTo(0, 0);
});

export default router;