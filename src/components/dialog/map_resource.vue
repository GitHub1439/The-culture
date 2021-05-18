<template>
  <div>
      <div v-if="resource.resourceFormatIdFk == 6">
          <video
      controlslist="nodownload"
      controls="controls"
      style="width:100%; height: 100%;"
      autoplay
      muted
      :src="resource.resourceAddr"
    ></video>
      </div>
      <div v-if="resource.resourceFormatIdFk == 7">
         <audio controls style="width: 80%; margin-top: 100px">
      <source :src="resource.resourceAddr" />
    </audio>
      </div>
       <div v-else-if="resource.resourceFormatIdFk == 8">
            <img style="width:400px;height:400px" :src="resource.resourceAddr" alt="">
      </div>
         <div v-else-if="resource.resourceFormatIdFk >=1 && resource.resourceFormatIdFk <=5">
            <c_pdf
        ref="pdf"
        :resourceAddr="resource.resourceAddr"
      ></c_pdf>
      </div>
      <div v-else>
                <img src="../../assets/img/map/unSee.png" alt="">
      </div>


  </div>
</template>
<script>
import c_pdf from "../Dialog2/pdf";
export default {
    watch:{
       obj:{
            immediate:true,
     handler:function(a,b){
       if(this.obj){
         console.log(this.obj)
         this.resource= this.obj;
         console.log(this.resource)
       }
     }
           
       } 
    },
    mounted(){
        
        this.resource = {...this.obj}
        
    },
    components: {
    c_pdf,
  },
  props: {
  obj: {
    type: Object,
    require: true
  }
},
  data() {
    return {
        resource:{}
    };
  },
};
</script>
<style lang="less" scoped>
</style>
