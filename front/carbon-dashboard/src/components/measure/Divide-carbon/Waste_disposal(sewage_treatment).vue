<!--폐기물 처리 시설(하수 처리)  -->
<template>
    <div style="color:black;">입력방식
            <label><input class="radio_btn" type="radio" name="methodRegist" value="직접 입력하기" checked>직접 입력하기</label>
            <label><input class="radio_btn" type="radio" name="methodRegist" value="엑셀 등록하기">엑셀 등록하기</label>
    </div>
    <div style="margin-top:50px; ">
        탄소 배출 내용<br>
        <input type="text" class="addInfo_input" id="carbon_emissions_content">
    </div> 
    <div class="add_info_divide" id="building_name_text" style="margin-top:4vh">시설명/위치
        <input type="text" class="addInfo_input" id ="building_name_input" placeholder="성남시" style="margin-left:130px;">
    </div>
    <div style="margin-top:30px">처리 날짜
        <input class = "date_btn" id = "start_data" type="date" data-placeholder="시작 날짜" required aria-required="true" style="margin-left:136px;">
        <input class = "date_btn" id = "end_data" type="date">
    </div>
    <div class="add_info_divide" style="float:left; width:600px;">하수 처리량
        <input class="addInfo_input" id="steam_usage_input" placeholder="12,456" style="margin-left:132px; width:200px; margin-right:10px">
        <select class="addInfo_input" id="steam_usage_drop" style="width:4vw">
            <option value="0">m^3/1일</option>
        </select>
    </div>
    <div class="add_info_divide" style=" width:200x;">메탄회수량
        <input class="addInfo_input" id="steam_usage_input" placeholder="12,456" style="width:200px; margin-left:140px; margin-right:10px">
        <select class="addInfo_input" id="steam_usage_drop" style="width:3.5vw; margin-left:0.2vw">
            <option value="0">ton</option>
        </select>
    </div>
    <div class="add_info_divide" style="float:left; width:600px;">유입 산소 요구량 농도(BOD)
        <input class="addInfo_input" id="steam_usage_input" placeholder="12,456" style="width:200px; margin-left:30px; margin-right:10px">
        <select class="addInfo_input" id="steam_usage_drop" style="width:3.5vw">
            <option value="0">mg/L</option>
        </select>
    </div>
    <div class="add_info_divide" >유출 산소 요구량 농도(BOD)
        <input class="addInfo_input" id="steam_usage_input" placeholder="12,456" style="width:200px; margin-left:30px">
        <select class="addInfo_input" id="steam_usage_drop" style="width:3.5vw">
            <option value="0">mg/L</option>
        </select>
    </div>
    <div class="add_info_divide" style="float:left; width:600px">유입 질소 요구량 농도(BOD)
        <input class="addInfo_input" id="steam_usage_input" placeholder="12,456" style="width:200px; margin-left:30px; margin-right:10px">
        <select class="addInfo_input" id="steam_usage_drop" style="width:3.5vw">
            <option value="0">mg/L</option>
        </select>
    </div>
    <div class="add_info_divide"  >유출 질소 요구량 농도(BOD)
        <input class="addInfo_input" id="steam_usage_input" placeholder="12,456" style="width:200px; margin-left:30px;">
        <select class="addInfo_input" id="steam_usage_drop" style="width:3.5vw">
            <option value="0">mg/L</option>
        </select>
    </div>
    <button class ="input2_regi_btn" id="add_info_regi_btn" @click="click_regi_btn()">상단 정보 등록</button>

</template>

<style>

    #supplier_drop_steam{
        width: 20%;
        margin-left: 90px;
        color: #727374
    }

    #steam_usage_input{
        margin-left:90px;
        width:14%;
        background: #ffffff;
        border: 1px solid #DDE2E5;
    }

    #steam_usage_drop{
        width:50px;
        margin-left: 1%;
        color: #727374;
        margin-bottom: 20px;
    }

   
</style>

<script>
import {useStore} from 'vuex'
import {ref} from 'vue'

    export default {
        name :"waste_disposal_sewage",
        setup(){
            const store = useStore()
            function click_regi_btn(){
                var info_list = {content:"",data:"",emissions:"",StartDate:"",EndDate:"",scope:"Scope1",category:"12"}
                var usage_input = document.getElementById('steam_usage_input').value
                info_list.content = document.getElementById('carbon_emissions_content').value
                info_list.data =  usage_input+"ton"
                info_list.emissions = usage_input+4
                info_list.StartDate = document.getElementById('start_data').value
                info_list.EndDate = document.getElementById('end_data').value

                store.commit("SetTableContent",info_list)
            }
            return{
                click_regi_btn
            }
        }
    }
</script>