<!--탄소 배출 내용 입력의 전력 사용 부분 -->
<template>
    <div>
        <div style="color:black;">입력방식
            <label><input class="radio_btn" type="radio" name="methodRegist" value="0" checked v-model="input_regi">직접 입력하기</label>
            <label><input class="radio_btn" type="radio" name="methodRegist" value="1" v-model="input_regi">엑셀 등록하기</label>
            <label><input class="radio_btn" type="radio" name="methodRegist" value="2" v-model="input_regi">자동 연동하기</label>
        </div>
        <div v-if="input_regi == 0">
            <div style="margin-top:50px;">
            탄소 배출 내용<br>
            <input type="text" class="addInfo_input" id="carbon_emissions_content">
            </div> 
            <div style="margin-top:30px">기간 설정
                <input class = "date_btn" id = "start_data" type="date" data-placeholder="시작 날짜" required aria-required="true">
                <input class = "date_btn" id = "end_data" type="date">
            </div>
            <div style="margin-top:4vh">구분</div>
            <div class="add_info_divide" id="building_name_text" style="margin-top:2vh">건물명 / 배출 시설명
                <input type="text" class="addInfo_input" id ="building_name_input" placeholder="경상대 본관">
            </div>
            
            <div class="add_info_divide">운영주체
                <select v-model="main_agent" class="addInfo_input" id="operating_entity_input">
                    <option value="기업">기업 소유 및 운영</option>
                    <option value="민간">민간 임차</option>
                </select>
                
            </div>
            <div class="add_info_divide">공급처
                <select class="addInfo_input" id="supplier_drop">
                    <option value="0">한국전력공사</option>
                    <option value="1">직접 입력</option>
                </select>
            </div>
            <div class="add_info_divide" >전력 사용량
                <input class="addInfo_input" id="usage_input" placeholder="12,456">
                <select v-model="unit_s" class="addInfo_input" id="power_usage_drop">
                    <option value="kwh">kwh</option>
                    <option value="wh">wh</option>
                </select>
            </div>
        </div>
        <div v-else-if="input_regi == 1">

        </div>
        <div v-else-if="input_regi == 2">
            <Power_usage_autoVue></Power_usage_autoVue>
        </div>
    </div>
    <button class ="input2_regi_btn" id="add_info_regi_btn" @click="click_regi_btn(unit_s)">상단 정보 등록</button>
</template>

<style>
    #add_info{
        margin-top: 0px;
        border: 0px;
    }

    .radio_btn{
        margin-left:60px; 
    }
    .addInfo_input{
        width: 80%;
        height: 40px;
        margin-top: 20px;
        background: #F6F7FB;
        border: 0px;
        border-radius: 7px;
    }
    #carbon_emissions_content{
        height:35px;
    }
    .addInfo_input:focus{
        outline: none;
    }
    .add_info_divide{
        margin-top: 20px;
        font-size: 14px;
    }
    .date_btn{
        width: 150px;
        margin-left: 60px;
        height: 40px;
        background: #F6F7FB;
        border: 0px;
        border-radius: 7px;
        color: #727374;
        padding-inline-start: 1%;
        padding-inline-end: 1%;
        content: attr(data-placeholder);
    }
    .date_btn:focus{
        outline:none;
    }

    #building_name_input{
        margin-top:0px;
        width:20%;
        background: #ffffff;
        border: 1px solid #DDE2E5;
        margin-left: 20px;
    }

    #operating_entity_input{
        width: 20%;
        margin-left: 95px;
        color: #727374
        
    }

    #supplier_drop{
        width: 20%;
        margin-left: 110px;
        color: #727374
    }
    
    #usage_input{
        margin-left:75px;
        width:14%;
        background: #ffffff;
        border: 1px solid #DDE2E5;
    }

    #power_usage_drop{
        width: 4.6%;
        margin-left: 1%;
        color: #727374;
        margin-bottom: 20px;
    }

   
</style>

<script>
import Power_usage_autoVue from './Power_usage_auto.vue';
import {useStore} from 'vuex'
import {ref,computed} from 'vue'

    export default {
        name :"power_usage",
        components:{ 
            Power_usage_autoVue
        },
        setup(){
            const store = useStore()

            var main_agent = ref('기업')
            var unit_s = ref('kwh')
            var input_regi = ref(0)
            function click_regi_btn(unit_s){
                var info_list={content:"",data:"",emissions:"",StartDate:"",EndDate:"",scope:"",category:"0"}
                var usage_input = document.getElementById('usage_input').value
                info_list.content = document.getElementById('carbon_emissions_content').value
                info_list.data =  usage_input+unit_s
                info_list.emissions = usage_input + 4 + "kg" //계산식
                info_list.StartDate = document.getElementById('start_data').value
                info_list.EndDate = document.getElementById('end_data').value
            
                if(main_agent.value == '기업'){
                    info_list.scope = 'Scope1'
                }
                else if(main_agent.value == "민간"){
                    info_list.scope = 'Scope2'
                }
                store.commit("SetTableContent",info_list)
            }
            
            return{
                unit_s,
                main_agent,
                input_regi,
                click_regi_btn
            }
        }
    }
</script>