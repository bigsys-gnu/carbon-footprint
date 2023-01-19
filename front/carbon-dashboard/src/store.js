//vuex 설정 파일 
import { createStore } from "vuex";
import axios from "axios";
import VueCookies from 'vue-cookies';
import createPersistedState from 'vuex-persistedstate';

var today = new Date(); 

export default createStore({
    plugins: [
        createPersistedState({
          storage: window.sessionStorage, // store를 session storage에 유지
        })
    ],
    state: {
        EditGroups : false,
        GroupPreview : false,
        EditTable : false,
        insight_month : today.getMonth(),
        insight_year : today.getFullYear(), 
        detail_emission: [0,0,0,0,0,0,0,0,0,0,0,0,0],
        table:[],    //로컬 저장소 
        total_table:[], //저장 필요
        table_category:[],
        selected_row:"",
        table_kind:"",
        group_name: "", //저장 필요
        //토큰 관련 
        accessToken: null,
        refreshToken: null,
        infopage:false,
    }
    //state 데이터 호출후 상태 가공하여 전달 
    ,getters:{
        getToken (state) {
            let ac = VueCookies.get('accessToken');
            let rf = VueCookies.get('refreshToken');
            return {        
              access: ac,
              refresh: rf
            };
        }
    } 
    //상태 접근 (변경)
    ,mutations:{
        OnEdit(state){
            state.EditGroups = true;
        },
        OffEdit(state){
            state.EditGroups = false;
        },
        OnGroupPreview(state,corrent){
            state.GroupPreview = corrent;
        },
        OffGroupPreview(state){
            state.GroupPreview = false;
        },
        OnGroupInfo(state){
            state.infopage = true
        },
        OffGroupInfo(state){
            state.infopage = false
        },

        InsightAddM(state,change){
            state.insight_month =state.insight_month+change;
            if(state.insight_month == -1){
                state.insight_month=11
                state.insight_year=state.insight_year-1
            }else if(state.insight_month == 12){
                state.insight_month=0
                state.insight_year=state.insight_year+1
            }
        },
        InsightAddY(state,change){
            state.insight_year =state.insight_year+change;
        },
        SetDetailEmission(state,arr){
            state.detail_emission = arr
        },
        //테이블 관련
        SetTableKind(state,change){
            state.table_kind = change
        },
        SetTableContent(state,arr){
            state.table.unshift(arr)
            console.log("테이블 추가",state.table[0].category)
        },
        DelTableContent(state,remove){
            for(let i=0; i<remove.length; i++){
                console.log('삭제',remove[i].data)
                state.table = state.table.filter((element) =>
                                                element.content != remove[i].content ||
                                                element.data != remove[i].data ||
                                                element.emissions != remove[i].emissions ||
                                                element.StartDate != remove[i].StartDate ||
                                                element.EndDate != remove[i].EndDate ||
                                                element.scope != remove[i].scope
                                            )
            }    
            
            // console.log(remove)
        },
        
        //total_ta
        SetTotalTableContent(state,arr){
            state.total_table.unshift(arr)
        },
        DelTotalTableContent(state,remove){
            for(let i=0; i<remove.length; i++){
                console.log('삭제',remove[i].data)
                state.total_table = state.total_table.filter((element) =>
                                                element.content != remove[i].content ||
                                                element.data != remove[i].data ||
                                                element.emissions != remove[i].emissions ||
                                                element.StartDate != remove[i].StartDate ||
                                                element.EndDate != remove[i].EndDate ||
                                                element.scope != remove[i].scope
                                            )
            }
        },
        
        ResetTable(state){
            state.table=[]
        },
        SetEditDelet(state){
            console.log('수정창 닫힘')
            state.EditTable = false
        },
        SetEditOpen(state,selected){
            console.log('수정창 열림')
            state.EditTable = true
            state.selected_row = selected
        },
        SetName(state,change){
            state.group_name = change
        },
        //토큰 관련 
        loginToken (state, payload){
            state.accessToken = payload;
            state.refreshToken = payload;
        },
        refreshToken(state, payload) { //accessToken 재셋팅
          VueCookies.set('accessToken', payload.accessToken, '60s');
          VueCookies.set('refreshToken', payload.refreshToken, '1h');
          state.accessToken = payload;
        },
        removeToken () {
          VueCookies.remove('accessToken');
          VueCookies.remove('refreshToken');
        },
    },
    //전처리 후 Mutations에 데이터 전달
    actions:{
        login: ({commit}, params) => {
            return axios.post('/User/Login', params).then(res => {
                    commit('loginToken', res.data.auth_info);
                })
                .catch(err => {
                    console.log(err.message);

                });
        },

        refreshToken: ({commit}) => { // accessToken 재요청
        //accessToken 만료로 재발급 후 재요청시 비동기처리로는 제대로 처리가 안되서 promise로 처리함
        return new Promise((resolve, reject) => {
            axios.post('/v1/auth/certify').then(res => {
                commit('refreshToken', res.data.auth_info);
                resolve(res.data.auth_info);
                }).catch(err => {
                console.log('refreshToken error : ', err.config);
                reject(err.config.data);
            })
        })
        },
        logout: ({commit}) => { // 로그아웃
            commit('removeToken');
            location.reload();
        }
    },
    //상태 모듈화
    modules:{

    }
});


// 참고 링크
//https://velog.io/@latte_h/Vue3-Guide-12-Vuex