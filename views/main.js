const Main = (_=> {
    const excelData = new ExcelData;
    const cityRender = new CityRender;
    const tableRender = new TableRender;
    //const filterRender = new FilterRender;

    const el = selector => document.querySelector(selector);
    //singleton    
    return class {
        constructor() {
            this.evt();
        }

        evt() {
            el('#excelFile').addEventListener('change', e => excelData.getExcel(e));
            el('input[name="search"]').addEventListener('keyup', e => {
                if(e.keyCode == 13) {
                    tableRender.drawTable(excelData.getExcelJson(), e.target.value);
                }
            })
            d3.selectAll('.hover').on('click', cityRender.drawMetroCity.bind(cityRender));
        }
    }
})();

new Main;