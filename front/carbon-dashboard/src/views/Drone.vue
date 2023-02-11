<template>
    <div class="zaju">
        <div class="map">
            <GoogleMap api-key="AIzaSyDySGMSen-M8eP1qcabWCBLH8Z1_5mAqFM" class='map' :center="center" :zoom="15">
            <MarkerCluster>
                <Marker  :options="{ position:{lat:this.lat,lng:this.lon},icon:{
                    url:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAjVBMVEX///8BAQEAAAD4+Pj39/f7+/vp6en09PSvr6/x8fEYGBgICAhjY2NBQUE+Pj4aGhrf398ODg7l5eUiIiLOzs4UFBSjo6NqamqcnJxNTU01NTWGhobHx8dubm7S0tIsLCxXV1eRkZG6urp/f3+fn5+qqqp2dnZeXl4xMTGCgoJHR0fAwMC1tbWLi4uUlJScrYr+AAARcklEQVR4nO1diXbiOgylXuKmtOz7Dm2h09L+/+c9S4kTA3EWpQz4ndFbDoU48rVlSXakqNH4R//oH/2j25FSN2XPxbU5yCC4Notcujp7ycMrc8gnEfIrc+BcyiuzyGUv+ZXZq4aSpIUguIB/a7Ln+j4kiEIozb54+qVSkjaFQgoldefqaSm4B4m/Zi+kRljEHm6vp5DAQkC/9OALmgDERGaPw8J5MXuuSQ9j9XkQycDXgchhFgSBvW6YfMplrydad1WGlQdRIAcZf6YKqoSxpbM3n93sNXolSHpGaPGUSk8/9o26FjVnYK8qGwsUIK3mlIw642QPPVMUIYs4YCfTvysTsqeML+pebCZi9o4x0oOgby+qj7/WoEZCGzzmWfkmIANaz4kS+j6TvSxkrxegXuQknxDNS3xTAQwFwaApLWM0NYoIY/YcRSFbhDhKMYVD5CrHd9XDpD9Wn0LQD9wtX/ltrTnkYM6zbgJrXF+o6AijNYBLgrAKtXCCMasuohHTRqwBIvaZN1GgHRTV5YpEWzdXSpIWoQDpFhThxtaGvYAJcqkqAQud6nEnI6OcQ1h0B2RP3FMkugNHKBODdlkbZBGFm8Y8JA2gQG9LURRwSfah5NrS19kVcG7MEUEMQLpFgyqiEXvExZ0AtSfaqLnrjLxBTplBpVDFNep0IBph7liDICOSEwz9KQ+4OUXZw45SW7SaxwoI0WEH4ccaayAhkHSniIadwWL3+HjcLQadMywSmoW1+es5co4vmNrfOLeADfDlt72v7/ETO6X28/arlzQLGyKsJaKGvduY6sEna9FcCo7LGNODTfF3y2N0pMZDXl+CCugqZ2vB6OUS3BnM1ihA9tcGeA362uSgs1FOd7fuKoXk25CxYZNZQM4p/uWhqS98u+XZJYX4pIkgAGKsWV6WP6PHr8Vi8fU4+lm+tGOUjPWjayZeYXxvRjPEGKrQzWRweUYfDCYoxX1zafP9Bj2l0WCdSKAGMB+4J0cO5v1UXNl68Rd7SSc+tvC9rgqvX+0tjGMPRHVh+qunr6zYvfeTNuzup/E16eu6ignYrZN2r1fr229Q2DJqo/t4/lNnN9kuD9PP6Wa/nezOPdPG49A0bd32uV4urZpmIuYn6yk47j8urOHH/niiYOW3mcZm8eK9Ee3MLMw61rfBpJXtl3b1dE1skJ2ZucGd+jjvpn9z68vIc9N2sXmOsB25Apsv6+q5ucVdmsaR6Z2lDUeJtQOIJ9R/YMZijlKRXpibjG6AoIAGcd/6qZ54t0TzfBV2T35KpyzoX47TndBr1LNp8sWgz2y3uzV/NFv7sLN6nLespanncZC0m0Y32v91BEX0h0FPl+ZPubQ8m/U2SzuutmvLm1kmooot2Z+/0usq1IM5Saz1oJnim3ecjTrzFGMzmcZXuFXP2ehm1Fkejubzj+W55Xua0vLYfsyXx8PePSr3QPJgNGL73LPJose2ufzggd8NJBLXbV6uxzIxgy0vDmvUOu7u+lS9hIvRfjN9Qcd0tDj1PVex483Wtw0XLEfGoC3tLxevs9i3AUsINHs9sXhLY07/bmcp9HXpd/X+xH4pejKRA4ff/LEUpvH5vi5veWd0ZAgwteCdg7UnRpxPD8l+95DqzMgpYsesm94VKZydpOPh2HJd+uzMDdefx8mK7OBvHizEVYttkj3RyPJa0N9uvbT69mbKdkqDDXu5bzt4QeEmPX9hm1SBarWaHoczNr3jTX0+dZJTU3bYnT+2FDuzPvVG42439fmU7PXYONvJ7I0TjPe3VypBCcDPHM/702OIstxuPTkZ8MJfO6FB7KMUKcdO7AMNCq67PwrQuH/aUzP42U/X/fV0P7Hh8E90cW6b3UGib61GntM/F88n5zTP1sIDpfr99ztYnwaTFMUxfcRkDGQ/9c8WE/9k9JQ6L+cHwojRNwfGTe/s1HXLcNj8pq3lug1nrdnQcti8XH6GzAnGT+ra7AKMsg12qTPzk3eL+yYRRBBVtO1jbGv71+GWxd9fa7cUXH0bFsYGrhMB2ZzbuyDad7AraRsVXDlDU6YxXBhRss24Zou/XId/XoDk72SncslNCF+ny1j2semj3jedT2GtlDCLvXCGySnMlFA1+XDJrZFyO2QXvwiI3xS18xchc8uxDiGlC8Pd6/CQXIaOiPTV23aSs/IwYYbXZN9QEALqBmg+0Hcz0Ev85+KXMHogvHGdWiQRrrwGexBRiAbOPG+3AslrQIyS3zKS3YWxECx7iixcNWaRNxRvQAZjVteAg4myJfMQGpsew4wpfE6OFZ8z2kXspTKpZ0R7huxFdm4giij8EGfw0WaR8yi57xJgYD3zzVA+JsM2Zl+QBuoi3Vgox/TwNPksHkYKQlwAKhaR1ft+/JzQZ7q9YJ/p1+P9aPVr7DnmbqnsyYmzFRrp/wksBCSmKOyj2p5HJ5zunU5oq5BpxNFkoFVnj9HqmIWa+WuaxMtBmik5oHr+9ALEO20zkV1uEvECs8k3CKVyzUMuKQmW3q2IoWMReFQTFA4CzKDSOHvr6BHacvI1GDkhMtZZHOfx8ca0kwoPMbsPPRnpXMDRexpA0wh3Al8+BwGrSWhrt8IuP0Z2b+OexPhZWmf7xNgHHLfh7oo4vlxB3k9OjnQs90JxYv6gxLcpwPwDwJY5qXdPIUximFw1Y2yF3SQCxBcq5CahS5PfLWgygi3hdQ8N1bWeAK9y8xHYi7muN2uzJvSAmN0XseeNPBtjBFiQOIRhqPU0vihA7+DX5uteQcIFG5srF+s+egI09jyEzDcZ5hvR2MhKUv4gqhgcwQFLt0u9bmFGSTLbrVkfliIpu48r9IYKNyWRr0Nxe0PU0dGbHqYsiWhaFKbMQChc3K1v1hp+0thzdKPKbLpg30rK4wRsKkpfxPCvCOG2BMA0Jlhf3WI90qsYQIKkKrWr1faMlEOm0JvBvv3AYwgIcDMhv8UQMeaWwynj+o2Uo6f1rzZS5RxZ4o5CrwOzXZnig5bD+74kPoTIJm9tbDfN5+NiD8mLVz56Esq8bsXsAaMAmvIY4wNUGntUpVcms3ykBYo1C1Xp+ShQn5T+zglWKQpOthDtYmvBTmLcPXiOGJxOSRHE8yh+7xAWQbxIU/APYQHEyzwM/xBqEG6IFwC9ROiexctMGk8RuiBmAfQUYTbETIC+Isxai9kAvUV4OYsOgP4iPIfoAugxwlNBdQL0GeHJLDoBeo3QgugG6DdCA9Etot4jjNZiLkDfEeIs5gL0HiFAHOYB/B8gZP1h/gWeI9Qi+pCzmfIY4fkjX/ejUx8RGjizw+v3z+Rt9DaZfL8eZg6UviFEDK0/76uspJne6v1P6+IB//0jPDIb3nRSlNK0mpy884wd7zzb+YdZQTPTY7njXXHcWK3Y9x2nzwRrC+CwSmxs58mC2L7bGH71lK4oVjH4t8Pstve6GPHlH2b78FGx8Ydp+OCKe7s9qehpU5xoUPUx2TRu173jLKgANf/RpFJUbG1GZoF3udOVeByPX3uhQVjtXU87gzAM5uPxXefSGIvPNpWamcCpO5VPmxKErEqGdsj8Q/jA3iq0SkLDvEJYxV58eImwgkJM7b1PCB9O3kyXT/O0kVcIu6UbdW+CkPgKemt/WPo1AgurjUFYWHerPhHL89kIN+m3g6/R9345Pmw2h+flfv62W1irdJOB8PrFCVX1klJI9h4fXz6zGu2TI4uzY5rNnyMEd+/tJkE99uVJuQPC8ymwzyVyw/Xjn5pZpxjUynblCYI1SQtBQvBl14aYBe4U58mfiBCqA5IGGOvUlIiulCIsdd0l8UavO5vNWvnHvnmAAyxOSCx3w6GuIS+RUCTo1QG1lDabrEuGCAgVvTqgwhBCXiQACuNoSeX5JK7DBzpEjRDTWCmpc2mXC5QIx7pPhPJ8GKEdRIGlVIgskFj3icReZX6+IKVlGQqgEcrzQVpRMGzXgAjOrAD21YUUQSXVAaUbosLyfIRo67g6YLh+wRcnaoi5j9FcCAPeiJPfqhFCsqoDOjUl1LTh2dViCjjE5fk0wheExj7aVRGCgPdo7O3kwjg9LRuhwkKspGzxuDwfIMSSD8NW+VB2A7DfYh1BzK08Kb+odaWjthzknhCrT8KwyEY8hx+tWWUhZWw9G64DZ8WmYoQmu0+6qgNieilvhAQZacTJSjxah62XFwLAZp/1hwGx8ptMqnRGieqO6oCQXFevOiAP2n0SwAfWfhkyLaVEhzQSbSwoDZ+yQUCdWtGgFneL/QhtD2ckgFCKZvjRp26aksUrnTMYCsyuo1cHjCxQQBTRp25XK6dhk/qWa5M+KZ3ZfVqLYnobfdMSuUoBIwHsd5/aT2w4o59ixAUQnSKqoHydynpRQHlCn14jJIhov9sfsjbkdtG39tKYxOxkfEzkFnXL82lB1VJaHaCewM8XeAlvrZMo3FK4XgUB1XtVnQqSEem12OtXd9ZYs91sfaxbD/UQwjpxpvHLsEFLrTwjzosSfzMRPvS1uUcfqN5pIsySs2smQbIu5Ud9uSB2+2wWPf693hEb/6XDLRJCgBgJt1dn3g/mOC0PmbkgeTruF0LG5j/TZuaJYnLO2Po+Saf1C2GU0s07x+2hzy6pOdu/rcA+nUSa+IXQfu9j0Fnt3ifbb03byfvXyi7aNfcWYdkHiB1PEbJZ6UYzT58fln+Q/+YlwirBGKGXT7krBdRsvERYpRbH0UOEjFXxAqWHEUPpy4NK0dg7hFWrHSy880vJ0Zf+IKxaEvbVO4RVq/v5h7BS8GVq8/1B+MCGx/KPB/hx6J0uxT3uflXGJkqrMrdXCBHj8Pm9k4eSd96fn5i3O2BzVjHdv391zk/5ROfrfT+9ON/wDaEFk7F2a/M83i+X++dNq+0KB/MSoY0Tj6WGOSdwHiOE3j+04yqI7hNGrxHGAPMh+oyQNZ/SCjNOiB4gDF1dTwHmQazoCt2EHOGyNsD4aVPWZVeq6PGrlN3zU4DWovQQ4Tir4+cAXbNY8WTgNvSY0e9LgI616KjXcl8kLt8i8JABMIJ48dXfe0lnDdqfy2Mzc8llzSLb37rzpSg81ymZM5gFseq2+WY0OrELWWswG2JRRc87ooPV6zyAZ0aDHW7d8dIkW4l7BhsJN0C4IoHIWnf8uohz4lMTftDNjVSwdol6o+wRwAY8uMZzmjAMO3P3MmwtgjDsPeKG8XdLIQbX11krPY3RI9KdG+Ez9qOzzi2LTKHw2qXzGlBTZ/XKcJXlUxu2/a+//A4FWqg4hUew2D0W0W7w61tCAcHczl/rVDw74UEsM/gL7LHomzuCD2PZSZl5NgEPiqBASpnIm4ASpGTIXaXzsFCEwMyxWhB5Lo/chgoBUouuAUFin+Cu8U2rA9YJxVSRmFAKYsXIcvKyighLlQhXnKmFvF51QA51USrfwMJFzULWUxNiHG1286h6XZwxQ6kKhsQhgVip6rOAM2jWILl0noTSeY6AfBVXB4z7RrQpIuZReXyi/EEZ/VeQI+kiyH5t8NChKMV5eb7qOZaNqFIr1P2qnt2HM2ixJ+hzobC0pIs5iq6pnZd8UZkH6EKSlklTQSLhqb6OsXSedC8vkSLUMqZIuQkceZDqpGLGWVwdEOvZVr6JwjpHOe0wY69meT5ewCOPMB0kZp/mElZgDkn8XC9C5xUyqQnIibXlOCY25vHIbY2VAQ376poK7Hz+6MbLTkS2hFiejzyDjfglCjx2GaveBHWwymeeqGdifcdGxIPsOhtnVFIA6p22ipzFPDJGlpNEVGkmxTxyyCpOWBkgVLCFsmFF7YQZPlKFTizEW2dTEkN0pdflMgdfvYx1i6oqO9Kg81tieb6alecjiKL66wbARRSqlIcCQ0Hy1qD8pyrHI4c4SBrBIQU7H5acFzDXFHdULwQV1t+fy5xivnnNwgp1IQmv3KjMI+8+pPcpaPZ1xacEj9oiWo/9X2Be+2jnH/2jf/T/pf8AcGyxQ5aho7oAAAAASUVORK5CYII='
                    , scaledSize: {width:40,height:40} } }"    :key="i" />
            </MarkerCluster>
            <Polyline :options="flightPath" />
            </GoogleMap>
        </div>
        <div class="testor">
            <div><h1>
self-driving car</h1></div>
            <p>carbon monoxide :{{altitude}}</p>
            <p>lat :{{lat}}</p>
            <p>lon :{{lon}}</p>
            <p>speed :{{speed}}</p>
            <p>battery :{{battery}}</p>
            <p>order :{{order}}</p>
        </div>
    </div>
</template>

<style>
.zaju{
 display: flex;background-color: white;
}
.map{
    padding: 1vw; 
}
.testor{
  margin-top: 2vw;
  
  
}
.map{
  width: 75vw; height: 90vh; 
  margin-right: 2vw;
}
</style>


<script>
//import  Datas from "@/components/Datas";
//import  Map from "@/components/Map"
import {axios} from 'axios'
import { defineComponent } from "vue";
import { GoogleMap,Polyline,MarkerCluster,Marker  } from "vue3-google-map";

export default defineComponent({
    name: "Home",
    components: {GoogleMap, Polyline,MarkerCluster,Marker
    },
    setup() {
        //const center = this.nowcenter;
        let center = { lat: 35.15428967369665, lng: 128.09292186543928 }
        let locations =[
                
        ]
        const flightPath = {
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2,
        };
        return {center,flightPath,locations}
    },
    methods:{
        async call_datas(){
            let return_data = await this.$axios.get("localhost:5555/")
            //console.log(return_data.data)
            this.altitude = return_data.data.altitude
            this.lat = return_data.data.lat
            this.lon = return_data.data.lon
            this.speed = return_data.data.speed
            this.battery = return_data.data.battery
            this.order = return_data.data.order
            this.nowpath.push({lat:this.lat,lng:this.lon})
            console.log(this.nowpath)
            this.i +=1
        }
    },beforeMount() {
        //this.timer = setInterval(this.call_datas, 100);
    },
    data(){
        return{
            altitude:'nomal',
            lat:35.15428967369665,
            lon:128.09292186543928,
            speed:'1.2km/s',
            battery:'',
            order:'',
            nowpath:[
                {lat: 35.15428967369999, lng: 128.09292186543928 },
            ],
        }
    },
})
</script>
