monthBestGraph = () => {
    let graphData = [], nameList=[], deleteList=['주식회사', '유한회사','오가다'];


    const monthBestGraph = {
        init() {
            const bestGraphDOM = document.querySelector('#draw_BestGraph');
            this.setData();  
            bestGraphDOM.innerHTML = this.draw(bestGraphDOM);
        },
        setData() {
            /*
            가맹점명 split 후 counting
            */
            const recordDivision = '매출구분';
            const recordCost = '이용금액'
            const recordName = '이용가맹점(은행)명';
            
            for(let i=0; i<EXCEL_JSON.length-5; i++) {    
                if(EXCEL_JSON[i][recordDivision] !== '취소' && EXCEL_JSON[i][recordDivision] !== '선결제') {
                    const tmpDivision = EXCEL_JSON[i][recordName].split(' ');
                    for(let j=0; j<deleteList.length; j++) {
                        if(tmpDivision.indexOf(deleteList[j])>=0){
                            tmpDivision.splice(tmpDivision.indexOf(deleteList[j]), 1);
                        } 
                    }
            
                    if(graphData.findIndex(x => x.name === tmpDivision[0]) >=0 ) {
                        graphData[graphData.findIndex(x => x.name === tmpDivision[0])].cost += parseInt(EXCEL_JSON[i][recordCost].replace(/,/g, ''));
                    } else {
                        graphData.push({name: tmpDivision[0], cost: parseInt(EXCEL_JSON[i][recordCost].replace(/,/g, ''))});
                    }
                }
            }

            graphData.sort((a,b) => {
                return a.cost < b.cost ? 1 : a.cost > b.cost ? -1 : 0;
            });
        },
        draw(DOM) {
            let t = '';

            for(let i=0; i<4; i++) {
                const graphHeight = graphData[i].cost/graphData[0].cost * 280;

                t += 
                `
                <div class="draw_Yarea" style="margin-top:${i ==0 ? 0 : 50}px">
                    <div class="draw_Ybar" style="width:${graphHeight}px">
                        <div class="draw_YText">${graphData[i].name} </br>${graphData[i].cost}원 </div>
                    </div>
                </div>
                `;
            }
            
            setTimeout(this.callbackAnimation, 100, DOM);
            return t;
        },
        callbackAnimation(DOM) {
            DOM.classList.remove('defulat_widthGraph');
        }
    }    
    
    monthBestGraph.init();
}