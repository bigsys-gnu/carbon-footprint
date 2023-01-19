<!--탄소 배출 내용 입력의 대학 소유 동물 부분 -->
<template>
    <div>
        <div style="color:black;">입력방식
            <label><input class="radio_btn" type="radio" name="methodRegist" value="직접 입력하기" checked>직접 입력하기</label>
            <label><input class="radio_btn" type="radio" name="methodRegist" value="엑셀 등록하기">엑셀 등록하기</label>
        </div>
        <div style="margin-top:50px; ">
            탄소 배출 내용<br>
            <input type="text" class="addInfo_input" id="carbon_emissions_content">
        </div> 
        <div style="margin-top:30px">기간 설정
            <input class = "date_btn" id = "start_data" type="date" data-placeholder="시작 날짜" required aria-required="true">
            <input class = "date_btn" id = "end_data" type="date">
        </div>
        <div style="margin-top:4vh">구분</div>
        <div class="add_info_divide" id="building_name_text" style="margin-top:2vh">동물 사육 위치
            <input type="text" class="addInfo_input" id ="building_name_input" placeholder="본관 앞 마당" style="margin-left:40px">
        </div>
        <div class="add_info_divide">동물 관리 방법
            <select class="addInfo_input" id="operating_entity_input" style="margin-left:40px">
                <option  v-for="animal in animal_care_list" :aria-busy="animal">{{animal}}</option>
            </select>
            
        </div>
        <div class="add_info_divide">가축 유형
            <select class="addInfo_input" id="supplier_drop" style="margin-left:70px">
                <option v-for="animal in animal_list" :value="animal">{{animal}}</option>
            </select>
        </div>
        <div class="add_info_divide" >사육두수
            <input class="addInfo_input" id="usage_input" placeholder="12">
            <select class="addInfo_input" id="power_usage_drop">
                <option value="0">마리</option>
            </select>
        </div>
        <button class ="input2_regi_btn" id="add_info_regi_btn" @click="click_regi_btn()">상단 정보 등록</button>  

    </div>
    
   
    
</template>

<style>
    #add_info_regi_btn{
            margin-top:6vh;
            background:#3DC984;
            border: none;
            color: #ffffff;
            margin-left: 35vw;
            margin-bottom: 20px;
    }
    #add_info_regi_btn:hover{
        background:#2cb570;
    }   
</style>

<script>
import { useStore } from "vuex"
import {computed ,ref} from "vue"

    export default {
        name :"power_usage",
        setup(){
            const store = useStore()
            
            var animal_list = [
                    '젖소-육성우',
                    '젖소-착유우',
                    '한육우-송아지',
                    '한육우-번식우',
                    '한육우-비육우',
                    '돼지',
                    '닭-산란계',
                    '닭-육계',
                    '닭-기타 닭',
                    '면양',
                    '산양',
                    '말',
                    '칠면조',
                    '오리',
                    '사슴',
                    '토끼',
                    '거위'
                ]
            var animal_care_list = [
                '혐기성 늪',
                '액체/슬러리',
                '고체 저장',
                '건조 부지',
                '목장/방목',
                '일일 살포',
                '소화조',
                '연료로 사용'
            ]
            //
            function click_regi_btn(){
                var info_list = {content:"",data:"",emissions:"",StartDate:"",EndDate:"",scope:"Scope1",category:"8"}

                var usage_input = document.getElementById('usage_input').value
                info_list.content = document.getElementById('carbon_emissions_content').value
                info_list.data = document.getElementById('usage_input').value+"마리"
                info_list.emissions= usage_input+4
                info_list.StartDate = document.getElementById('start_data').value
                info_list.EndDate = document.getElementById('end_data').value

                console.log(info_list)
                store.commit("SetTableContent",info_list)
            }
            return{animal_list,animal_care_list,click_regi_btn}
        },
        mounted(){
        }
    }
</script>