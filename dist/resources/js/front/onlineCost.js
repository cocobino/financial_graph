onlineCost = () => {
    let online_graph = [], onlineList =['지마켓', '쿠팡', '옥션','페이',], graphData={}
    ,colorList = ['#ff0391', 'gold', '#f06', '#ffc33b', 'skyblue','orange', '#ff2942', 'yellowgreen'], totalCost=0;

    const onlineCost = {
        init() {
            this.setData();
            this.drawD3();
        },
        setData() {
             const recordDivision ='매출구분';
                const recordCost = '이용금액';
                const recordName = '이용가맹점(은행)명';

                for(let i=0; i<EXCEL_JSON.length-5; i++) {
                    if(EXCEL_JSON[i][recordDivision] === '취소' || EXCEL_JSON[i][recordDivision] === '선결제')continue;
                    const tmpDivision = EXCEL_JSON[i][recordName];
                    for(let j=0; j<onlineList.length; j++) {
                        if(tmpDivision.indexOf(onlineList[j]) < 0)continue;
                        

                        if((online_graph.findIndex(x => x.name ===tmpDivision) >=0)){
                            online_graph[online_graph.findIndex(x => x.name ===tmpDivision)].cost += parseInt(EXCEL_JSON[i][recordCost].replace(/,/g, ''));
                            totalCost += parseInt(EXCEL_JSON[i][recordCost].replace(/,/g, ''));
                        }else {
                            online_graph.push({name: tmpDivision, cost: parseInt(EXCEL_JSON[i][recordCost].replace(/,/g, '')) });
                            totalCost += parseInt(EXCEL_JSON[i][recordCost].replace(/,/g, ''));
                        }
                    }
                }
                
                online_graph.sort((a,b) => {
                    return a.cost < b.cost ? -1 : a.cost > b.cost ? 1: 0;
                });

                graphData = this.toObj(online_graph);
        },
        toObj(arr) {
            let tmpObj = {};
            console.log(arr)
            for(let i=0; i<arr.length; i++) {
                const name = arr[i].name;
                const cost = arr[i].cost;
                tmpObj = Object.assign(tmpObj, {[name] : cost})
            }
            return tmpObj;
        },
        drawD3() {
            const width = 280, height = 280, margin = 10;
            const radius = (Math.min(width, height) / 2) - margin;

            const svg = d3.select('#d3-pie-graph')
                          .append('svg')
                          .attr('width', width)
                          .attr("height", height)
                          .append('g')
                          .attr('transform', `translate(${width/2}, ${height/2})`);
            
            const color = d3.scaleOrdinal()
                            .domain(graphData)
                            .range(["#98abc5", "#8a89a6", "#7b6888"/*, "#6b486b", "#a05d56"*/]);

            const pie = d3.pie()
                        .value(function(d){return d.value});
            const data_ready = pie(d3.entries(graphData));

            svg.selectAll('p')
            .data(data_ready)
            .enter()
            .append('path')
            .attr('d', d3.arc()
                         .innerRadius(0)
                         .outerRadius(radius)
                 )
            .attr('fill', function(d){ return(color(d.data.key)) })
            .attr("stroke", "black")
            .style("stroke-width", "2px")
            .style("opacity", 0.7);

        }

    }


    onlineCost.init();
}