import { defineComponent, h, PropType  } from 'vue'
import axios from "axios";
import { Doughnut } from 'vue-chartjs'
import { useRouter } from "vue-router";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  Plugin
} from 'chart.js'
import { useStore } from "vuex";
import { computed,ref } from "vue";
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

export default defineComponent({
  name: 'DoughnutChart',
  components: {
    Doughnut
  },
  props: {
    chartId: {
      type: String,
      default: 'doughnut-chart'
    },
    width: {
      type: Number,
      default: 50
    },
    height: {
      type: Number,
      default: 50
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object as PropType<Partial<CSSStyleDeclaration>>,
      default: () => {}
    },
    plugins: {
      type: Array as PropType<Plugin<'doughnut'>[]>,
      default: () => []
      
    }
  },
  async setup(props, { expose }) {
    
    var chartData = {
      labels: ['Scope1','Scope2','Scope3'],
      datasets: [
        {
          backgroundColor: ['#E0F599', '#62BC8A','#15575C'], 
          data: [61.63064, 20,14],
          cutout:0,
          borderWidth:0
        }
      ]
    }

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins:{
        legend: {
          position:'right' as const,
          labels : {
            usePointStyle: true,
            padding:12,
            boxWidth:100,
            boxHeight:20,
          }
        }
      },
    }
    
    const router = useRouter();
    //chart js 의 props 충돌 때문에 api 2번 호출로 설정 -> 수정되면 props 사용 권장
    const store = useStore();
    var month = ref(computed(() => store.state.insight_month+1));
    var year = computed(() => store.state.insight_year);
    const config = {
      headers:{
        Authorization:"Bearer"+" "+store.state.accessToken,
        "Content-Type": "text/html; charset=utf-8",
      }
    }
    async function get_list(){
      await axios.get("/Company/Preview/samsung/2023-"+month.value+"-01/2023-"+month.value+"-28",config).then(res => {
        //모든 scope가 0이면 그래프가 그려지지 않으므로 디폴트 값 지정 
        if(!res.data.Scopes.reduce((a, b) => a + b, 0)){
          chartData.datasets[0].data = [1,1,3]
        }else{
          chartData.datasets[0].data =res.data.Scopes
        }
        
        return res.data.Scopes[0]
      })
      .catch(error => {
          console.log(error)
          router.push('/');
      })
      .finally(() => {
        
      })
    }
    await get_list()
    return () =>
      h(Doughnut, {
        chartData,
        chartOptions,
        chartId: props.chartId,
        width: props.width,
        height: props.height,
        cssClasses: props.cssClasses,
        styles: props.styles,
        plugins: props.plugins
      })
      
  },
  created(){
    //this.$forceUpdate();
    
  },   
})