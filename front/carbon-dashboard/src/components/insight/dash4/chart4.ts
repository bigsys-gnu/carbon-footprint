import { defineComponent, h, PropType } from 'vue'

import { Bar } from 'vue-chartjs'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  Plugin
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default defineComponent({
  name: 'BarChart',
  components: {
    Bar
  },
  props: {
    chartId: {
      type: String,
      default: 'bar-chart'
    },
    width: {
      type: Number,
      default:10
    },
    height: {
      type: Number,
      default: 600
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
      type: Array as PropType<Plugin<'bar'>[]>,
      default: () => []
    },
    
  },
  setup(props) {
    const chartData = {
      labels: [
        '고정연소','이동연소','탈루배출','폐기물 처리시설','비료사용','폐기물','대학 동물 사육','산림에 의한 흡수','전력'
        
      ],
      datasets: [
        {
          label : 'Scope1',
          borderRadius:20,
          backgroundColor: ['#15575C','#62BC8A','#A0A0A0','#C7C5C5','#EAE7E7','#F1F1F1','#F1F1F1','#F1F1F1','#F1F1F1','#F1F1F1',],
          data: [142,132,120,100,75,60,42,30,20],
          barThickness: 20,
          padding:4,
        },
      ],
      indexAxis:'y'
    }

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins:{
        legend: {display: false} 
      },
      scales:{
        xAxes:{
          ticks:{
            padding:20
          },  
          grid:{
            display:false
          }

        },
        yAxes:{
          grid:{
            display:false
          },
        },
      },
      indexAxis:'y' as const,
    }

    return () =>
      h(Bar, {
        chartData,
        chartOptions,
        chartId: props.chartId,
        width: props.width,
        height: props.height,
        cssClasses: props.cssClasses,
        styles: props.styles,
        plugins: props.plugins,
      })
  }
})
