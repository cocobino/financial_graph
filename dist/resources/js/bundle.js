
window.onload = () => {
    
    const fn = {
        init () {
            //event binding
            this.event();
        },
        event() {
            //ignore & style
            const dragOver = (e)=>{
                e.preventDefault();e.stopPropagation(); 
                e.dataTransfer.dropEffect="copy";
                
            }

            //fileUpload
            const uploadFile = (e)=>{
                e.preventDefault();
                e.stopPropagation();
                const files = e.dataTransfer.files;
                //validation
                if(Number(files[0].type.indexOf('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) >= 0)return alert('엑셀파일을 올려주세요');
                    const excelReader = new FileReader();
                    excelReader.onload = (e) => {
                        const data = e.target.result; 
                        const workbook = XLSX.read(data, {type:'binary'}); 
                        workbook.SheetNames.forEach((item) => {
                            EXCEL_JSON = XLSX.utils.sheet_to_json(workbook.Sheets[item]);
                            EXCEL_JSON.length > 0 ? removeMask.style.display ='none' : removeMask.style.display ='block'; //remove popup
                            monthGraph();
                        });
                    };
                    excelReader.readAsBinaryString(files[0]);
            }

            const dragFileUpload = document.querySelector('#dragFileUpload');
            const removeMask = document.querySelector('#removeMask'); //remove popup
            dragFileUpload.addEventListener('dragover', dragOver);
            dragFileUpload.addEventListener('dragleave', dragOver);
            dragFileUpload.addEventListener('drop', uploadFile);
        }
    }

    fn.init();
}


    
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
