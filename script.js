document.querySelector('.busca').addEventListener('submit', async (e) => {
    e.preventDefault();

    let input = document.querySelector('#searchInput').value;

    if (input !== '') {
        clearInfo();
        showWarning('Carregando...');
        let url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=47da001f6d77a3b6bbc22c32d43f3aed&units=metric&lang=pt_br`);
        let json = await url.json();

        if (json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            });
        } else {
            showWarning('Não encontramos esta localização.');
            clearInfo();
        }
    } else {
        clearInfo();
    }
});

function showInfo(json) {
    showWarning('');

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;

    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle - 90}deg)`;

    document.querySelector('.resultado').style.display = 'block';
};

function clearInfo() {
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
};

function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg;
};