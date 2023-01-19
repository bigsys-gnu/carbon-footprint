<template>
    <div class="dashboard" id="dashboard2">
      <chart2 style="width:inherit; height: inherit; "></chart2>
    </div>
</template>
<style>
    #dashboard2{
        background-color:transparent;
        float: left;
        width: 76vw;
        height: 55vh;
        padding: 2%;
        margin-top:3vh;
        border: none;
    }
</style>
<script>
import chart2 from './chart2';
  export default {
      name :"dashboard_3",
      components:{
        chart2
      },
      data() {
        return{
          
        }

      }
  }
</script>