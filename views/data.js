class Data {


    getExcel(e) {
        const data = this._getExcel(e);
        return data;
    }

    _getExcel() {
        throw 'must override';
    }
}

class ExcelData extends Data {
    metroCity = new Map;
    tableRender;
   //filterRender;
    excelArr;

    constructor() {
        super();
        Object.entries({hover0: '전라북도', hover1: '경기도', hover2: '서울특별시', hover3: '인천광역시', hover4: '충청북도', hover5: '광주광역시', hover6: '전라남도', hover7: '경상북도', hover8: '대구광역시', hover9: '부산광역시', hover10: '울산광역시', hover11: '경상남도', hover12: '충청남도', hover13: '대전광역시', hover14: '세종특별자치시', hover15: '전라북도', hover16: '강원도', hover17:'제주도'}).forEach(([k, v]) => {
            this.metroCity.set(k, v);
        });
        this.tableRender = new TableRender;
     // this.filterRender = new FilterRender;
    }
    
    setExcelJson(arr) {
        this.excelArr = arr;
    }

    getExcelJson() {
        return this.excelArr;
    }

     async _getExcel(e) {
        const {target:input} = e;
        const reader = new FileReader;
        const _tableRender = this.tableRender;
        const _filterRender = this.filterRender;

        let _this = this;
        reader.onload = () => {
            const filedata = reader.result;
            const wb = XLSX.read(filedata, {type: 'binary'});
            let json = {};
            wb.SheetNames.forEach(sheetName => {
                 json = {...XLSX.utils.sheet_to_json(wb.Sheets[sheetName]), ...json};
            });
            //notify
            let convertArr = [];
            for(const param in json) convertArr.push(json[param]);

            _tableRender._drawTable(convertArr);
            //_filterRender.drawMetroFilter(converArr);
            _this.setExcelJson(convertArr);
        };
        reader.readAsBinaryString(input.files[0]);       
    }

    getMetroCityKV() {
        return this.metroCity;
    }
    
}