    utilityCost = () => {
        let utilGraph = [], utilList =['전력', '버스', '통신', '에스알', '택시', '해양']
        ,colorList = ['#ff0391', 'gold', "#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", 'yellowgreen'], totalCost=0;
        

        const utilityCost = {
            init() {
                const circleDOM  = document.querySelector('#draw_circle_graph');
                this.setData();
                circleDOM.innerHTML = this.draw(circleDOM);
            },
            setData() {
                const recordDivision ='매출구분';
                const recordCost = '이용금액';
                const recordName = '이용가맹점(은행)명';

                for(let i=0; i<EXCEL_JSON.length-5; i++) {
                    if(EXCEL_JSON[i][recordDivision] === '취소' || EXCEL_JSON[i][recordDivision] === '선결제')continue;
                    const tmpDivision = EXCEL_JSON[i][recordName];
                    for(let j=0; j<utilList.length; j++) {
                        if(tmpDivision.indexOf(utilList[j]) < 0)continue;
                        

                        if((utilGraph.findIndex(x => x.name ===tmpDivision) >=0)){
                            utilGraph[utilGraph.findIndex(x => x.name ===tmpDivision)].cost += parseInt(EXCEL_JSON[i][recordCost].replace(/,/g, ''));
                            totalCost += parseInt(EXCEL_JSON[i][recordCost].replace(/,/g, ''));
                        }else {
                            utilGraph.push({name: tmpDivision, cost: parseInt(EXCEL_JSON[i][recordCost].replace(/,/g, '')) });
                            totalCost += parseInt(EXCEL_JSON[i][recordCost].replace(/,/g, ''));
                        }
                    }
                }
                
                utilGraph.sort((a,b) => {
                    return a.cost < b.cost ? -1 : a.cost > b.cost ? 1: 0;
                });
            },
            draw(DOM) {
                let t = '', style='';
                let per =0;
                for(let i=0; i<=utilGraph.length; i++) {
                    if(i===0)style+=`${colorList[i]} 0% ${(utilGraph[i].cost/totalCost)*100}%, `;
                    else if(i=== utilGraph.length){
                        style += `${colorList[i]} ${(utilGraph[i-1].cost/totalCost)*100}% 100%`;                        
                    }
                    else style += `${colorList[i]} ${(utilGraph[i-1].cost/totalCost)*100}% ${(utilGraph[i].cost/totalCost)*100}%, `;
                }

                
                t = `<div class="circle_graph" style="background: conic-gradient(${style});"></div><div class="circle_center"> </div>`;
                setTimeout(this.callbackAnimation, 100, DOM);
                return t;
            },
            callbackAnimation(DOM) {
                DOM.classList.remove('show-piechart');
            }

        }

        utilityCost.init();
    }