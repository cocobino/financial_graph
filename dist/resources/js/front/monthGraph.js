    
    monthGraph = () => {
        const monthData=new Map();
        let graph = {min : 123457890, max: 0}, dateList = [];
        
        const monthGraph = {
            init() {
                const drawDOM =document.querySelector('#draw_graph');
                this.setData();
                drawDOM.innerHTML = this.draw(drawDOM);
            },
            draw(DOM) {
                let t = '', len = monthData.size, left=(1060/len)-5;
                
                for(let i=0; i<len; i++) {
                    const dateCost = monthData.get(dateList[i]);
                    const XbarHeight = 350*(dateCost) / graph.max;
                    t+= `
                    <div class="draw_Xbararea" style="margin-left:${i === 0 ? 0 : left}px">
                        <div class="draw_dateCost" style="bottom:${XbarHeight}px">${dateCost}</div>
                        <div class="draw_Xbar" style="height:${XbarHeight}px"></div>
                        <div class="draw_dateText">${dateList[i]}</div>
                    </div>
                    `;
                }
                setTimeout(this.callbackAnimation, 100, DOM);
                return t;
            },
            setData() {
            //그래프 그려줄 데이터 셋팅
            const recordDate ='이용일자';
            const recordCost ='이용금액';
        
                for(let i=0; i<EXCEL_JSON.length-3; i++) {
                    //key: date, value : cost
                    const tmpCost = parseInt((EXCEL_JSON[i][recordCost]).replace(/,/g,''));
                    if(!dateList.includes(EXCEL_JSON[i][recordDate])){ dateList.push(EXCEL_JSON[i][recordDate]); }
                    if(!monthData.has(EXCEL_JSON[i][recordDate]) && (EXCEL_JSON[i][recordDate].length)) {
                        monthData.set(EXCEL_JSON[i][recordDate], tmpCost);
                        graph.min = Math.min(graph.min, tmpCost);
                        graph.max = Math.max(graph.max, tmpCost);
                    }
                    //중복된 날자가 있다면 기존cost에서 더함 
                    else if(monthData.has(EXCEL_JSON[i][recordDate]) && (EXCEL_JSON[i][recordDate].length)) {
                        const _Cost = monthData.get(EXCEL_JSON[i][recordDate]);
                        monthData.set(EXCEL_JSON[i][recordDate], (tmpCost + _Cost));
                        graph.min = Math.min(graph.min, (tmpCost + _Cost));
                        graph.max = Math.max(graph.max, (tmpCost + _Cost));
                    }
                }
            },
            callbackAnimation(DOM) {
                //init draw graph
                DOM.classList.remove('draw_default');
                
                //
            }
        }

        monthGraph.init();
    }
