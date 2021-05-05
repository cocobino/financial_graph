const el = selector => document.querySelector(selector);


class Render {
    drawMetroCity(d) {
        this._drawMetroCity(d);
    }

    drawTable(json, keyword='') {
        this._drawTable(json, keyword);
    }

    filterRender() {
        this._filterRender();
    }

    _drawMetroCity() {
        throw 'must override';
    }

    _drawTable() {
        throw 'must override';
    }

    _filterRender() {
        throw 'must override';
    }
}

class TableRender extends Render {
    constructor() {
        super();
    }

    _drawTable(json, keyword='') {
        el('#tabelRender').innerHTML = json.filter(v=> v['기초시·군'].indexOf(keyword) !== -1).map(v=> `<tr>
            <td></td>
            <td>${v['광역시·도']}</td>
            <td>${v['기초시·군']}</td>
            <td>${v['모집인원']}</td>
            <td>${v['지원자']}</td>
            <td>${v['경쟁률']}</td>
        </tr>`).join('');
    }
}


class CityRender extends Render{
    constructor() {
        super();
        
    }
    _drawMetroCity(e) {
        const {target} = e;
        let classList = Array.from(target.classList).concat();
        let selectId = '';
        //1-pass
        classList.some(v => {
            const hoverNum = v.split('hover');
            if(hoverNum.length == 2 && hoverNum[1]) {
                selectId = v;
                return true;
            }
        });

        if(classList.indexOf('active') !== -1) {
            classList = classList.filter(v => v !== 'active');
            d3.select(`#${selectId}`).attr('class', 'st18');
        } else {
            classList = [...classList, 'active'];
            d3.select(`#${selectId}`).attr('class', '');
        }

        target.setAttribute('class', [...classList].join(' '));

    }
}
/*
class FilterRender {
    drawMetroFilter(json) {
        el('#metro').innerHTML = 
    }
    
    _filterRender(json) {
    
    }
}
*/