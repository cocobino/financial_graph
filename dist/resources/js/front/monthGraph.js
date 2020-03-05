    
    monthGraph = () => {
        const monthData=new Map();
        
        const monthGraph = {
            init() {
                const drawDOM =document.querySelector('#draw_graph');
                this.setData();
                drawDOM.innerHTML = this.draw(drawDOM);
            },
            draw(DOM) {
                const t = '', len = monthData.size;
                //width : 1060
                //height: 350
                for(let i=0; i<len; i++) {
                    t+= '<div></div>'
                }
                
                return t;
            },
            setData() {
            //그래프 그려줄 데이터 셋팅
            const recordDate ='이용일자';
            const recordCost ='이용금액';
                for(let i=0; i<EXCEL_JSON.length-1; i++) {
                    //key: date, value : cost
                    if(!monthData.has(EXCEL_JSON[i][recordDate]) && (EXCEL_JSON[i][recordDate].length)) {
                        monthData.set(EXCEL_JSON[i][recordDate], Number((EXCEL_JSON[i][recordCost]).replace(/,/g,'')));
                    }
                    //중복된 날자가 있다면 기존cost에서 더함 
                    else if(monthData.has(EXCEL_JSON[i][recordDate]) && (EXCEL_JSON[i][recordDate].length)) {
                        const tmpCost = monthData.get(EXCEL_JSON[i][recordDate]);
                        monthData.set(EXCEL_JSON[i][recordDate], parseInt((EXCEL_JSON[i]['이용금액']).replace(/,/g,'')) + tmpCost);
                    }
                }
                console.log(monthData);
            }
        }

        
        monthGraph.init();
    }
