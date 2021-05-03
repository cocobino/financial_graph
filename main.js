(() => {
    const excelData = new ExcelData;
    const el = selector => document.querySelector(selector);
    

    el('#excelFile').addEventListener('change', e => excelData.getExcel(e));
    
    
})();