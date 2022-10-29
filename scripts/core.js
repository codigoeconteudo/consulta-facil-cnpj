(function () {
    let httpRequest;
    document.getElementById("consulta").onclick = function () {
        makeRequest('https://minhareceita.org/' + document.getElementById('cnpj').value);
    };

    function makeRequest(url) {
        if (window.XMLHttpRequest) {
            httpRequest = new XMLHttpRequest();
        } else if (window.ActiveXObject) { // IE
            try {
                httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e) {
                }
            }
        }

        if (!httpRequest) {
            alert('Não foi possível completar a requisição.');
            return false;
        }
        httpRequest.onreadystatechange = alertContents;
        httpRequest.open('GET', url);
        httpRequest.send();
    }

    function alertContents() {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                const element = document.getElementById("section");
                element.classList.remove("hidden");

                const response = JSON.parse(httpRequest.responseText);

                document.getElementById("cnpj").innerText = document.getElementById('cnpj').value;
                document.getElementById("razao_social").innerText = response.razao_social;
                document.getElementById("nome_fantasia").innerText = response.nome_fantasia;
                document.getElementById("situacao").innerText = response.situacao;
                document.getElementById("data_situacao").innerText = response.data_situacao;


            } else {
                alert('Não foi possível completar a requisição. Verifique o CNPJ e tente novamente.');
            }
        }
    }
})();
