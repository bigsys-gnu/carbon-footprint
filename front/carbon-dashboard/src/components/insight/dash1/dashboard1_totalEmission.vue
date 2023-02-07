<template>
    <div style="float:left; margin-left:3.5vw">
        <div class="dash_title" >전체 배출량</div>
        <div class="dashboard" id="dashboard1_total">
            <div style ="font-size: 2vh; font-weight: bolder; color: #595959; text-align: center;">
                <!-- 회사명(ex:경상대학교) -->
                <span>총배출량</span><br>
                <span style ="color:#163945;; font-weight:bold; font-size: 4.8vh; margin-top: 0.5vh; margin-bottom:0.5vh">{{scope1+scope2+scope3}}</span><br>
                <span style="font-size:1.5vh; color:black">kg CO2eq</span>
            </div>
        </div>
    </div>
    
</template>

<style>
    #dashboard1_total{
        height: 12vh;
        width: 19vw;
        padding: 7%;
    }
</style>

<script>
  export default {
      name :"dashboard1",
      components:{
      },
      data() {
        return{
            total_emssion: '1,241',
        }
      },
      props:{
        scope1:Number,
        scope2:Number,
        scope3:Number
      }
  }
</script>
  