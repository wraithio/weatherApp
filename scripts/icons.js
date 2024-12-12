function findCurrentWeatherIcon(icon){
    if(icon.includes('cloud'))
    {
        weatherIcon.className =
        "fa-solid fa-cloud fa-2xl";
    }
    if(icon.includes('clear') || icon.includes('sun'))
    {
        weatherIcon.className = "fa-regular fa-sun fa-2xl";
    }
    if(icon.includes('rain'))
    {
        weatherIcon.className = 'fa-solid fa-cloud-rain fa-2xl'
    }
    if(icon.includes('snow'))
    {
        weatherIcon.className = 'fa-regular fa-snowflake fa-2xl'
    }
}
function findday1Icon(icon){
    if(icon.includes('cloud'))
    {
        day1Icon.className =
        "fa-solid fa-cloud fa-2xl d-flex justify-content-center";
    }
    if(icon.includes('clear') || icon.includes('sun'))
    {
        day1Icon.className = "fa-regular fa-sun fa-2xl";
    }
    if(icon.includes('rain'))
    {
        day1Icon.className = 'fa-solid fa-cloud-rain fa-2xl'
    }
    if(icon.includes('snow'))
    {
        day1Icon.className = 'fa-regular fa-snowflake fa-2xl'
    }
}
function findday2Icon(icon){
    if(icon.includes('cloud'))
    {
       day2Icon.className =
        "fa-solid fa-cloud fa-2xl d-flex justify-content-center";
    }
    if(icon.includes('clear') || icon.includes('sun'))
    {
        day2Icon.className = "fa-regular fa-sun fa-2xl";
    }
    if(icon.includes('rain'))
    {
        day2Icon.className = 'fa-solid fa-cloud-rain fa-2xl'
    }
    if(icon.includes('snow'))
    {
        day2Icon.className = 'fa-regular fa-snowflake fa-2xl'
    }
}
function findday3Icon(icon){
    if(icon.includes('cloud'))
    {
        day3Icon.className =
        "fa-solid fa-cloud fa-2xl d-flex justify-content-center";
    }
    if(icon.includes('clear') || icon.includes('sun'))
    {
        day3Icon.className = "fa-regular fa-sun fa-2xl";
    }
    if(icon.includes('rain'))
    {
        day3Icon.className = 'fa-solid fa-cloud-rain fa-2xl'
    }
    if(icon.includes('snow'))
    {
        day3Icon.className = 'fa-regular fa-snowflake fa-2xl'
    }
}
function findday4Icon(icon){
    if(icon.includes('cloud'))
    {
        day4Icon.className =
        "fa-solid fa-cloud fa-2xl d-flex justify-content-center";
    }
    if(icon.includes('clear') || icon.includes('sun'))
    {
        day4Icon.className = "fa-regular fa-sun fa-2xl";
    }
    if(icon.includes('rain'))
    {
        day4Icon.className = 'fa-solid fa-cloud-rain fa-2xl'
    }
    if(icon.includes('snow'))
    {
        day4Icon.className = 'fa-regular fa-snowflake fa-2xl'
    }
}
function findday5Icon(icon){
    if(icon.includes('cloud'))
    {
        day5Icon.className =
        "fa-solid fa-cloud fa-2xl";
    }
    if(icon.includes('clear') || icon.includes('sun'))
    {
        day5Icon.className = "fa-regular fa-sun fa-2xl";
    }
    if(icon.includes('rain'))
    {
        day5Icon.className = 'fa-solid fa-cloud-rain fa-2xl'
    }
    if(icon.includes('snow'))
    {
        day5Icon.className = 'fa-regular fa-snowflake fa-2xl'
    }
}

export{findCurrentWeatherIcon, findday1Icon, findday2Icon, findday3Icon, findday4Icon, findday5Icon}