

let show = false

document.getElementById('shorten').addEventListener('click' ,function(){
    
    let showResult = document.querySelector('.result-f');

    if (show){
        showResult.style.display = 'flex';
    } else {
        showResult.style.display = 'none';
    }
    
    const urlToShorten = document.getElementById('input').value;
    const apiUrl = 'https://api.shrtco.de/v2/shorten?url=' + encodeURIComponent(urlToShorten);

    fetch(apiUrl)
    .then(response => response.json())
    .then(data =>{
        if (data.ok){
            show = true;
            const shortenedLink = data.result.full_short_link;
            document.querySelector('.long-link').innerHTML = `<a href="${urlToShorten}" target="_blank">${urlToShorten}</a>`;

            document.querySelector('.result').innerHTML = `<a id="short-link" href="${shortenedLink}" target="_blank">${shortenedLink}</a>`;
        } else{
            show = false
            document.querySelector('.erro').innerHTML = 'Erro ao encurtar o link';
            document.querySelector('#input').style.focus.outline = 'red'
            showResult.style.display = 'none';
        }
    })
    .catch(error => {
        console.error('Erro', error);

        const erro = document.querySelector('.erro');

        if (erro) {
            erro.innerHTML = 'Erro ao encurtar o link';

        
        setTimeout(function () {
            erro.style.display = 'none';
        }, 5000);
        }
    })
})
