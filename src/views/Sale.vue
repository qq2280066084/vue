<template>
  <div class="main">
    <div class="top">
      <md-icon name="arrow-left" @click="$router.go(-1)"></md-icon>
      我要卖车
    </div>
    <div class="show">
      <md-scroll-view
        :scrolling-x="false"
        :scrolling-y="true"
        auto-reflow
      >
        <div class="banner"></div>


        <div class="content">
          <div class="type">
            <div class="name">
              <div class="txt">我的车型</div>
              <div class="cho" @click="showBox=true">
                {{brandStrRes}}
                <md-icon name="arrow-right"></md-icon>
              </div>
            </div>
<!--            <div class="list" v-show="brandStrRes=='请选择'">-->
<!--              <div class="item">-->
<!--                <div class="img dazhong"></div>-->
<!--                <div class="text">大众</div>-->
<!--              </div>-->
<!--              <div class="item">-->
<!--                <div class="img bentian"></div>-->
<!--                <div class="text">本田</div>-->
<!--              </div>-->
<!--              <div class="item">-->
<!--                <div class="img bieke"></div>-->
<!--                <div class="text">别克</div>-->
<!--              </div>-->
<!--              <div class="item">-->
<!--                <div class="img fengtian"></div>-->
<!--                <div class="text">丰田</div>-->
<!--              </div>-->
<!--              <div class="item ">-->
<!--                <div class="img baoma"></div>-->
<!--                <div class="text">宝马</div>-->
<!--              </div>-->
<!--              <div class="item">-->
<!--                <div class="img benchi"></div>-->
<!--                <div class="text">奔驰</div>-->
<!--              </div>-->
<!--              <div class="item">-->
<!--                <div class="img xiandai"></div>-->
<!--                <div class="text">现代</div>-->
<!--              </div>-->
<!--              <div class="item" @click="showBox=true">-->
<!--                <div class="img gengduo"></div>-->
<!--                <div class="text">更多</div>-->
<!--              </div>-->
<!--            </div>-->

          </div>
          <div class="choItem">
            <div class="name">车辆年份</div>
            <div class="input">
              <input placeholder="请输入车辆年份" type="number" v-model="year">
<!--              <md-icon name="arrow-right"></md-icon>-->
            </div>
          </div>
          <div class="choItem">
            <div class="name">行程里数</div>
            <div class="input">
              <input placeholder="请输入汽车里程数" type="number" v-model="mileage">
            </div>
          </div>
          <div class="choItem">
            <div class="name">联系人姓名</div>
            <div class="input">
              <input placeholder="请输入联系人姓名" type="text" v-model="lxName">
            </div>
          </div>
          <div class="choItem">
            <div class="name">联系人电话</div>
            <div class="input">
              <input placeholder="请输入联系人电话" type="number" v-model="lxPhone">
            </div>
          </div>
          <div class="choPic">
            <div class="name">车辆描述</div>
            <div class="showModel">
              <textarea placeholder="请输入车辆描述" rows="3" cols="20" v-model="txt"></textarea>
            </div>
          </div>

          <div class="choPic">
            <div class="name">上传车辆图片</div>
            <div class="showModel">
              <template>
                <div class="md-example-child md-example-child-reader md-example-child-reader-1">
                  <ul class="image-reader-list">
                    <li
                      :key="index"
                      :style="{
                        'backgroundImage': `url(${img})`,
                        'backgroundPosition': 'center center',
                        'backgroundRepeat': 'no-repeat',
                        'backgroundSize': 'cover'
                      }"
                      class="image-reader-item"
                      @click.self="showView(index)"
                      v-for="(img, index) in imageList['reader1']">
                      <md-tag
                        @click.native="onDeleteImage('reader1', index)"
                        class="image-reader-item-del"
                        fill-color="#111A34"
                        font-color="#fff"
                        shape="quarter"
                        size="small"
                        type="fill"
                      >
                        <md-icon name="close"></md-icon>
                      </md-tag>
                    </li>
                    <li class="image-reader-item add">
                      <md-image-reader
                        @complete="onReaderComplete"
                        @error="onReaderError"
                        @select="onReaderSelect"
                        is-multiple
                        name="reader1"
                      ></md-image-reader>
                      <md-icon color="#CCC" name="camera" size="md"></md-icon>
                      <p>添加图片</p>
                    </li>
                  </ul>
                </div>
              </template>

            </div>
          </div>

          <div class="saleBtn" @click="releaseInfo">提交信息</div>
        </div>

      </md-scroll-view>
      <mbrandPicker @change="handleChange" :showBox="showBox" @input="handleBrandSelected"></mbrandPicker>
       <template>
         <md-image-viewer
           v-model="isViewerShow"
           :list="imageList['reader1']"
           :has-dots="true"
           :initial-index="viewerIndex">
         </md-image-viewer>
       </template>
    </div>
  </div>
</template>

<script>
    import {Icon, ImageReader, Tag, Toast} from 'mand-mobile'
    import imageProcessor from 'mand-mobile/components/image-reader/image-processor'

    export default {
        name: "Sale",
        components: {
            [Icon.name]: Icon,
            [ImageReader.name]: ImageReader,
            [Tag.name]: Tag,
        },
        data() {
            return {
                brandStrRes:'请选择' ,
                brandIdRes:[],
                accountId:'',  //登录账号，必须登录
                showBox:false,
                imageList: {
                    reader0: [
                        '//img-hxy021.didistatic.com/static/strategymis/insurancePlatform_spu/uploads/27fb7f097ca218d743f816836bc7ea4a',
                        '//manhattan.didistatic.com/static/manhattan/insurancePlatform_spu/uploads/c2912793a222eb24b606a582fd849ab7',
                    ],
                    reader1: [],
                },  //图片
                brandId:'',  //品牌id
                brandName:'', //品牌名字
                year:'',  //年份
                mileage:'', // 里程数
                lxName:'', //联系人姓名
                lxPhone: '', // 联系人电话
                imglist:[],
                txt: '',
                isViewerShow: false,
                viewerIndex:''
            }
        },
        methods: {
          showView(index){
            this.viewerIndex = index
            this.isViewerShow = true
          },
            onReaderSelect() {
                this.$toast.loading('图片读取中...')
            },
            // 图片选择读取完成
            onReaderComplete(name, {dataUrl,file } ) {
                const demoImageList = this.imageList[name] || [];
                imageProcessor({
                    dataUrl,
                    width: 200,
                    height: 200,
                    quality: 1,
                }).then(({dataUrl}) => {
                    // dataUrl && demoImageList.push(dataUrl);
                });
                const formData = new FormData();
                console.log(file)
                formData.append('file', file);
                this.doPost(formData);
                // this.$set(this.imageList, name, demoImageList);
                this.$toast.hide()
            },
            onReaderError(name, {msg}) {
                this.$toast.failed(msg)
            },
            // 删除图片
            onDeleteImage(name, index) {
                const demoImageList = this.imageList[name] || [];
                demoImageList.splice(index, 1);
                this.$set(this.imageList, name, demoImageList)
            },
            // 上傳圖片
            async doPost(formData) {
                formData.append('type', 'car');
                console.log(formData);
                const res = await this.$api.post('common/upload', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                const { success, data } = res.data;
                console.log(res);
                if (success) {
                    setTimeout(()=>{this.imageList.reader1.push(data)},800) ;
                    this.uprecent = 100;
                }
            },

          //  品牌变更
          handleChange(res){
            res = res.split(/\s+/);
              console.log('the 文字变化',res)
            this.brandStrRes = res[res.length-1]
            this.showBox= false
          },
            // 品牌选择
          handleBrandSelected(res){
              console.log('the 品牌被选择了',res)
            this.brandIdRes = res[res.length-1]
            this.showBox= false
          },
          closePicker(){
              // if( this.brandIdRes) return this.$toast.info('请选择车辆')
            this.showBox= false
          },
            // 发布车源信息
            async releaseInfo() {
                console.log('id',this.brandIdRes)
                console.log('brandName',this.brandStrRes)
                console.log('year',this.year)
                console.log('mileage',this.mileage)
                console.log('lxName',this.lxName)
                console.log('lxPhone',this.lxPhone)
                console.log('area',this.area)
                console.log('pic',this.imageList.reader1.toString())
                if(!this.$store.state.userInfo.phoneNum) return this.$toast.info('请先登录才能卖车哦');
                if(!this.brandIdRes) return this.$toast.info('请选择车辆品牌');
                if(!this.year) return this.$toast.info('请输入车辆年份');
                if(!this.mileage) return this.$toast.info('请输入车辆里程数');
                if(!this.lxName) return this.$toast.info('请输入联系人姓名');
                if(!this.lxPhone) return this.$toast.info('请输入联系人电话');
                if(!this.txt) return this.$toast.info('车辆描述');
                if(this.imageList.reader1.length==0) return this.$toast.info('请上传车辆图片');


                let res = await this.$api.post('/carSource/releaseInfo', {
                    type: 0,  //客户端为0
                    brandId: this.brandIdRes,
                    brandName: this.brandStrRes,
                    year: this.year,
                    mileage: this.mileage,
                    lxName: this.lxName,
                    lxPhone: this.lxPhone,
                    txt: this.txt,
                    pic:this.imageList.reader1.toString(),
                    source: 0,  // 客户端
                    state: 0,
                    accountId: this.$store.state.userInfo.phoneNum, // 发布人账号
                });
                let {success, info} = res.data;
                if (!success) return this.$toast.info(info);
                this.$toast.info(info);
                this.$router.go(-1);
            },
        },
    }
</script>

<style lang="scss" scoped>
  .mian {
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    background: #fff;
  }

  input::placeholder {
    color: #999;
  }

  .top {
    height: 96px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 36px;
    color: #333;
    font-weight: bold;
    position: relative;
    i{
      position: absolute;
      font-size: 30px;
      font-weight: bold;
      left: 20px;
      top: 50%;
      margin-top: -15px;
    }
  }

  .show {
    height: 0;
    flex-grow: 1;
  }

  .banner {
    height: 376px;
    background: url("../assets/banner.png") no-repeat center center;
    background-size: 100% 376px;
  }

  .content {
    padding: 0 24px;
  }

  .type {
    min-height: 100px;
    background: #f7f7f7;
    border-radius: 16px;
    margin-top: 40px;
    padding-bottom: 36px;
    .name {
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 36px 22px 0;
      line-height: 1;

      .txt {
        font-size: 28px;
        color: #666;
        font-weight: bold;
      }

      .cho {
        font-size: 28px;
        color: #999;

        i {
          font-size: 16px;
          margin-left: 8px;
          color: #999;
          font-weight: bold;
          position: static;
        }
      }
    }

    .list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;

      .item {
        text-align: center;
        width: 25%;

        .img {
          width: 96px;
          height: 96px;
          margin: 40px auto 0;
          border-radius: 50%;
        }

        .text {
          margin-top: 16px;
          color: #333;
          font-size: 28px;
          line-height: 1;
        }

        .img.dazhong {
          background: url("../assets/chebiao/2.png") no-repeat center center;
          background-size: 96px 96px;
        }

        .img.bentian {
          background: url("../assets/chebiao/4.png") no-repeat center center;
          background-size: 96px 96px;
        }

        .img.bieke {
          background: url("../assets/chebiao/1.png") no-repeat center center;
          background-size: 96px 96px;
        }

        .img.fengtian {
          background: url("../assets/chebiao/3.png") no-repeat center center;
          background-size: 96px 96px;
        }

        .img.baoma {
          background: url("../assets/chebiao/6.png") no-repeat center center;
          background-size: 96px 96px;
        }

        .img.benchi {
          background: url("../assets/chebiao/7.png") no-repeat center center;
          background-size: 96px 96px;
        }

        .img.xiandai {
          background: url("../assets/chebiao/8.png") no-repeat center center;
          background-size: 96px 96px;
        }

        .img.gengduo {
          background: url("../assets/chebiao/9.png") no-repeat center center;
          background-size: 96px 96px;
        }
      }

    }
  }

  .choItem {
    margin-top: 20px;
    height: 100px;
    border-radius: 16px;
    background: #f7f7f7;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 22px;

    .name {
      font-size: 28px;
      color: #666;
      font-weight: bold;
    }

    .input {
      display: flex;
      align-items: center;

      i {
        font-size: 16px;
        margin-left: 16px;
        font-weight: bold;
        color: #999;
        position: static;
      }

      input {
        background: rgba(0, 0, 0, 0);
        border: none;
        font-size: 28px;
        color: #666;
        height: 100px;
        line-height: 100px;
        text-align: right;
      }
    }
  }

  .choPic {
    margin-top: 20px;
    background: #f7f7f7;
    border-radius: 16px;
    padding: 22px 36px;

    .name {
      font-size: 28px;
      color: #666;
      font-weight: bold;
    }
  }
  .showModel{
    /*display: flex;*/
    /*align-items: flex-start;*/
    /*flex-wrap: wrap;*/
    textarea{
      width: 100%;
      height: auto;
      margin-top: 15px;
      background: #f7f7f7;
      resize: none;
      border: none;
      outline: none;
      font-size: 28px;
      color: #666;
    }
    .img{
      width: 196px;
      height: 196px;
      border-radius: 16px;
      margin-right: 20px;
      margin-top: 26px;
      box-sizing: border-box;
      background: #979797;
    }
    .img:nth-child(3n+3){
      margin-right: 0;
    }
    .img.upImg{
      position: relative;
      background: none;
      border: 1px dashed #999;
    }
    .img.upImg::before{
      content: '';
      width: 48px;
      height: 4px;
      border-radius: 2px;
      background: #979797;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
    }
    .img.upImg::after{
      content: '';
      width: 4px;
      height: 48px;
      border-radius: 2px;
      background: #979797;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
    }
  }

  .saleBtn {
    height: 100px;
    background: linear-gradient(206deg, rgba(255, 131, 131, 1) 0%, rgba(255, 76, 76, 1) 100%);
    border-radius: 54px;
    margin: 40px auto;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 32px;
  }


  .md-example-child-reader {
    overflow: hidden;
    margin-top: 26px;
    .image-reader-list {
      float: left;
      width: 100%;

      .image-reader-item {
        position: relative;
        float: left;
        width: 23.5%;
        padding-bottom: 23.5%;
        margin-bottom: 2%;
        margin-right: 2%;
        background: #FFF;
        box-shadow: 0 5px 20px rgba(197, 202, 213, .25);
        box-sizing: border-box;
        list-style: none;
        border-radius: 4px;
        background-size: cover;
        border-radius: 16px;
        overflow: hidden;
        /*&:nth-of-type(4n);*/
        /*margin-right: 0;*/
      }
      .image-reader-item:nth-child(4n+4) {
        margin-right: 0;
      }
    }
    .md-icon {
      position: absolute;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -50%);
      opacity: .5;
    }

    p {
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      margin-top: 15px;
      font-size: 22px;
      color: #CCC;
      text-align: center;
    }

    .image-reader-item-del {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 3;
      opacity: 1;
      .md-icon-close {
        font-size: 16px;
      }

    }
  }
</style>
