<!--폐기물 처리 시설 (생물학적 처리) -->
<template>
    <div>
        <div class="edit_top ">
            <span class="edit_category">폐수 처리시설(생물학적 처리) 정보 추가하기</span>
            <button class="del_edit_btn" @click="click_del_editPopup()">x</button>
        </div>
        <div style="background:#ffffff; padding:3vh; width:25vw; height:70vh; font-size:1.8vh; overflow:auto">
            <div>
                <div style="color:#000000; ">
                탄소 배출 내용<br>   
                <textarea class="addInfo_input" id="carbon_emissions_content_bio" rows="8" style="height:12vh; width:25vw"></textarea>
                </div> 
                <div style="margin-top:30px; width:25vw">처리날짜<br>
                    <input class = "date_btn" id = "start_data" type="date" data-placeholder="시작 날짜" required aria-required="true" style="margin-top:2vh; margin-left:0px; height:3.5vh">
                    <input class = "date_btn" id = "end_data" type="date" style="margin-left:3vw; height:3.5vh">
                </div>
                <div class="add_info_divide" style="font-size:1.8vh">처리 용량
                    <input class="addInfo_input" id="waste_usage_input" placeholder="12,456" style="width:8.5vw; height:3.5vh">
                    <select class="addInfo_input" id="steam_usage_drop" style="width:3vw; height:3.5vh">
                        <option value="0">m^3</option>
                    </select>
                </div>
                <div class="add_info_divide" style="font-size:1.8vh; margin-top:0">처리방식
                    <select class="addInfo_input" id="supplier_drop_steam" style="width:11.5vw; height:3.5vh">
                        <option value="0">사료화 퇴비화</option>
                        <option value="1">혐기성 소화</option>
                    </select>
                </div>
                <div class="add_info_divide" style="font-size:1.8vh">처리유형
                    <select class="addInfo_input" id="supplier_drop_steam" style="width:11.5vw; height:3.5vh">
                        <option value="0">건량</option>
                        <option value="1">습량</option>
                        <option value="2">모름</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="edit_bottom" style="font-size:1.5vh">
            <button class="edit_regi_btn" id="edit_regi" @click="click_edit_btn()">수정하기</button>
            <button class="edit_regi_btn" id="edit_cancle" @click="click_del_editPopup()">취소</button>
        </div>
    </div>

</template>

<style>

    #supplier_drop_steam{
        width: 20%;
        margin-left: 90px;
        color: #727374
    }

    #waste_usage_input{
        margin-left:85px;
        width:14%;
        background: #ffffff;
        border: 1px solid #DDE2E5;
    }

    #steam_usage_drop{
        width: 4.6%;
        margin-left: 1%;
        color: #727374;
        margin-bottom: 20px;
    }

   
</style>

<script>
import {useStore} from 'vuex'
import {ref, computed} from 'vue'

    export default {
        name :"waste_disposal_biological",
        setup(){
            var selected = computed(()=>store.state.selected_row);
            const store = useStore()
            function click_edit_btn(){
                var info_list = {content:"",data:"",emissions:"",StartDate:"",EndDate:"",scope:"Scope1",category:"13"}
                var usage_input = document.getElementById('waste_usage_input').value
                info_list.content = document.getElementById('carbon_emissions_content_bio').value
                info_list.data =  usage_input+"ton"
                info_list.emissions = usage_input+4
                info_list.StartDate = document.getElementById('start_data').value
                info_list.EndDate = document.getElementById('end_data').value
                
                var table = computed(() => store.state.table_kind)
                console.log("테이블 종류",table)
                if(table.value == 'total_table'){
                    store.commit("SetTotalTableContent",info_list);
                    store.commit('DelTotalTableContent',selected.value);
                }
                else if(table.value == 'table'){
                    store.commit("SetTableContent",info_list);
                    store.commit('DelTableContent',selected.value);
                }
                store.commit("SetEditDelet");
            }
            
            function click_del_editPopup(){
                console.log('수정창 닫기')
                store.commit("SetEditDelet");
            }
            return {
                click_edit_btn,
                click_del_editPopup
            }
        }
    }
</script>