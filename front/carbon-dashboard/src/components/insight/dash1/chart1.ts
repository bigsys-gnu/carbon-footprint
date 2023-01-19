import { defineComponent, h, PropType } from 'vue'
import axios from "axios";
import { Doughnut } from 'vue-chartjs'
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
  setup(props) {
    const chartData = {
      labels: ['Scope1','Scope2','Scope3'],
      datasets: [
        {
          backgroundColor: ['#E0F599', '#62BC8A','#15575C'], 
          data: [1],
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
      await axios.get("/Company/Preview/samsung/2023-0"+month.value+"-01/2023-0"+month.value+"-31",config).then(res => {

      })
      .catch(error => {
          console.log(error)
          console.log("chartjs1 err")
      })
      .finally(() => {
      })
    }
    get_list()
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
  }
})