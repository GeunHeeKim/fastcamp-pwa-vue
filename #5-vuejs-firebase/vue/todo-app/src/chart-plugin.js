import Vue from 'vue'
import Chart from 'chart.js'

const chartPlugin = {
    install() {
        Vue.prototype.myChart = Chart;
    },
    
};

export default chartPlugin