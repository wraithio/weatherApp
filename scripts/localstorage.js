function saveToLocalStorage(name,name2){
    let nameArr = getFromLocalStorage();

    console.log(nameArr)
    console.log(name)

    if(!nameArr.includes(name))
    {
        nameArr.push(`${name}, ${name2}`);
    }

    localStorage.setItem('Names',JSON.stringify(nameArr));
}

function getFromLocalStorage(){
    let localStorageData = localStorage.getItem('Names');

    if(localStorageData == null){
        return [];
    }
            return JSON.parse(localStorageData);
    

}

function removeFromLocalStorage(city){
    let localStorageData = getFromLocalStorage();

    let cityIndex = localStorageData.indexOf(city);

    localStorageData.splice(cityIndex, 1);

    localStorage.setItem('Names', JSON.stringify(localStorageData));
}

export{saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage}