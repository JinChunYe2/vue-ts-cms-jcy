import * as Echarts from 'echarts'

// 封装Echarts的顶级hooks,新添加相关的逻辑很方便
export default function (el: HTMLElement) {
    // 1.创建Echarts实例
    const echartInstance = Echarts.init(el)

    // 2.把option创建好
    const setOption = (option: Echarts.EChartsOption) => {
        echartInstance.setOption(option)
    }

    // 3.调用Echarts实例来适配echarts大小
    window.addEventListener('resize', () => {
        echartInstance.resize()
    })

    // 4.把函数放出去，比如折叠菜单时，调用，echarts就会适配
    const updataSize = () => {
        echartInstance.resize()
    }

    return { setOption, updataSize }
}
