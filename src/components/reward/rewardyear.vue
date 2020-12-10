<template>
  <div id="reward-home">
      <div style="background-color:#f0f0f0;">
      <a-row :gutter="24">
        <keep-alive>
          <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">

            <div style="background-color:#f0f0f0;">

              <div class="reward-apply-content" style="height:auto; background-color:#fefefe; margin-top:0.00rem; margin-left: 0.00rem; margin-right: 0.00rem; margin-bottom: 5rem; border: 0px solid #f0f0f0; front-size: 1rem;" >

                <a-page-header v-if="!iswechat"
                  style="border: 1px solid rgb(235, 237, 240)"
                  title="奖罚系统"
                  sub-title=""
                  @back="() => { this.$router.push(`/`)}"
                />

                <header v-if="iswechat" id="wx-header" class="header-menu" v-show="!searchFlag" style="overflow-x: hidden;" >
                  <div class="center" style="position:relative;">
                      <router-link to="/" @click="$router.push(`/`)" tag="div" class="iconfont icon-left">
                          <span>返回</span>
                      </router-link>
                      <span>奖罚年度报表</span>
                  </div>
                </header>

                <div class="reward-apply-header" style="height:80px; width:100%; text-align:center; margin-top:20px; font-size: 1.5rem; ">
                  奖罚年度报表
                </div>

                <div class="reward-apply-content-item reward-apply-content-title" style="">
                   <a-row style="border-top: 1px dash #f0f0f0;" >
                    <a-col class="reward-apply-content-title-text" :span="4" style="">
                      基础信息
                    </a-col>
                   </a-row>
                </div>

                <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px;">
                  <a-row>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>发放周期</span>
                    </a-col>
                    <a-col :span="6">
                       <a-input :readonly="false" v-model="period" placeholder="请输入发放周期！" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;"> </span>所属区域</span>
                    </a-col>
                    <a-col :span="6">
                       <a-input :readonly="false" v-model="zone" placeholder="请输入所属区域！" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                       <div style="position:absolute; right: -120px; top: -2px;">
                        <van-button name="file" @click="queryRewardYearInfo();queryRewardYearInfo_Y();queryRewardYearInfo_O();queryRewardYearInfo_G();"  >查询</van-button>
                        <van-button name="file" @click="queryCollected();" >汇总</van-button>
                       </div>
                    </a-col>
                  </a-row>
                  <a-row style="margin-top:10px;">
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;"></span>奖惩类型</span>
                    </a-col>
                    <a-col :span="6">
                       <a-input :readonly="false" v-model="reward_type" placeholder="请输入奖惩类型！" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;"> </span>奖惩名称</span>
                    </a-col>
                    <a-col :span="6">
                       <a-input :readonly="false" v-model="reward_name" placeholder="请输入奖惩或激励名称！" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                  </a-row>
                  <a-row style="margin-top:10px;">
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;"></span>项目名称</span>
                    </a-col>
                    <a-col :span="6">
                       <a-input :readonly="false" v-model="pname" placeholder="请输入项目名称！" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;"> </span>成本承担方</span>
                    </a-col>
                    <a-col :span="6">
                       <a-input :readonly="false" v-model="cost_bearer" placeholder="请输入成本承担方！" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                  </a-row>
                </div>

                <div class="reward-apply-content-item reward-apply-content-title" style="margin-top:3rem;">
                   <a-row style="border-top: 1px dash #f0f0f0;" >
                    <a-col class="reward-apply-content-title-text" :span="4" style="">
                      报表信息
                    </a-col>
                   </a-row>
                </div>

                <div style="margin-top:1.25rem; margin-left:4.75rem;margin-right:3.0rem;">
                    <a-tabs @change="callback">
                      <a-tab-pane key="1" tab="全部数据">
                        <div class="reward-apply-content-item reward-apply-content-title" style="">
                          <a-row style="border-top: 1px dash #f0f0f0;" >
                            <a-col class="reward-apply-content-title-text" :span="4" style="float:left;text-align:left;margin-left:10px;">
                              明细数据
                            </a-col>
                            <a-col :span="16">
                              <div style="position:absolute; right: -9.0rem; top: -2px;">
                                <excel-export :sheet="sheetIData" :manual="false" @before-start="exportIData();">
                                  <div>导出</div>
                                </excel-export>
                              </div>
                            </a-col>
                          </a-row>
                        </div>

                        <div class="reward-apply-content-item reward-apply-content-title" style="">
                          <a-row style="border-top: 1px dash #f0f0f0;margin:0px 0.75rem;" >
                            <vue-excel-editor v-model="idata" ref="grid_00" width="100%" :page="20" :no-num-col="false" :readonly="false" filter-row :localized-label="vueExcelLabels"  autocomplete @delete="onDelete" @update="onUpdate" >
                                <vue-excel-column field="type"        label="分配性质"   width="80px" />
                                <vue-excel-column field="period"      label="发放期间"   width="100px" />
                                <vue-excel-column field="reward_period" label="所属期间"   width="100px" />
                                <vue-excel-column field="reward_type" label="奖惩类型"   width="100px" />
                                <vue-excel-column field="reward_name" label="奖惩名称"   width="100px" />
                                <vue-excel-column field="username"    label="员工姓名"   width="100px" />
                                <vue-excel-column field="account"     label="员工OA"    width="100px" />
                                <vue-excel-column field="company"     label="所属单位"   width="100px" />
                                <vue-excel-column field="zone"        label="所属区域"   width="100px" />
                                <vue-excel-column field="department"  label="所属部门"   width="100px" />
                                <vue-excel-column field="project"     label="项目/中心"  width="100px" />
                                <vue-excel-column field="pname"       label="项目名称"   width="100px" />
                                <vue-excel-column field="position"    label="员工职务"   width="100px" />
                                <vue-excel-column field="amount"      label="分配金额(￥)"   width="100px" summary="sum" />
                                <vue-excel-column field="status"      label="状态"      width="80px" />
                            </vue-excel-editor>
                          </a-row>
                        </div>

                        <div class="reward-apply-content-item reward-apply-content-title" style="">
                          <a-row style="border-top: 1px dash #f0f0f0;" >
                            <a-col class="reward-apply-content-title-text" :span="10" style="float:left;text-align:left;margin-left:10px;">
                              汇总数据（按发放周期、奖惩类型、员工账户、项目名称）
                            </a-col>
                            <a-col :span="10">
                              <div style="position:absolute; right: -9.0rem; top: -2px;">
                                <van-button name="file" @click="exportTData();" style="display:none;" >导出</van-button>
                                <excel-export :sheet="sheetTData" :manual="false" @before-start="exportTData();">
                                  <div>导出</div>
                                </excel-export>
                              </div>
                            </a-col>
                          </a-row>
                        </div>

                        <div class="reward-apply-content-item reward-apply-content-title" style="">
                          <a-row style="border-top: 1px dash #f0f0f0;margin:0px 0.75rem;" >
                            <vue-excel-editor v-model="tdata" ref="grid_01" width="100%" :page="20" :no-num-col="false" :readonly="false" filter-row :localized-label="vueExcelLabels"  autocomplete @delete="onDelete" @update="onUpdate" >
                                <vue-excel-column field="type"        label="分配性质"   width="80px" />
                                <vue-excel-column field="period"      label="发放期间"   width="100px" />
                                <vue-excel-column field="reward_type" label="奖惩类型"   width="100px" />
                                <vue-excel-column field="reward_name" label="奖惩名称"   width="100px" />
                                <vue-excel-column field="username"    label="员工姓名"   width="100px" />
                                <vue-excel-column field="account"     label="员工OA"    width="100px" />
                                <vue-excel-column field="company"     label="所属单位"   width="100px" />
                                <vue-excel-column field="zone"        label="所属区域"   width="100px" />
                                <vue-excel-column field="department"  label="所属部门"   width="100px" />
                                <vue-excel-column field="project"     label="项目/中心"  width="100px" />
                                <vue-excel-column field="pname"       label="项目名称"   width="100px" />
                                <vue-excel-column field="position"    label="员工职务"   width="100px" />
                                <vue-excel-column field="amount"      label="分配金额(￥)"   width="100px" summary="sum" />
                                <vue-excel-column field="status"      label="状态"      width="80px" />
                            </vue-excel-editor>
                          </a-row>
                        </div>

                        <div class="reward-apply-content-item reward-apply-content-title" style="">
                          <a-row style="border-top: 1px dash #f0f0f0;" >
                            <a-col class="reward-apply-content-title-text" :span="10" style="float:left;text-align:left;margin-left:10px;">
                              汇总数据（按发放周期、奖惩类型、员工账户）
                            </a-col>
                            <a-col :span="10">
                              <div style="position:absolute; right: -9.0rem; top: -2px;">
                                <van-button name="file" @click="exportMData();" style="display:none;" >导出</van-button>
                                <excel-export :sheet="sheetMData" :manual="false" @before-start="exportMData();">
                                  <div>导出</div>
                                </excel-export>
                              </div>
                            </a-col>
                          </a-row>
                        </div>

                        <div class="reward-apply-content-item reward-apply-content-title" style="">
                          <a-row style="border-top: 1px dash #f0f0f0;margin:0px 0.75rem;" >
                            <vue-excel-editor v-model="mdata" ref="grid_02" width="100%" :page="20" :no-num-col="false" :readonly="false" filter-row :localized-label="vueExcelLabels"  autocomplete @delete="onDelete" @update="onUpdate" >
                                <vue-excel-column field="type"        label="分配性质"   width="80px" />
                                <vue-excel-column field="period"      label="发放期间"   width="100px" />
                                <vue-excel-column field="reward_type" label="奖惩类型"   width="100px" />
                                <vue-excel-column field="reward_name" label="奖惩名称"   width="100px" />
                                <vue-excel-column field="username"    label="员工姓名"   width="100px" />
                                <vue-excel-column field="account"     label="员工OA"    width="100px" />
                                <vue-excel-column field="company"     label="所属单位"   width="100px" />
                                <vue-excel-column field="zone"        label="所属区域"   width="100px" />
                                <vue-excel-column field="department"  label="所属部门"   width="100px" />
                                <vue-excel-column field="project"     label="项目/中心"  width="100px" />
                                <vue-excel-column field="pname"       label="项目名称"   width="100px" />
                                <vue-excel-column field="position"    label="员工职务"   width="100px" />
                                <vue-excel-column field="amount"      label="分配金额(￥)"   width="100px" summary="sum" />
                                <vue-excel-column field="status"      label="状态"      width="80px" />
                            </vue-excel-editor>
                          </a-row>
                        </div>

                        <div class="reward-apply-content-item reward-apply-content-title" style="">
                          <a-row style="border-top: 1px dash #f0f0f0;" >
                            <a-col class="reward-apply-content-title-text" :span="10" style="float:left;text-align:left;margin-left:10px;">
                              汇总数据（按发放周期、员工账户）
                            </a-col>
                            <a-col :span="10">
                              <div style="position:absolute; right: -9.0rem; top: -2px;">
                                <van-button name="file" @click="exportEData();" style="display:none;" >导出</van-button>
                                <excel-export :sheet="sheetEData" :manual="false" @before-start="exportEData();">
                                  <div>导出</div>
                                </excel-export>
                              </div>
                            </a-col>
                          </a-row>
                        </div>

                        <div class="reward-apply-content-item reward-apply-content-title" style="">
                          <a-row style="border-top: 1px dash #f0f0f0;margin:0px 0.75rem;" >
                            <vue-excel-editor v-model="edata" ref="grid_03" width="100%" :page="20" :no-num-col="false" :readonly="false" filter-row :localized-label="vueExcelLabels"  autocomplete @delete="onDelete" @update="onUpdate" >
                                <vue-excel-column field="type"        label="分配性质"   width="80px" />
                                <vue-excel-column field="period"      label="发放期间"   width="100px" />
                                <vue-excel-column field="reward_type" label="奖惩类型"   width="100px" />
                                <vue-excel-column field="reward_name" label="奖惩名称"   width="100px" />
                                <vue-excel-column field="username"    label="员工姓名"   width="100px" />
                                <vue-excel-column field="account"     label="员工OA"    width="100px" />
                                <vue-excel-column field="company"     label="所属单位"   width="100px" />
                                <vue-excel-column field="zone"        label="所属区域"   width="100px" />
                                <vue-excel-column field="department"  label="所属部门"   width="100px" />
                                <vue-excel-column field="project"     label="项目/中心"  width="100px" />
                                <vue-excel-column field="pname"       label="项目名称"   width="100px" />
                                <vue-excel-column field="position"    label="员工职务"   width="100px" />
                                <vue-excel-column field="amount"      label="分配金额(￥)"   width="100px" summary="sum" />
                                <vue-excel-column field="status"      label="状态"      width="80px" />
                            </vue-excel-editor>
                          </a-row>
                        </div>
                      </a-tab-pane>
                      <a-tab-pane key="2" tab="业绩考核类" force-render>
                        <div class="reward-apply-content-item reward-apply-content-title" style="">
                          <a-row style="border-top: 1px dash #f0f0f0;" >
                            <a-col class="reward-apply-content-title-text" :span="4" style="float:left;text-align:left;margin-left:10px;">
                              明细数据
                            </a-col>
                            <a-col :span="16">
                              <div style="position:absolute; right: -9.0rem; top: -2px;">
                                <excel-export :sheet="sheetYIData" :manual="false" @before-start="exportYIData();">
                                  <div>导出</div>
                                </excel-export>
                              </div>
                            </a-col>
                          </a-row>
                        </div>

                        <div class="reward-apply-content-item reward-apply-content-title" style="">
                          <a-row style="border-top: 1px dash #f0f0f0;margin:0px 0.75rem;" >
                            <vue-excel-editor v-model="yidata" ref="grid_y0" width="100%" :page="20" :no-num-col="false" :readonly="false" filter-row :localized-label="vueExcelLabels"  autocomplete @delete="onDelete" @update="onUpdate" >
                                <vue-excel-column field="type"        label="分配性质"   width="80px" />
                                <vue-excel-column field="period"      label="发放期间"   width="100px" />
                                <vue-excel-column field="reward_period" label="所属期间"   width="100px" />
                                <vue-excel-column field="reward_type" label="奖惩类型"   width="100px" />
                                <vue-excel-column field="reward_name" label="奖惩名称"   width="100px" />
                                <vue-excel-column field="username"    label="员工姓名"   width="100px" />
                                <vue-excel-column field="account"     label="员工OA"    width="100px" />
                                <vue-excel-column field="company"     label="所属单位"   width="100px" />
                                <vue-excel-column field="zone"        label="所属区域"   width="100px" />
                                <vue-excel-column field="department"  label="所属部门"   width="100px" />
                                <vue-excel-column field="project"     label="项目/中心"  width="100px" />
                                <vue-excel-column field="pname"       label="项目名称"   width="100px" />
                                <vue-excel-column field="position"    label="员工职务"   width="100px" />
                                <vue-excel-column field="amount"      label="分配金额(￥)"   width="100px" summary="sum" />
                                <vue-excel-column field="status"      label="状态"      width="80px" />
                            </vue-excel-editor>
                          </a-row>
                        </div>

                        <div class="reward-apply-content-item reward-apply-content-title" style="">
                          <a-row style="border-top: 1px dash #f0f0f0;" >
                            <a-col class="reward-apply-content-title-text" :span="10" style="float:left;text-align:left;margin-left:10px;">
                              汇总数据（按发放周期、奖惩类型、员工账户、项目名称）
                            </a-col>
                            <a-col :span="10">
                              <div style="position:absolute; right: -9.0rem; top: -2px;">
                                <van-button name="file" @click="exportYTData();" style="display:none;" >导出</van-button>
                                <excel-export :sheet="sheetYTData" :manual="false" @before-start="exportYTData();">
                                  <div>导出</div>
                                </excel-export>
                              </div>
                            </a-col>
                          </a-row>
                        </div>

                        <div class="reward-apply-content-item reward-apply-content-title" style="">
                          <a-row style="border-top: 1px dash #f0f0f0;margin:0px 0.75rem;" >
                            <vue-excel-editor v-model="ytdata" ref="grid_y1" width="100%" :page="20" :no-num-col="false" :readonly="false" filter-row :localized-label="vueExcelLabels"  autocomplete @delete="onDelete" @update="onUpdate" >
                                <vue-excel-column field="type"        label="分配性质"   width="80px" />
                                <vue-excel-column field="period"      label="发放期间"   width="100px" />
                                <vue-excel-column field="reward_type" label="奖惩类型"   width="100px" />
                                <vue-excel-column field="reward_name" label="奖惩名称"   width="100px" />
                                <vue-excel-column field="username"    label="员工姓名"   width="100px" />
                                <vue-excel-column field="account"     label="员工OA"    width="100px" />
                                <vue-excel-column field="company"     label="所属单位"   width="100px" />
                                <vue-excel-column field="zone"        label="所属区域"   width="100px" />
                                <vue-excel-column field="department"  label="所属部门"   width="100px" />
                                <vue-excel-column field="project"     label="项目/中心"  width="100px" />
                                <vue-excel-column field="pname"       label="项目名称"   width="100px" />
                                <vue-excel-column field="position"    label="员工职务"   width="100px" />
                                <vue-excel-column field="amount"      label="分配金额(￥)"   width="100px" summary="sum" />
                                <vue-excel-column field="status"      label="状态"      width="80px" />
                            </vue-excel-editor>
                          </a-row>
                        </div>

                        <div class="reward-apply-content-item reward-apply-content-title" style="">
                          <a-row style="border-top: 1px dash #f0f0f0;" >
                            <a-col class="reward-apply-content-title-text" :span="10" style="float:left;text-align:left;margin-left:10px;">
                              汇总数据（按发放周期、奖惩类型、员工账户）
                            </a-col>
                            <a-col :span="10">
                              <div style="position:absolute; right: -9.0rem; top: -2px;">
                                <van-button name="file" @click="exportYMData();" style="display:none;" >导出</van-button>
                                <excel-export :sheet="sheetYMData" :manual="false" @before-start="exportYMData();">
                                  <div>导出</div>
                                </excel-export>
                              </div>
                            </a-col>
                          </a-row>
                        </div>

                        <div class="reward-apply-content-item reward-apply-content-title" style="">
                          <a-row style="border-top: 1px dash #f0f0f0;margin:0px 0.75rem;" >
                            <vue-excel-editor v-model="ymdata" ref="grid_y2" width="100%" :page="20" :no-num-col="false" :readonly="false" filter-row :localized-label="vueExcelLabels"  autocomplete @delete="onDelete" @update="onUpdate" >
                                <vue-excel-column field="type"        label="分配性质"   width="80px" />
                                <vue-excel-column field="period"      label="发放期间"   width="100px" />
                                <vue-excel-column field="reward_type" label="奖惩类型"   width="100px" />
                                <vue-excel-column field="reward_name" label="奖惩名称"   width="100px" />
                                <vue-excel-column field="username"    label="员工姓名"   width="100px" />
                                <vue-excel-column field="account"     label="员工OA"    width="100px" />
                                <vue-excel-column field="company"     label="所属单位"   width="100px" />
                                <vue-excel-column field="zone"        label="所属区域"   width="100px" />
                                <vue-excel-column field="department"  label="所属部门"   width="100px" />
                                <vue-excel-column field="project"     label="项目/中心"  width="100px" />
                                <vue-excel-column field="pname"       label="项目名称"   width="100px" />
                                <vue-excel-column field="position"    label="员工职务"   width="100px" />
                                <vue-excel-column field="amount"      label="分配金额(￥)"   width="100px" summary="sum" />
                                <vue-excel-column field="status"      label="状态"      width="80px" />
                            </vue-excel-editor>
                          </a-row>
                        </div>

                        <div class="reward-apply-content-item reward-apply-content-title" style="">
                          <a-row style="border-top: 1px dash #f0f0f0;" >
                            <a-col class="reward-apply-content-title-text" :span="10" style="float:left;text-align:left;margin-left:10px;">
                              汇总数据（按发放周期、员工账户）
                            </a-col>
                            <a-col :span="10">
                              <div style="position:absolute; right: -9.0rem; top: -2px;">
                                <van-button name="file" @click="exportYEData();" style="display:none;" >导出</van-button>
                                <excel-export :sheet="sheetYEData" :manual="false" @before-start="exportYEData();">
                                  <div>导出</div>
                                </excel-export>
                              </div>
                            </a-col>
                          </a-row>
                        </div>

                        <div class="reward-apply-content-item reward-apply-content-title" style="">
                          <a-row style="border-top: 1px dash #f0f0f0;margin:0px 0.75rem;" >
                            <vue-excel-editor v-model="yedata" ref="grid_y3" width="100%" :page="20" :no-num-col="false" :readonly="false" filter-row :localized-label="vueExcelLabels"  autocomplete @delete="onDelete" @update="onUpdate" >
                                <vue-excel-column field="type"        label="分配性质"   width="80px" />
                                <vue-excel-column field="period"      label="发放期间"   width="100px" />
                                <vue-excel-column field="reward_type" label="奖惩类型"   width="100px" />
                                <vue-excel-column field="reward_name" label="奖惩名称"   width="100px" />
                                <vue-excel-column field="username"    label="员工姓名"   width="100px" />
                                <vue-excel-column field="account"     label="员工OA"    width="100px" />
                                <vue-excel-column field="company"     label="所属单位"   width="100px" />
                                <vue-excel-column field="zone"        label="所属区域"   width="100px" />
                                <vue-excel-column field="department"  label="所属部门"   width="100px" />
                                <vue-excel-column field="project"     label="项目/中心"  width="100px" />
                                <vue-excel-column field="pname"       label="项目名称"   width="100px" />
                                <vue-excel-column field="position"    label="员工职务"   width="100px" />
                                <vue-excel-column field="amount"      label="分配金额(￥)"   width="100px" summary="sum" />
                                <vue-excel-column field="status"      label="状态"      width="80px" />
                            </vue-excel-editor>
                          </a-row>
                        </div>
                      </a-tab-pane>
                      <a-tab-pane key="3" tab="总裁/总经理/特殊贡献">
                        <div class="reward-apply-content-item reward-apply-content-title" style="">
                          <a-row style="border-top: 1px dash #f0f0f0;" >
                            <a-col class="reward-apply-content-title-text" :span="4" style="float:left;text-align:left;margin-left:10px;">
                              明细数据
                            </a-col>
                            <a-col :span="16">
                              <div style="position:absolute; right: -9.0rem; top: -2px;">
                                <van-button name="file" @click="exportGIData();" style="display:none;" >导出</van-button>
                                <excel-export :sheet="sheetGIData" :manual="false" @before-start="exportGIData();">
                                  <div>导出</div>
                                </excel-export>
                              </div>
                            </a-col>
                          </a-row>
                        </div>

                        <div class="reward-apply-content-item reward-apply-content-title" style="">
                          <a-row style="border-top: 1px dash #f0f0f0;margin:0px 0.75rem;" >
                            <vue-excel-editor v-model="gidata" ref="grid_g0" width="100%" :page="20" :no-num-col="false" :readonly="false" filter-row :localized-label="vueExcelLabels"  autocomplete @delete="onDelete" @update="onUpdate" >
                                <vue-excel-column field="type"        label="分配性质"   width="80px" />
                                <vue-excel-column field="period"      label="发放期间"   width="100px" />
                                <vue-excel-column field="reward_period" label="所属期间"   width="100px" />
                                <vue-excel-column field="reward_type" label="奖惩类型"   width="100px" />
                                <vue-excel-column field="reward_name" label="奖惩名称"   width="100px" />
                                <vue-excel-column field="username"    label="员工姓名"   width="100px" />
                                <vue-excel-column field="account"     label="员工OA"    width="100px" />
                                <vue-excel-column field="company"     label="所属单位"   width="100px" />
                                <vue-excel-column field="zone"        label="所属区域"   width="100px" />
                                <vue-excel-column field="department"  label="所属部门"   width="100px" />
                                <vue-excel-column field="project"     label="项目/中心"  width="100px" />
                                <vue-excel-column field="pname"       label="项目名称"   width="100px" />
                                <vue-excel-column field="position"    label="员工职务"   width="100px" />
                                <vue-excel-column field="amount"      label="分配金额(￥)"   width="100px" summary="sum" />
                                <vue-excel-column field="status"      label="状态"      width="80px" />
                            </vue-excel-editor>
                          </a-row>
                        </div>

                        <div class="reward-apply-content-item reward-apply-content-title" style="">
                          <a-row style="border-top: 1px dash #f0f0f0;" >
                            <a-col class="reward-apply-content-title-text" :span="10" style="float:left;text-align:left;margin-left:10px;">
                              汇总数据（按发放周期、奖惩类型、员工账户、项目名称）
                            </a-col>
                            <a-col :span="10">
                              <div style="position:absolute; right: -9.0rem; top: -2px;">
                                <van-button name="file" @click="exportGTData();" style="display:none;" >导出</van-button>
                                <excel-export :sheet="sheetGTData" :manual="false" @before-start="exportGTData();">
                                  <div>导出</div>
                                </excel-export>
                              </div>
                            </a-col>
                          </a-row>
                        </div>

                        <div class="reward-apply-content-item reward-apply-content-title" style="">
                          <a-row style="border-top: 1px dash #f0f0f0;margin:0px 0.75rem;" >
                            <vue-excel-editor v-model="gtdata" ref="grid_g1" width="100%" :page="20" :no-num-col="false" :readonly="false" filter-row :localized-label="vueExcelLabels"  autocomplete @delete="onDelete" @update="onUpdate" >
                                <vue-excel-column field="type"        label="分配性质"   width="80px" />
                                <vue-excel-column field="period"      label="发放期间"   width="100px" />
                                <vue-excel-column field="reward_type" label="奖惩类型"   width="100px" />
                                <vue-excel-column field="reward_name" label="奖惩名称"   width="100px" />
                                <vue-excel-column field="username"    label="员工姓名"   width="100px" />
                                <vue-excel-column field="account"     label="员工OA"    width="100px" />
                                <vue-excel-column field="company"     label="所属单位"   width="100px" />
                                <vue-excel-column field="zone"        label="所属区域"   width="100px" />
                                <vue-excel-column field="department"  label="所属部门"   width="100px" />
                                <vue-excel-column field="project"     label="项目/中心"  width="100px" />
                                <vue-excel-column field="pname"       label="项目名称"   width="100px" />
                                <vue-excel-column field="position"    label="员工职务"   width="100px" />
                                <vue-excel-column field="amount"      label="分配金额(￥)"   width="100px" summary="sum" />
                                <vue-excel-column field="status"      label="状态"      width="80px" />
                            </vue-excel-editor>
                          </a-row>
                        </div>

                        <div class="reward-apply-content-item reward-apply-content-title" style="">
                          <a-row style="border-top: 1px dash #f0f0f0;" >
                            <a-col class="reward-apply-content-title-text" :span="10" style="float:left;text-align:left;margin-left:10px;">
                              汇总数据（按发放周期、奖惩类型、员工账户）
                            </a-col>
                            <a-col :span="10">
                              <div style="position:absolute; right: -9.0rem; top: -2px;">
                                <van-button name="file" @click="exportGMData();" style="display:none;" >导出</van-button>
                                <excel-export :sheet="sheetGMData" :manual="false" @before-start="exportGMData();">
                                  <div>导出</div>
                                </excel-export>
                              </div>
                            </a-col>
                          </a-row>
                        </div>

                        <div class="reward-apply-content-item reward-apply-content-title" style="">
                          <a-row style="border-top: 1px dash #f0f0f0;margin:0px 0.75rem;" >
                            <vue-excel-editor v-model="gmdata" ref="grid_g2" width="100%" :page="20" :no-num-col="false" :readonly="false" filter-row :localized-label="vueExcelLabels"  autocomplete @delete="onDelete" @update="onUpdate" >
                                <vue-excel-column field="type"        label="分配性质"   width="80px" />
                                <vue-excel-column field="period"      label="发放期间"   width="100px" />
                                <vue-excel-column field="reward_type" label="奖惩类型"   width="100px" />
                                <vue-excel-column field="reward_name" label="奖惩名称"   width="100px" />
                                <vue-excel-column field="username"    label="员工姓名"   width="100px" />
                                <vue-excel-column field="account"     label="员工OA"    width="100px" />
                                <vue-excel-column field="company"     label="所属单位"   width="100px" />
                                <vue-excel-column field="zone"        label="所属区域"   width="100px" />
                                <vue-excel-column field="department"  label="所属部门"   width="100px" />
                                <vue-excel-column field="project"     label="项目/中心"  width="100px" />
                                <vue-excel-column field="pname"       label="项目名称"   width="100px" />
                                <vue-excel-column field="position"    label="员工职务"   width="100px" />
                                <vue-excel-column field="amount"      label="分配金额(￥)"   width="100px" summary="sum" />
                                <vue-excel-column field="status"      label="状态"      width="80px" />
                            </vue-excel-editor>
                          </a-row>
                        </div>

                        <div class="reward-apply-content-item reward-apply-content-title" style="">
                          <a-row style="border-top: 1px dash #f0f0f0;" >
                            <a-col class="reward-apply-content-title-text" :span="10" style="float:left;text-align:left;margin-left:10px;">
                              汇总数据（按发放周期、员工账户）
                            </a-col>
                            <a-col :span="10">
                              <div style="position:absolute; right: -9.0rem; top: -2px;">
                                <van-button name="file" @click="exportGEData();" style="display:none;" >导出</van-button>
                                <excel-export :sheet="sheetGEData" :manual="false" @before-start="exportGEData();">
                                  <div>导出</div>
                                </excel-export>
                              </div>
                            </a-col>
                          </a-row>
                        </div>

                        <div class="reward-apply-content-item reward-apply-content-title" style="">
                          <a-row style="border-top: 1px dash #f0f0f0;margin:0px 0.75rem;" >
                            <vue-excel-editor v-model="gedata" ref="grid_03" width="100%" :page="20" :no-num-col="false" :readonly="false" filter-row :localized-label="vueExcelLabels"  autocomplete @delete="onDelete" @update="onUpdate" >
                                <vue-excel-column field="type"        label="分配性质"   width="80px" />
                                <vue-excel-column field="period"      label="发放期间"   width="100px" />
                                <vue-excel-column field="reward_type" label="奖惩类型"   width="100px" />
                                <vue-excel-column field="reward_name" label="奖惩名称"   width="100px" />
                                <vue-excel-column field="username"    label="员工姓名"   width="100px" />
                                <vue-excel-column field="account"     label="员工OA"    width="100px" />
                                <vue-excel-column field="company"     label="所属单位"   width="100px" />
                                <vue-excel-column field="zone"        label="所属区域"   width="100px" />
                                <vue-excel-column field="department"  label="所属部门"   width="100px" />
                                <vue-excel-column field="project"     label="项目/中心"  width="100px" />
                                <vue-excel-column field="pname"       label="项目名称"   width="100px" />
                                <vue-excel-column field="position"    label="员工职务"   width="100px" />
                                <vue-excel-column field="amount"      label="分配金额(￥)"   width="100px" summary="sum" />
                                <vue-excel-column field="status"      label="状态"      width="80px" />
                            </vue-excel-editor>
                          </a-row>
                        </div>
                      </a-tab-pane>
                      <a-tab-pane key="4" tab="其他业务类">
                        <div class="reward-apply-content-item reward-apply-content-title" style="">
                          <a-row style="border-top: 1px dash #f0f0f0;" >
                            <a-col class="reward-apply-content-title-text" :span="4" style="float:left;text-align:left;margin-left:10px;">
                              明细数据
                            </a-col>
                            <a-col :span="16">
                              <div style="position:absolute; right: -9.0rem; top: -2px;">
                                <excel-export :sheet="sheetOIData" :manual="false" @before-start="exportOIData();">
                                  <div>导出</div>
                                </excel-export>
                              </div>
                            </a-col>
                          </a-row>
                        </div>

                        <div class="reward-apply-content-item reward-apply-content-title" style="">
                          <a-row style="border-top: 1px dash #f0f0f0;margin:0px 0.75rem;" >
                            <vue-excel-editor v-model="oidata" ref="grid_o0" width="100%" :page="20" :no-num-col="false" :readonly="false" filter-row :localized-label="vueExcelLabels"  autocomplete @delete="onDelete" @update="onUpdate" >
                                <vue-excel-column field="type"        label="分配性质"   width="80px" />
                                <vue-excel-column field="period"      label="发放期间"   width="100px" />
                                <vue-excel-column field="reward_period" label="所属期间"   width="100px" />
                                <vue-excel-column field="reward_type" label="奖惩类型"   width="100px" />
                                <vue-excel-column field="reward_name" label="奖惩名称"   width="100px" />
                                <vue-excel-column field="username"    label="员工姓名"   width="100px" />
                                <vue-excel-column field="account"     label="员工OA"    width="100px" />
                                <vue-excel-column field="company"     label="所属单位"   width="100px" />
                                <vue-excel-column field="zone"        label="所属区域"   width="100px" />
                                <vue-excel-column field="department"  label="所属部门"   width="100px" />
                                <vue-excel-column field="project"     label="项目/中心"  width="100px" />
                                <vue-excel-column field="pname"       label="项目名称"   width="100px" />
                                <vue-excel-column field="position"    label="员工职务"   width="100px" />
                                <vue-excel-column field="amount"      label="分配金额(￥)"   width="100px" summary="sum" />
                                <vue-excel-column field="status"      label="状态"      width="80px" />
                            </vue-excel-editor>
                          </a-row>
                        </div>

                        <div class="reward-apply-content-item reward-apply-content-title" style="">
                          <a-row style="border-top: 1px dash #f0f0f0;" >
                            <a-col class="reward-apply-content-title-text" :span="10" style="float:left;text-align:left;margin-left:10px;">
                              汇总数据（按发放周期、奖惩类型、员工账户、项目名称）
                            </a-col>
                            <a-col :span="10">
                              <div style="position:absolute; right: -9.0rem; top: -2px;">
                                <excel-export :sheet="sheetOTData" :manual="false" @before-start="exportOTData();">
                                  <div>导出</div>
                                </excel-export>
                              </div>
                            </a-col>
                          </a-row>
                        </div>

                        <div class="reward-apply-content-item reward-apply-content-title" style="">
                          <a-row style="border-top: 1px dash #f0f0f0;margin:0px 0.75rem;" >
                            <vue-excel-editor v-model="otdata" ref="grid_o1" width="100%" :page="20" :no-num-col="false" :readonly="false" filter-row :localized-label="vueExcelLabels"  autocomplete @delete="onDelete" @update="onUpdate" >
                                <vue-excel-column field="type"        label="分配性质"   width="80px" />
                                <vue-excel-column field="period"      label="发放期间"   width="100px" />
                                <vue-excel-column field="reward_type" label="奖惩类型"   width="100px" />
                                <vue-excel-column field="reward_name" label="奖惩名称"   width="100px" />
                                <vue-excel-column field="username"    label="员工姓名"   width="100px" />
                                <vue-excel-column field="account"     label="员工OA"    width="100px" />
                                <vue-excel-column field="company"     label="所属单位"   width="100px" />
                                <vue-excel-column field="zone"        label="所属区域"   width="100px" />
                                <vue-excel-column field="department"  label="所属部门"   width="100px" />
                                <vue-excel-column field="project"     label="项目/中心"  width="100px" />
                                <vue-excel-column field="pname"       label="项目名称"   width="100px" />
                                <vue-excel-column field="position"    label="员工职务"   width="100px" />
                                <vue-excel-column field="amount"      label="分配金额(￥)"   width="100px" summary="sum" />
                                <vue-excel-column field="status"      label="状态"      width="80px" />
                            </vue-excel-editor>
                          </a-row>
                        </div>

                        <div class="reward-apply-content-item reward-apply-content-title" style="">
                          <a-row style="border-top: 1px dash #f0f0f0;" >
                            <a-col class="reward-apply-content-title-text" :span="10" style="float:left;text-align:left;margin-left:10px;">
                              汇总数据（按发放周期、奖惩类型、员工账户）
                            </a-col>
                            <a-col :span="10">
                              <div style="position:absolute; right: -9.0rem; top: -2px;">
                                <excel-export :sheet="sheetOMData" :manual="false" @before-start="exportOMData();">
                                  <div>导出</div>
                                </excel-export>
                              </div>
                            </a-col>
                          </a-row>
                        </div>

                        <div class="reward-apply-content-item reward-apply-content-title" style="">
                          <a-row style="border-top: 1px dash #f0f0f0;margin:0px 0.75rem;" >
                            <vue-excel-editor v-model="omdata" ref="grid_o2" width="100%" :page="20" :no-num-col="false" :readonly="false" filter-row :localized-label="vueExcelLabels"  autocomplete @delete="onDelete" @update="onUpdate" >
                                <vue-excel-column field="type"        label="分配性质"   width="80px" />
                                <vue-excel-column field="period"      label="发放期间"   width="100px" />
                                <vue-excel-column field="reward_type" label="奖惩类型"   width="100px" />
                                <vue-excel-column field="reward_name" label="奖惩名称"   width="100px" />
                                <vue-excel-column field="username"    label="员工姓名"   width="100px" />
                                <vue-excel-column field="account"     label="员工OA"    width="100px" />
                                <vue-excel-column field="company"     label="所属单位"   width="100px" />
                                <vue-excel-column field="zone"        label="所属区域"   width="100px" />
                                <vue-excel-column field="department"  label="所属部门"   width="100px" />
                                <vue-excel-column field="project"     label="项目/中心"  width="100px" />
                                <vue-excel-column field="pname"       label="项目名称"   width="100px" />
                                <vue-excel-column field="position"    label="员工职务"   width="100px" />
                                <vue-excel-column field="amount"      label="分配金额(￥)"   width="100px" summary="sum" />
                                <vue-excel-column field="status"      label="状态"      width="80px" />
                            </vue-excel-editor>
                          </a-row>
                        </div>

                        <div class="reward-apply-content-item reward-apply-content-title" style="">
                          <a-row style="border-top: 1px dash #f0f0f0;" >
                            <a-col class="reward-apply-content-title-text" :span="10" style="float:left;text-align:left;margin-left:10px;">
                              汇总数据（按发放周期、员工账户）
                            </a-col>
                            <a-col :span="10">
                              <div style="position:absolute; right: -9.0rem; top: -2px;">
                                <excel-export :sheet="sheetOEData" :manual="false" @before-start="exportOEData();">
                                  <div>导出</div>
                                </excel-export>
                              </div>
                            </a-col>
                          </a-row>
                        </div>

                        <div class="reward-apply-content-item reward-apply-content-title" style="">
                          <a-row style="border-top: 1px dash #f0f0f0;margin:0px 0.75rem;" >
                            <vue-excel-editor v-model="oedata" ref="grid_o3" width="100%" :page="20" :no-num-col="false" :readonly="false" filter-row :localized-label="vueExcelLabels"  autocomplete @delete="onDelete" @update="onUpdate" >
                                <vue-excel-column field="type"        label="分配性质"   width="80px" />
                                <vue-excel-column field="period"      label="发放期间"   width="100px" />
                                <vue-excel-column field="reward_type" label="奖惩类型"   width="100px" />
                                <vue-excel-column field="reward_name" label="奖惩名称"   width="100px" />
                                <vue-excel-column field="username"    label="员工姓名"   width="100px" />
                                <vue-excel-column field="account"     label="员工OA"    width="100px" />
                                <vue-excel-column field="company"     label="所属单位"   width="100px" />
                                <vue-excel-column field="zone"        label="所属区域"   width="100px" />
                                <vue-excel-column field="department"  label="所属部门"   width="100px" />
                                <vue-excel-column field="project"     label="项目/中心"  width="100px" />
                                <vue-excel-column field="pname"       label="项目名称"   width="100px" />
                                <vue-excel-column field="position"    label="员工职务"   width="100px" />
                                <vue-excel-column field="amount"      label="分配金额(￥)"   width="100px" summary="sum" />
                                <vue-excel-column field="status"      label="状态"      width="80px" />
                            </vue-excel-editor>
                          </a-row>
                        </div>
                      </a-tab-pane>
                    </a-tabs>
                </div>

                <div style="height:100px;">

                </div>

              </div>

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
import * as contact from '@/vuex/contacts';

try {
  Vue.component("excelExport", PikazJsExcel.ExcelExport);
} catch (error) {
  console.log(error);
}

export default {
  mixins: [window.mixin],
  data() {
    return {
      iswechat:false,
      iswework:false,
      pageName: "奖罚年度报表",
      momentNewMsg: true,
      activeTabKey: 3,
      acceptType:'*/*',
      uploadURL:'',
      tablename:'bs_reward_items',
      size: 0,
      loading:false,
      item:{
              title: '',
              company: '',
              department: '',
              content: '',
              amount: '',
              wflowid: '',
              bpm_status: '',
              reward_type: '',
              reward_name: '',
              reward_period: dayjs().format('YYYY年MM月'),
              reward_release_period: dayjs().format('YYYY年MM月'),
              reward_release_feature: '当期分配',
              hr_admin_ids: '',
              hr_admin_names: '',
              hr_id: '',
              hr_name: '',
              user_admin_name:'',
              apply_username: '',
              apply_realname: '',
              files: '',
              status: '',
              month:dayjs().format('YYYY年MM月'),
            },
      period:dayjs().format('YYYY年'),
      reward_name:'',
      reward_period:'',
      reward_type:'',
      pname:'',
      zone:'',
      cost_bearer:'',
      columns: workconfig.columns.reward.items,
      wfcolumns: workconfig.columns.reward.wfcolumns,
      vueExcelLabels: workconfig.columns.reward.vueExcelLabels,
      idata:[], //明细数据（全部数据）
      tdata:[], //汇总数据（全部数据）
      mdata:[], //汇总数据（全部数据）
      edata:[], //汇总数据（全部数据）

      yidata:[], //明细数据（业绩考核类）
      ytdata:[], //汇总数据（业绩考核类）
      ymdata:[], //汇总数据（业绩考核类）
      yedata:[], //汇总数据（业绩考核类）

      gidata:[], //明细数据（总裁/总经理/特殊贡献）
      gtdata:[], //汇总数据（总裁/总经理/特殊贡献）
      gmdata:[], //汇总数据（总裁/总经理/特殊贡献）
      gedata:[], //汇总数据（总裁/总经理/特殊贡献）

      oidata:[], //明细数据（其他业务类）
      otdata:[], //汇总数据（其他业务类）
      omdata:[], //汇总数据（其他业务类）
      oedata:[], //汇总数据（其他业务类）

      userList:[],
      approve_userid:'',
      approve_username:'',
      approve_mobile:'',
      approve_department:'',
      approve_company:'',
      approve_position:'',
      approve_userlist:[],
      approve_notify_userid:'',
      approve_notify_username:'',
      approve_notify_mobile:'',
      approve_notify_department:'',
      approve_notify_company:'',
      approve_notify_position:'',
      approve_notify_userlist:[],
      approve_executelist:[],
      approve_notifylist:[],
      role:'',
      tablename:'bs_reward_apply',
      readonly: false,
      uploadURL:'https://upload.yunwisdom.club:30443/sys/common/upload',
      downloadURL:'https://upload.yunwisdom.club:30443/',
      message: workconfig.compValidation.rewardapply.message,
      valid: workconfig.compValidation.rewardapply.valid,
      goodstype: workconfig.goodstype,
      goodsborrowtype: workconfig.goodsborrowtype,
      diplomaType: workconfig.compcolumns.diplomaTypeColumns,
      acceptType: workconfig.compcolumns.acceptType,
      commonTypeColumns: workconfig.compcolumns.commonTypeColumns,
      sealTypeColumns: workconfig.compcolumns.sealTypeColumns,
      panename:'',
      typename:'',
      approve_content:'',
      processLogList:[],
      workflowLogList:[],
      bpm_status:'',
      proponents:'',
      sheetIData:[{
                title:"奖惩明细数据（全部数据）",
                tHeader:["分配性质","发放期间","奖惩类型","奖惩名称","员工姓名","员工OA","所属单位","所属区域","所属部门","项目/中心","项目名称","员工职务","分配金额","状态"],
                table:[],
                keys:["type","period","reward_type","reward_name","username","account","company","zone","department","project","pname","position","amount","status"],
                sheetName:"奖惩明细数据"
              },{
                title:"奖惩汇总数据（全部数据，按发放周期、奖惩类型、员工账户、项目名称）",
                tHeader:["分配性质","发放期间","奖惩类型","奖惩名称","员工姓名","员工OA","所属单位","所属区域","所属部门","项目/中心","项目名称","员工职务","分配金额","状态"],
                table:[],
                keys:["type","period","reward_type","reward_name","username","account","company","zone","department","project","pname","position","amount","status"],
                sheetName:"奖惩汇总数据（按发放周期、奖惩类型、员工账户、项目名称）"
              },{
                title:"奖惩汇总数据（全部数据，按发放周期、奖惩类型、员工账户）",
                tHeader:["分配性质","发放期间","奖惩类型","奖惩名称","员工姓名","员工OA","所属单位","所属区域","所属部门","项目/中心","项目名称","员工职务","分配金额","状态"],
                table:[],
                keys:["type","period","reward_type","reward_name","username","account","company","zone","department","project","pname","position","amount","status"],
                sheetName:"奖惩汇总数据（按发放周期、奖惩类型、员工账户）"
              },{
                title:"奖惩汇总数据（全部数据，按发放周期、员工账户）",
                tHeader:["分配性质","发放期间","奖惩类型","奖惩名称","员工姓名","员工OA","所属单位","所属区域","所属部门","项目/中心","项目名称","员工职务","分配金额","状态"],
                table:[],
                keys:["type","period","reward_type","reward_name","username","account","company","zone","department","project","pname","position","amount","status"],
                sheetName:"奖惩汇总数据（按发放周期、员工账户）"
              } ],
      sheetTData:[ {
                title:"奖惩汇总数据（全部数据，按发放周期、奖惩类型、员工账户、项目名称）",
                tHeader:["分配性质","发放期间","奖惩类型","奖惩名称","员工姓名","员工OA","所属单位","所属区域","所属部门","项目/中心","项目名称","员工职务","分配金额","状态"],
                table:[],
                keys:["type","period","reward_type","reward_name","username","account","company","zone","department","project","pname","position","amount","status"],
                sheetName:"奖惩汇总数据（按发放周期、奖惩类型、员工账户、项目名称）"
              }
            ],
      sheetMData:[ {
                title:"奖惩汇总数据（全部数据，按发放周期、奖惩类型、员工账户）",
                tHeader:["分配性质","发放期间","奖惩类型","奖惩名称","员工姓名","员工OA","所属单位","所属区域","所属部门","项目/中心","项目名称","员工职务","分配金额","状态"],
                table:[],
                keys:["type","period","reward_type","reward_name","username","account","company","zone","department","project","pname","position","amount","status"],
                sheetName:"奖惩汇总数据（按发放周期、奖惩类型、员工账户）"
              }
            ],
      sheetEData:[ {
                title:"奖惩汇总数据（全部数据，按发放周期、员工账户）",
                tHeader:["分配性质","发放期间","奖惩类型","奖惩名称","员工姓名","员工OA","所属单位","所属区域","所属部门","项目/中心","项目名称","员工职务","分配金额","状态"],
                table:[],
                keys:["type","period","reward_type","reward_name","username","account","company","zone","department","project","pname","position","amount","status"],
                sheetName:"奖惩汇总数据（按发放周期、员工账户）"
              }
            ],

      sheetGIData:[{
                title:"奖惩明细数据（总裁/总经理/特殊贡献）",
                tHeader:["分配性质","发放期间","奖惩类型","奖惩名称","员工姓名","员工OA","所属单位","所属区域","所属部门","项目/中心","项目名称","员工职务","分配金额","状态"],
                table:[],
                keys:["type","period","reward_type","reward_name","username","account","company","zone","department","project","pname","position","amount","status"],
                sheetName:"奖惩明细数据"
              },{
                title:"奖惩汇总数据（总裁/总经理/特殊贡献，按发放周期、奖惩类型、员工账户、项目名称）",
                tHeader:["分配性质","发放期间","奖惩类型","奖惩名称","员工姓名","员工OA","所属单位","所属区域","所属部门","项目/中心","项目名称","员工职务","分配金额","状态"],
                table:[],
                keys:["type","period","reward_type","reward_name","username","account","company","zone","department","project","pname","position","amount","status"],
                sheetName:"奖惩汇总数据（按发放周期、奖惩类型、员工账户、项目名称）"
              },{
                title:"奖惩汇总数据（总裁/总经理/特殊贡献，按发放周期、奖惩类型、员工账户）",
                tHeader:["分配性质","发放期间","奖惩类型","奖惩名称","员工姓名","员工OA","所属单位","所属区域","所属部门","项目/中心","项目名称","员工职务","分配金额","状态"],
                table:[],
                keys:["type","period","reward_type","reward_name","username","account","company","zone","department","project","pname","position","amount","status"],
                sheetName:"奖惩汇总数据（按发放周期、奖惩类型、员工账户）"
              },{
                title:"奖惩汇总数据（总裁/总经理/特殊贡献，按发放周期、员工账户）",
                tHeader:["分配性质","发放期间","奖惩类型","奖惩名称","员工姓名","员工OA","所属单位","所属区域","所属部门","项目/中心","项目名称","员工职务","分配金额","状态"],
                table:[],
                keys:["type","period","reward_type","reward_name","username","account","company","zone","department","project","pname","position","amount","status"],
                sheetName:"奖惩汇总数据（按发放周期、员工账户）"
              } ],
      sheetGTData:[ {
                title:"奖惩汇总数据（总裁/总经理/特殊贡献，按发放周期、奖惩类型、员工账户、项目名称）",
                tHeader:["分配性质","发放期间","奖惩类型","奖惩名称","员工姓名","员工OA","所属单位","所属区域","所属部门","项目/中心","项目名称","员工职务","分配金额","状态"],
                table:[],
                keys:["type","period","reward_type","reward_name","username","account","company","zone","department","project","pname","position","amount","status"],
                sheetName:"奖惩汇总数据（按发放周期、奖惩类型、员工账户、项目名称）"
              }
            ],
      sheetGMData:[ {
                title:"奖惩汇总数据（总裁/总经理/特殊贡献，按发放周期、奖惩类型、员工账户）",
                tHeader:["分配性质","发放期间","奖惩类型","奖惩名称","员工姓名","员工OA","所属单位","所属区域","所属部门","项目/中心","项目名称","员工职务","分配金额","状态"],
                table:[],
                keys:["type","period","reward_type","reward_name","username","account","company","zone","department","project","pname","position","amount","status"],
                sheetName:"奖惩汇总数据（按发放周期、奖惩类型、员工账户）"
              }
            ],
      sheetGEData:[ {
                title:"奖惩汇总数据（总裁/总经理/特殊贡献，按发放周期、员工账户）",
                tHeader:["分配性质","发放期间","奖惩类型","奖惩名称","员工姓名","员工OA","所属单位","所属区域","所属部门","项目/中心","项目名称","员工职务","分配金额","状态"],
                table:[],
                keys:["type","period","reward_type","reward_name","username","account","company","zone","department","project","pname","position","amount","status"],
                sheetName:"奖惩汇总数据（按发放周期、员工账户）"
              }
            ],

      sheetOIData:[{
                title:"奖惩明细数据（其他业务类）",
                tHeader:["分配性质","发放期间","奖惩类型","奖惩名称","员工姓名","员工OA","所属单位","所属区域","所属部门","项目/中心","项目名称","员工职务","分配金额","状态"],
                table:[],
                keys:["type","period","reward_type","reward_name","username","account","company","zone","department","project","pname","position","amount","status"],
                sheetName:"奖惩明细数据"
              },{
                title:"奖惩汇总数据（其他业务类，按发放周期、奖惩类型、员工账户、项目名称）",
                tHeader:["分配性质","发放期间","奖惩类型","奖惩名称","员工姓名","员工OA","所属单位","所属区域","所属部门","项目/中心","项目名称","员工职务","分配金额","状态"],
                table:[],
                keys:["type","period","reward_type","reward_name","username","account","company","zone","department","project","pname","position","amount","status"],
                sheetName:"奖惩汇总数据（按发放周期、奖惩类型、员工账户、项目名称）"
              },{
                title:"奖惩汇总数据（其他业务类，按发放周期、奖惩类型、员工账户）",
                tHeader:["分配性质","发放期间","奖惩类型","奖惩名称","员工姓名","员工OA","所属单位","所属区域","所属部门","项目/中心","项目名称","员工职务","分配金额","状态"],
                table:[],
                keys:["type","period","reward_type","reward_name","username","account","company","zone","department","project","pname","position","amount","status"],
                sheetName:"奖惩汇总数据（按发放周期、奖惩类型、员工账户）"
              },{
                title:"奖惩汇总数据（其他业务类，按发放周期、员工账户）",
                tHeader:["分配性质","发放期间","奖惩类型","奖惩名称","员工姓名","员工OA","所属单位","所属区域","所属部门","项目/中心","项目名称","员工职务","分配金额","状态"],
                table:[],
                keys:["type","period","reward_type","reward_name","username","account","company","zone","department","project","pname","position","amount","status"],
                sheetName:"奖惩汇总数据（按发放周期、员工账户）"
              } ],
      sheetOTData:[ {
                title:"奖惩汇总数据（其他业务类，按发放周期、奖惩类型、员工账户、项目名称）",
                tHeader:["分配性质","发放期间","奖惩类型","奖惩名称","员工姓名","员工OA","所属单位","所属区域","所属部门","项目/中心","项目名称","员工职务","分配金额","状态"],
                table:[],
                keys:["type","period","reward_type","reward_name","username","account","company","zone","department","project","pname","position","amount","status"],
                sheetName:"奖惩汇总数据（按发放周期、奖惩类型、员工账户、项目名称）"
              }
            ],
      sheetOMData:[ {
                title:"奖惩汇总数据（其他业务类，按发放周期、奖惩类型、员工账户）",
                tHeader:["分配性质","发放期间","奖惩类型","奖惩名称","员工姓名","员工OA","所属单位","所属区域","所属部门","项目/中心","项目名称","员工职务","分配金额","状态"],
                table:[],
                keys:["type","period","reward_type","reward_name","username","account","company","zone","department","project","pname","position","amount","status"],
                sheetName:"奖惩汇总数据（按发放周期、奖惩类型、员工账户）"
              }
            ],
      sheetOEData:[ {
                title:"奖惩汇总数据（其他业务类，按发放周期、员工账户）",
                tHeader:["分配性质","发放期间","奖惩类型","奖惩名称","员工姓名","员工OA","所属单位","所属区域","所属部门","项目/中心","项目名称","员工职务","分配金额","状态"],
                table:[],
                keys:["type","period","reward_type","reward_name","username","account","company","zone","department","project","pname","position","amount","status"],
                sheetName:"奖惩汇总数据（按发放周期、员工账户）"
              }
            ],

      sheetYIData:[{
                title:"奖惩明细数据（业绩考核类）",
                tHeader:["分配性质","发放期间","奖惩类型","奖惩名称","员工姓名","员工OA","所属单位","所属区域","所属部门","项目/中心","项目名称","员工职务","分配金额","状态"],
                table:[],
                keys:["type","period","reward_type","reward_name","username","account","company","zone","department","project","pname","position","amount","status"],
                sheetName:"奖惩明细数据"
              },{
                title:"奖惩汇总数据（业绩考核类，按发放周期、奖惩类型、员工账户、项目名称）",
                tHeader:["分配性质","发放期间","奖惩类型","奖惩名称","员工姓名","员工OA","所属单位","所属区域","所属部门","项目/中心","项目名称","员工职务","分配金额","状态"],
                table:[],
                keys:["type","period","reward_type","reward_name","username","account","company","zone","department","project","pname","position","amount","status"],
                sheetName:"奖惩汇总数据（按发放周期、奖惩类型、员工账户、项目名称）"
              },{
                title:"奖惩汇总数据（业绩考核类，按发放周期、奖惩类型、员工账户）",
                tHeader:["分配性质","发放期间","奖惩类型","奖惩名称","员工姓名","员工OA","所属单位","所属区域","所属部门","项目/中心","项目名称","员工职务","分配金额","状态"],
                table:[],
                keys:["type","period","reward_type","reward_name","username","account","company","zone","department","project","pname","position","amount","status"],
                sheetName:"奖惩汇总数据（按发放周期、奖惩类型、员工账户）"
              },{
                title:"奖惩汇总数据（业绩考核类，按发放周期、员工账户）",
                tHeader:["分配性质","发放期间","奖惩类型","奖惩名称","员工姓名","员工OA","所属单位","所属区域","所属部门","项目/中心","项目名称","员工职务","分配金额","状态"],
                table:[],
                keys:["type","period","reward_type","reward_name","username","account","company","zone","department","project","pname","position","amount","status"],
                sheetName:"奖惩汇总数据（按发放周期、员工账户）"
              } ],
      sheetYTData:[ {
                title:"奖惩汇总数据（业绩考核类，按发放周期、奖惩类型、员工账户、项目名称）",
                tHeader:["分配性质","发放期间","奖惩类型","奖惩名称","员工姓名","员工OA","所属单位","所属区域","所属部门","项目/中心","项目名称","员工职务","分配金额","状态"],
                table:[],
                keys:["type","period","reward_type","reward_name","username","account","company","zone","department","project","pname","position","amount","status"],
                sheetName:"奖惩汇总数据（按发放周期、奖惩类型、员工账户、项目名称）"
              }
            ],
      sheetYMData:[ {
                title:"奖惩汇总数据（业绩考核类，按发放周期、奖惩类型、员工账户）",
                tHeader:["分配性质","发放期间","奖惩类型","奖惩名称","员工姓名","员工OA","所属单位","所属区域","所属部门","项目/中心","项目名称","员工职务","分配金额","状态"],
                table:[],
                keys:["type","period","reward_type","reward_name","username","account","company","zone","department","project","pname","position","amount","status"],
                sheetName:"奖惩汇总数据（按发放周期、奖惩类型、员工账户）"
              }
            ],
      sheetYEData:[ {
                title:"奖惩汇总数据（业绩考核类，按发放周期、员工账户）",
                tHeader:["分配性质","发放期间","奖惩类型","奖惩名称","员工姓名","员工OA","所属单位","所属区域","所属部门","项目/中心","项目名称","员工职务","分配金额","状态"],
                table:[],
                keys:["type","period","reward_type","reward_name","username","account","company","zone","department","project","pname","position","amount","status"],
                sheetName:"奖惩汇总数据（按发放周期、员工账户）"
              }
            ],
      statusType:{'valid':'有效','invalid':'删除'},
      zoneType:{'领地集团总部':'领地集团总部','重庆区域':'重庆区域','两湖区域':'两湖区域','川北区域':'川北区域','成都区域':'成都区域','乐眉区域':'乐眉区域','中原区域':'中原区域','攀西区域':'攀西区域','新疆区域':'新疆区域','大湾区域':'大湾区域','北京区域':'北京区域'},
    };
  },
  activated() {
    this.queryInfo();
  },
  mounted() {
    this.queryInfo();
  },
  methods: {
      async onDelete(){

      },
      async onUpdate(){

      },
      //上传提示
      async toastUpload(flag){
        if(flag == 'start'){
          vant.Toast.loading({duration: 0, forbidClick: true, message: '上传中...',});
        } else if(flag == 'fail'){
          this.$toast.success('文件上传失败，请稍后重试！');
        }
      },
      async saveAsFile(file , name){
        try {
          window.open(file , '_blank');
        } catch (error) {
          console.log(error);
        }
        try {
          window.saveAs(file , name);
        } catch (error) {
          console.log(error);
        }
      },
      async download(file){
        const toast = vant.Toast.loading({duration: 0, forbidClick: true, message: '下载中...',});
        await this.saveAsFile(this.downloadURL + file, '相关附件_' + file.split('/')[1]);
        vant.Toast.clear();
      },
      // 企业微信登录处理函数
      async weworkLogin(){
        try {
          return await query.queryWeworkUser();
        } catch (error) {
          console.log(error);
        }
      },
      // 获取URL或者二维码信息
      async queryInfo() {

        this.iswechat = (document.body.clientWidth || window.screen.width) > 875 ?  false : tools.isWechat(); //查询当前是否微信端
        this.iswework = tools.isWework(); //查询是否为企业微信
        this.userinfo = await this.weworkLogin(); //查询当前登录用户

      },

      // 获取奖罚月度报表数据（全部数据）
      async queryRewardYearInfo(){
        if(!this.period){
          return this.$toast.fail('请输入发放周期！');
        }
        const list = await query.queryRewardItemByID(this.period , this.zone , this.reward_type , this.reward_name , this.pname , this.cost_bearer);

        const amap = new Map();
        let tlist = null;
        let mlist = null;
        let elist = null;

        try {
          // 遍历一遍list，根据list的发放周期、奖惩类型、员工账户、项目名称为唯一key
          list.map(item=>{
            item.group_key = `Group_Key_ALL_${tools.deNull(this.period)}_${tools.deNull(item.reward_type)}_${tools.deNull(item.account)}_${tools.deNull(item.pname)}`;
            item.m_key = `M_Key_ALL_${tools.deNull(this.period)}_${tools.deNull(item.reward_type)}_${tools.deNull(item.account)}`;
            item.e_key = `E_Key_ALL_${tools.deNull(this.period)}_${tools.deNull(item.account)}`;
            let total = amap.get(item.group_key) ? amap.get(item.group_key) + item.amount : 0.00 + item.amount;
            let mtotal = amap.get(item.m_key) ? amap.get(item.m_key) + item.amount : 0.00 + item.amount;
            let etotal = amap.get(item.e_key) ? amap.get(item.e_key) + item.amount : 0.00 + item.amount;
            console.log(`all g_key:${item.group_key} total: ${total}`);
            console.log(`all m_key:${item.m_key} total: ${mtotal}`);
            console.log(`all e_key:${item.e_key} total: ${etotal}`);
            amap.set(item.group_key , total);
            amap.set(item.m_key , mtotal);
            amap.set(item.e_key , etotal);
          });
        } catch (error) {
          console.log(error);
        }

        try {
          // 克隆一下数据
          const templist = JSON.parse(JSON.stringify(list));
          // 获取缓存数据
          tlist = templist.filter( (item,index) => {
            const findex = templist.findIndex((elem,index) => {
              return elem.group_key == item.group_key
            });
            item.period = this.period;
            item.amount = amap.get(item.group_key) ;
            return index == findex;
          });
        } catch (error) {
          console.log(error);
        }

        try {
          // 克隆一下数据
          const mtemplist = JSON.parse(JSON.stringify(list));
          // 获取缓存数据
          mlist = mtemplist.filter( (item,index) => {
            const findex = mtemplist.findIndex((elem,index) => {
              return elem.m_key == item.m_key
            });
            item.period = this.period;
            item.pname = '--';
            item.reward_name = '--';
            item.amount = amap.get(item.m_key) ;
            return index == findex;
          });
        } catch (error) {
          console.log(error);
        }

        try {
          // 克隆一下数据
          const etemplist = JSON.parse(JSON.stringify(list));
          // 获取缓存数据
          elist = etemplist.filter( (item,index) => {
            const findex = etemplist.findIndex((elem,index) => {
              return elem.e_key == item.e_key
            });
            item.period = this.period;
            item.pname = '--';
            item.reward_name = '--';
            item.reward_type = '全部类型';
            item.amount = amap.get(item.e_key) ;
            return index == findex;
          });
        } catch (error) {
          console.log(error);
        }

        this.idata = list;
        this.tdata = tlist;
        this.mdata = mlist;
        this.edata = elist;

        this.sheetIData[0].table = list;
        this.sheetIData[1].table = tlist;
        this.sheetIData[2].table = mlist;
        this.sheetIData[3].table = elist;

        this.sheetTData[0].table = tlist;
        this.sheetMData[0].table = mlist;
        this.sheetEData[0].table = elist;

        this.$toast.success(`查询${this.period}报表成功！`);
      },

      // 获取奖罚月度报表数据（业绩考核类）
      async queryRewardYearInfo_Y(){
        if(!this.period){
          return this.$toast.fail('请输入发放周期！');
        }
        const list = await query.queryRewardItemByID_Y(this.period , this.zone , this.reward_type , this.reward_name , this.pname , this.cost_bearer);

        const amap = new Map();
        let tlist = null;
        let mlist = null;
        let elist = null;

        try {
          // 遍历一遍list，根据list的发放周期、奖惩类型、员工账户、项目名称为唯一key
          list.map(item=>{
            item.group_key = `Group_Key_Y_${tools.deNull(this.period)}_${tools.deNull(item.reward_type)}_${tools.deNull(item.account)}_${tools.deNull(item.pname)}`;
            item.m_key = `M_Key_Y_${tools.deNull(this.period)}_${tools.deNull(item.reward_type)}_${tools.deNull(item.account)}`;
            item.e_key = `E_Key_Y_${tools.deNull(this.period)}_${tools.deNull(item.account)}`;
            let total = amap.get(item.group_key) ? amap.get(item.group_key) + item.amount : 0.00 + item.amount;
            let mtotal = amap.get(item.m_key) ? amap.get(item.m_key) + item.amount : 0.00 + item.amount;
            let etotal = amap.get(item.e_key) ? amap.get(item.e_key) + item.amount : 0.00 + item.amount;
            console.log(`yeji g_key:${item.group_key} total: ${total}`);
            console.log(`yeji m_key:${item.m_key} total: ${mtotal}`);
            console.log(`yeji e_key:${item.e_key} total: ${etotal}`);
            amap.set(item.group_key , total);
            amap.set(item.m_key , mtotal);
            amap.set(item.e_key , etotal);
          });
        } catch (error) {
          console.log(error);
        }

        try {
          // 克隆一下数据
          const templist = JSON.parse(JSON.stringify(list));
          // 获取缓存数据
          tlist = templist.filter( (item,index) => {
            const findex = templist.findIndex((elem,index) => {
              return elem.group_key == item.group_key
            });
            item.period = this.period;
            item.amount = amap.get(item.group_key) ;
            return index == findex;
          });
        } catch (error) {
          console.log(error);
        }

        try {
          // 克隆一下数据
          const mtemplist = JSON.parse(JSON.stringify(list));
          // 获取缓存数据
          mlist = mtemplist.filter( (item,index) => {
            const findex = mtemplist.findIndex((elem,index) => {
              return elem.m_key == item.m_key
            });
            item.period = this.period;
            item.pname = '--';
            item.reward_name = '--';
            item.amount = amap.get(item.m_key) ;
            return index == findex;
          });
        } catch (error) {
          console.log(error);
        }

        try {
          // 克隆一下数据
          const etemplist = JSON.parse(JSON.stringify(list));
          // 获取缓存数据
          elist = etemplist.filter( (item,index) => {
            const findex = etemplist.findIndex((elem,index) => {
              return elem.e_key == item.e_key
            });
            item.period = this.period;
            item.pname = '--';
            item.reward_name = '--';
            item.reward_type = '业绩考核类';
            item.amount = amap.get(item.e_key) ;
            return index == findex;
          });
        } catch (error) {
          console.log(error);
        }

        this.yidata = list;
        this.ytdata = tlist;
        this.ymdata = mlist;
        this.yedata = elist;

        this.sheetYIData[0].table = list;
        this.sheetYIData[1].table = tlist;
        this.sheetYIData[2].table = mlist;
        this.sheetYIData[3].table = elist;

        this.sheetYTData[0].table = tlist;
        this.sheetYMData[0].table = mlist;
        this.sheetYEData[0].table = elist;

        this.$toast.success(`查询${this.period}报表成功！`);
      },

      // 获取奖罚月度报表数据（总裁/总经理/特殊贡献）
      async queryRewardYearInfo_G(){
        if(!this.period){
          return this.$toast.fail('请输入发放周期！');
        }
        const list = await query.queryRewardItemByID_G(this.period , this.zone , this.reward_type , this.reward_name , this.pname , this.cost_bearer);

        const amap = new Map();
        let tlist = null;
        let mlist = null;
        let elist = null;

        try {
          // 遍历一遍list，根据list的发放周期、奖惩类型、员工账户、项目名称为唯一key
          list.map(item=>{
            item.group_key = `Group_Key_G_${tools.deNull(this.period)}_${tools.deNull(item.reward_type)}_${tools.deNull(item.account)}_${tools.deNull(item.pname)}`;
            item.m_key = `M_Key_G_${tools.deNull(this.period)}_${tools.deNull(item.reward_type)}_${tools.deNull(item.account)}`;
            item.e_key = `E_Key_G_${tools.deNull(this.period)}_${tools.deNull(item.account)}`;
            let total = amap.get(item.group_key) ? amap.get(item.group_key) + item.amount : 0.00 + item.amount;
            let mtotal = amap.get(item.m_key) ? amap.get(item.m_key) + item.amount : 0.00 + item.amount;
            let etotal = amap.get(item.e_key) ? amap.get(item.e_key) + item.amount : 0.00 + item.amount;
            console.log(`generel g_key:${item.group_key} total: ${total}`);
            console.log(`generel m_key:${item.m_key} total: ${mtotal}`);
            console.log(`generel e_key:${item.e_key} total: ${etotal}`);
            amap.set(item.group_key , total);
            amap.set(item.m_key , mtotal);
            amap.set(item.e_key , etotal);
          });
        } catch (error) {
          console.log(error);
        }

        try {
          // 克隆一下数据
          const templist = JSON.parse(JSON.stringify(list));
          // 获取缓存数据
          tlist = templist.filter( (item,index) => {
            const findex = templist.findIndex((elem,index) => {
              return elem.group_key == item.group_key
            });
            item.period = this.period;
            item.amount = amap.get(item.group_key) ;
            return index == findex;
          });
        } catch (error) {
          console.log(error);
        }

        try {
          // 克隆一下数据
          const mtemplist = JSON.parse(JSON.stringify(list));
          // 获取缓存数据
          mlist = mtemplist.filter( (item,index) => {
            const findex = mtemplist.findIndex((elem,index) => {
              return elem.m_key == item.m_key
            });
            item.period = this.period;
            item.pname = '--';
            item.reward_name = '--';
            item.amount = amap.get(item.m_key) ;
            return index == findex;
          });
        } catch (error) {
          console.log(error);
        }

        try {
          // 克隆一下数据
          const etemplist = JSON.parse(JSON.stringify(list));
          // 获取缓存数据
          elist = etemplist.filter( (item,index) => {
            const findex = etemplist.findIndex((elem,index) => {
              return elem.e_key == item.e_key
            });
            item.period = this.period;
            item.pname = '--';
            item.reward_name = '--';
            item.reward_type = '总裁/总经理/特殊贡献';
            item.amount = amap.get(item.e_key) ;
            return index == findex;
          });
        } catch (error) {
          console.log(error);
        }

        this.gidata = list;
        this.gtdata = tlist;
        this.gmdata = mlist;
        this.gedata = elist;

        this.sheetGIData[0].table = list;
        this.sheetGIData[1].table = tlist;
        this.sheetGIData[2].table = mlist;
        this.sheetGIData[3].table = elist;

        this.sheetGTData[0].table = tlist;
        this.sheetGMData[0].table = mlist;
        this.sheetGEData[0].table = elist;

        this.$toast.success(`查询${this.period}报表成功！`);
      },

      // 获取奖罚月度报表数据（其他业务类）
      async queryRewardYearInfo_O(){
        if(!this.period){
          return this.$toast.fail('请输入发放周期！');
        }
        const list = await query.queryRewardItemByID_O(this.period , this.zone , this.reward_type , this.reward_name , this.pname , this.cost_bearer);

        const amap = new Map();
        let tlist = null;
        let mlist = null;
        let elist = null;

        try {
          // 遍历一遍list，根据list的发放周期、奖惩类型、员工账户、项目名称为唯一key
          list.map(item=>{
            item.group_key = `Group_Key_O_${tools.deNull(this.period)}_${tools.deNull(item.reward_type)}_${tools.deNull(item.account)}_${tools.deNull(item.pname)}`;
            item.m_key = `M_Key_O_${tools.deNull(this.period)}_${tools.deNull(item.reward_type)}_${tools.deNull(item.account)}`;
            item.e_key = `E_Key_O_${tools.deNull(this.period)}_${tools.deNull(item.account)}`;
            let total = amap.get(item.group_key) ? amap.get(item.group_key) + item.amount : 0.00 + item.amount;
            let mtotal = amap.get(item.m_key) ? amap.get(item.m_key) + item.amount : 0.00 + item.amount;
            let etotal = amap.get(item.e_key) ? amap.get(item.e_key) + item.amount : 0.00 + item.amount;
            console.log(`other g_key:${item.group_key} total: ${total}`);
            console.log(`other m_key:${item.m_key} total: ${mtotal}`);
            console.log(`other e_key:${item.e_key} total: ${etotal}`);
            amap.set(item.group_key , total);
            amap.set(item.m_key , mtotal);
            amap.set(item.e_key , etotal);
          });
        } catch (error) {
          console.log(error);
        }

        try {
          // 克隆一下数据
          const templist = JSON.parse(JSON.stringify(list));
          // 获取缓存数据
          tlist = templist.filter( (item,index) => {
            const findex = templist.findIndex((elem,index) => {
              return elem.group_key == item.group_key
            });
            item.period = this.period;
            item.amount = amap.get(item.group_key) ;
            return index == findex;
          });
        } catch (error) {
          console.log(error);
        }

        try {
          // 克隆一下数据
          const mtemplist = JSON.parse(JSON.stringify(list));
          // 获取缓存数据
          mlist = mtemplist.filter( (item,index) => {
            const findex = mtemplist.findIndex((elem,index) => {
              return elem.m_key == item.m_key
            });
            item.period = this.period;
            item.pname = '--';
            item.reward_name = '--';
            item.amount = amap.get(item.m_key) ;
            return index == findex;
          });
        } catch (error) {
          console.log(error);
        }

        try {
          // 克隆一下数据
          const etemplist = JSON.parse(JSON.stringify(list));
          // 获取缓存数据
          elist = etemplist.filter( (item,index) => {
            const findex = etemplist.findIndex((elem,index) => {
              return elem.e_key == item.e_key
            });
            item.period = this.period;
            item.pname = '--';
            item.reward_name = '--';
            item.reward_type = '其他业务类';
            item.amount = amap.get(item.e_key) ;
            return index == findex;
          });
        } catch (error) {
          console.log(error);
        }

        this.oidata = list;
        this.otdata = tlist;
        this.omdata = mlist;
        this.oedata = elist;

        this.sheetOIData[0].table = list;
        this.sheetOIData[1].table = tlist;
        this.sheetOIData[2].table = mlist;
        this.sheetOIData[3].table = elist;

        this.sheetOTData[0].table = tlist;
        this.sheetOMData[0].table = mlist;
        this.sheetOEData[0].table = elist;

        this.$toast.success(`查询${this.period}报表成功！`);
      },

      // 获取奖惩汇总数据
      async queryCollected(){

      },
      // 导出明细数据
      async exportIData(){
         this.$refs.grid_00.exportTable('xlsx', false, '奖惩明细数据');
         this.sheetIData[0].table = this.idata;
      },
      // 导出汇总数据（按发放周期、奖惩类型、员工账户、项目名称）
      async exportTData(){
         this.$refs.grid_01.exportTable('xlsx', false, '奖惩汇总数据（按发放周期、奖惩类型、员工账户、项目名称）');
         this.sheetTData[0].table = this.tdata;
      },
      // 导出汇总数据（按发放周期、奖惩类型、员工账户）
      async exportMData(){
        this.$refs.grid_02.exportTable('xlsx', false, '奖惩汇总数据（按发放周期、奖惩类型、员工账户）');
        this.sheetMData[0].table = this.mdata;
      },
      // 导出汇总数据（按发放周期、员工账户）
      async exportEData(){
        this.$refs.grid_03.exportTable('xlsx', false, '奖惩汇总数据（按发放周期、员工账户）');
        this.sheetEData[0].table = this.edata;
      },

      // 导出明细数据 其他业务类
      async exportOIData(){
         this.$refs.grid_o0.exportTable('xlsx', false, '奖惩明细数据');
         this.sheetOIData[0].table = this.oidata;
      },
      // 导出汇总数据（其他业务类，按发放周期、奖惩类型、员工账户、项目名称）
      async exportOTData(){
         this.$refs.grid_o1.exportTable('xlsx', false, '奖惩汇总数据（按发放周期、奖惩类型、员工账户、项目名称）');
         this.sheetOTData[0].table = this.otdata;
      },
      // 导出汇总数据（其他业务类，按发放周期、奖惩类型、员工账户）
      async exportOMData(){
        this.$refs.grid_o2.exportTable('xlsx', false, '奖惩汇总数据（按发放周期、奖惩类型、员工账户）');
        this.sheetOMData[0].table = this.omdata;
      },
      // 导出汇总数据（其他业务类，按发放周期、员工账户）
      async exportOEData(){
        this.$refs.grid_o3.exportTable('xlsx', false, '奖惩汇总数据（按发放周期、员工账户）');
        this.sheetOEData[0].table = this.oedata;
      },

      // 导出明细数据 业绩考核类
      async exportYIData(){
         this.$refs.grid_y0.exportTable('xlsx', false, '奖惩明细数据');
         this.sheetYIData[0].table = this.yidata;
      },
      // 导出汇总数据（业绩考核类，按发放周期、奖惩类型、员工账户、项目名称）
      async exportYTData(){
         this.$refs.grid_y1.exportTable('xlsx', false, '奖惩汇总数据（按发放周期、奖惩类型、员工账户、项目名称）');
         this.sheetYTData[0].table = this.ytdata;
      },
      // 导出汇总数据（业绩考核类，按发放周期、奖惩类型、员工账户）
      async exportYMData(){
        this.$refs.grid_y2.exportTable('xlsx', false, '奖惩汇总数据（按发放周期、奖惩类型、员工账户）');
        this.sheetYMData[0].table = this.ymdata;
      },
      // 导出汇总数据（业绩考核类，按发放周期、员工账户）
      async exportYEData(){
        this.$refs.grid_y3.exportTable('xlsx', false, '奖惩汇总数据（按发放周期、员工账户）');
        this.sheetYEData[0].table = this.yedata;
      },

      // 导出明细数据 总裁/总经理/特殊贡献
      async exportGIData(){
         this.$refs.grid_g0.exportTable('xlsx', false, '奖惩明细数据');
         this.sheetGIData[0].table = this.gidata;
      },
      // 导出汇总数据（总裁/总经理/特殊贡献，按发放周期、奖惩类型、员工账户、项目名称）
      async exportGTData(){
         this.$refs.grid_g1.exportTable('xlsx', false, '奖惩汇总数据（按发放周期、奖惩类型、员工账户、项目名称）');
         this.sheetGTData[0].table = this.gtdata;
      },
      // 导出汇总数据（总裁/总经理/特殊贡献，按发放周期、奖惩类型、员工账户）
      async exportGMData(){
        this.$refs.grid_g2.exportTable('xlsx', false, '奖惩汇总数据（按发放周期、奖惩类型、员工账户）');
        this.sheetGMData[0].table = this.gmdata;
      },
      // 导出汇总数据（总裁/总经理/特殊贡献，按发放周期、员工账户）
      async exportGEData(){
        this.$refs.grid_g3.exportTable('xlsx', false, '奖惩汇总数据（按发放周期、员工账户）');
        this.sheetGEData[0].table = this.gedata;
      },

  },
};
</script>
<style scoped >
    @import "../../assets/css/reward.home.css";
    @import "../../assets/css/reward.apply.css";
</style>
