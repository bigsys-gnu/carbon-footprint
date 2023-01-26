<!--탄소 배출 내용 입력의 고정연소 부분 -->
<template>
    <div style="color:black;">입력방식
            <label><input class="radio_btn" type="radio" name="methodRegist" value="직접 입력하기" checked>직접 입력하기</label>
            <label><input class="radio_btn" type="radio" name="methodRegist" value="엑셀 등록하기">엑셀 등록하기</label>
    </div>
    <div style="margin-top:50px; ">
        탄소 배출 내용<br>
        <input type="text" class="addInfo_input" id="carbon_emissions_content">
    </div> 
    <div style="margin-top:30px">기간 설정
        <input class = "date_btn" id = "start_data" type="month" data-placeholder="시작 날짜" required aria-required="true">
        <input class = "date_btn" id = "end_data" type="month">
    </div>
    <div style="margin-top:4vh">구분</div>
    <div class="add_info_divide" id="building_name_text" style="margin-top:2vh">건물명 / 배출 시설명
        <input type="text" class="addInfo_input" id ="building_name_input" placeholder="본관">
    </div>
    <div class="add_info_divide">설비명
        <select v-model="main_agent" class="addInfo_input" id="facility_name_input">
            <option value="기업">기업 소유 및 운영</option>
            <option value="민간">민간 임차</option>
        </select>
        
    </div>
    <div class="add_info_divide">연료정보
        <select v-model="unit_s" class="addInfo_input" id="fuel_info">
            <option v-for = "fule in fule_info_list" :value="fule.unit">{{fule.name}}</option>
        </select>
    </div>
    <div class="add_info_divide" >연료량
        <input class="addInfo_input" id="amount_fuel" placeholder="12,456">
        <select class="addInfo_input" id="power_usage_drop" v-if="unit_s=='kg'">
            <option value="0">kg</option>
        </select>
        <select class="addInfo_input" id="power_usage_drop" v-else-if="unit_s=='L'">
            <option value="1">L</option>
        </select>
        <select class="addInfo_input" id="power_usage_drop" v-else-if="unit_s=='Nm^3'">
            <option value="2">Nm^3</option>
        </select>
        <select class="addInfo_input" id="power_usage_drop" v-else-if="unit_s=='kWh'">
            <option value="3">kWh</option>
        </select>
        
    </div>
    <button class ="input2_regi_btn" id="add_info_regi_btn" @click="click_regi_btn(unit_s)">상단 정보 등록</button>
</template>

<style>
    #building_name_input{
        margin-top:0px;
        width:20%;
        background: #ffffff;
        border: 1px solid #DDE2E5;
        margin-left: 20px;
    }

    #facility_name_input{
        width: 20%;
        margin-left: 110px;
        color: #727374
        
    }

    #fuel_info{
        width: 20%;
        margin-left: 96px;
        color: #727374
    }
    
    #amount_fuel{
        margin-left:110px;
        width:14%;
        background: #ffffff;
        border: 1px solid #DDE2E5;
    }

   
</style>

<script>
import {useStore} from 'vuex'
import {ref, computed} from 'vue'
    export default {
        name :"stationary_combustion",
        setup(){
            const store = useStore()
            var unit_s = ref('kg')
            var main_agent = ref('기업')
            var fule_info_list = ref([
                    {index:1, name: '원유', unit:'kg'},
                    {index:2, name: '휘발유' ,unit:'L'},
                    {index:3, name: '실내 등유' ,unit:'L'},
                    {index:4, name: '보일러 등유' ,unit:'L'},
                    {index:5, name: '경유' ,unit:'L'},
                    {index:6, name: 'B-A유' ,unit:'L'},
                    {index:7, name: 'B-B유' ,unit:'L'},
                    {index:8, name: 'B-C유' ,unit:'L'},
                    {index:9, name: '프로판', unit:'kg'},
                    {index:10, name: '부탄', unit:'kg'},
                    {index:11, name: '나프타',unit:'L'},
                    {index:12, name: '용제',unit:'L'},
                    {index:13, name: '항공유',unit:'L'},
                    {index:14, name: '아스팔트',unit:'kg'},
                    {index:15, name: '윤활유',unit:'L'},
                    {index:16, name: '석유코크',unit:'kg'},
                    {index:17, name: '부생연료 1호',unit:'L'},
                    {index:18, name: '부생연료 2호',unit:'L'},
                    {index:19, name: '천연가스(LNG)',unit:'kg'},
                    {index:20, name: '도시가스(LNG)',unit:'Nm^3'},
                    {index:21, name: '도시가스(LPG)',unit:'Nm^3'},
                    {index:22, name: '국내무연탄',unit:'kg'},
                    {index:23, name: '수입무연탄(연료용)',unit:'kg'},
                    {index:24, name: '수입무연탄(원료용)',unit:'kg'},
                    {index:25, name: '유연탄(연료용)',unit:'kg'},
                    {index:26, name: '아역청탄',unit:'kg'},
                    {index:27, name: '코크스',unit:'kg'},
                    {index:28, name: '전기(발전기준)',unit:'kWh'},
                    {index:29, name: '전기(소비기준)',unit:'kWh'},
                    {index:30, name: '신탄',unit:'kWh'},
                ])
                function click_regi_btn(unit_s){
                    var info_list = {content:"",data:"",emissions:"",StartDate:"",EndDate:"",scope:1,category:"0",unit:unit_s}
                    var usage_input = document.getElementById('amount_fuel').value
                    info_list.content = document.getElementById('carbon_emissions_content').value
                    info_list.data =  usage_input+"/"+unit_s
                    info_list.emissions = usage_input+4
                    info_list.StartDate = document.getElementById('start_data').value+'-01'
                    info_list.EndDate = document.getElementById('end_data').value+'-01'
                    if(main_agent.value == '기업'){
                        info_list.scope = 1
                    }
                    else if(main_agent.value == "민간"){
                        info_list.scope =2
                    }
                    store.commit("SetTableContent",info_list)
                    
                }
                return{
                    unit_s,
                    main_agent,
                    fule_info_list,
                    click_regi_btn
                }
        },
    }
</script>