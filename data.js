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
    
     _getExcel(e) {
        const {target:input} = e;
        const reader = new FileReader;
        
        reader.onload = () => {
            const filedata = reader.result;
            const wb = XLSX.read(filedata, {type: 'binary'});
            wb.SheetNames.forEach(sheetName => {
                const rowObj = XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);
                console.log(JSON.stringify(rowObj));
            });
        };
        reader.readAsBinaryString(input.files[0]);
        
    }
}