
import XLSX from 'xlsx';
import * as THREE from "three";

let allLoadCount = 1

let currentLoadCount = 0

let allLoadComplete = null

let heroMainData = null

let heroID = ""
let heroName = ""
let heroRarity = ""
let heroClass = ""
let heroTxt = ""

export async function readExcelFile(url,callBack) {
    let fileLoader = new THREE.FileLoader();
    fileLoader.setResponseType('arraybuffer');
    fileLoader.load(
        url,
        function(res){
            let data = new Uint8Array(res)
            let wb = XLSX.read(data,{type:'array'})
            let sheets = wb.Sheets
            let content = new Array;
            
            for (let key in sheets) {
                content.push(XLSX.utils.sheet_to_json(sheets[key]))
            }
            
            if (callBack) callBack(content)
        },
    )
}

export async function loadMaps(loadComplete) {
    await readExcelFile(`${process.env.BASE_URL}excel/baller.xlsx`,loadHeroMainData);

    allLoadComplete = loadComplete
}

function loadMapState() {
    currentLoadCount++
    if (currentLoadCount === allLoadCount) {
        currentLoadCount = 0
        if (allLoadComplete) {
            allLoadComplete()
        }
    }
}

export function analysis(dna) {
    let head = dna.slice(0,1)

    if (head != "?") {
        return null
    }
    
    heroID = dna.slice(0,4)

    for (let index = 0; index < heroMainData.length; index++) {
        const element = heroMainData[index];
        if (element.ID == heroID) {
            heroName = element.Name
            heroRarity = element.Rarity - 10
            heroClass = element.Class
            heroTxt = element.Txt
            break
        }
    }
    
    const heroDates = {
        "heroDNA":dna,
        "heroID":heroID.slice(1,4),
        "heroName": heroName,
        "heroRarity": heroRarity,
        "heroClass": heroClass,
        "heroTxt": heroTxt
    }
    
    return heroDates
}

function loadHeroMainData(data) {
    heroMainData = data[0];
    loadMapState()
}