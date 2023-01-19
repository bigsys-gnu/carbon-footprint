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
        '2021년','2022년','2023년'
      ],
      datasets: [
        {
          label : 'Scope1',
          backgroundColor: ['#E0F599'],
          data: [210000,210000,210000],
          barThickness: 50,
        },
        {
          label : 'Scope2',
          backgroundColor: ['#62BC8A'],
          data: [1300000,1000200,420123],
          barThickness: 50,
        },
        {
          label : 'Scope3',
          backgroundColor: ['#15575C'],
          data: [420123,850000,123000],
          barThickness: 50,
        }
      ],
      
    }

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins:{
        legend: {
          position:'right' as const,
          align	: 'start' as const,
          labels : {
            padding: 40,
            boxWidth:25,
            boxHeight:25,
            color:'#223354'
          }

        },
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
