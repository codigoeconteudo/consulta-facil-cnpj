(function () {
    let httpRequest;
    document.getElementById("consulta").onclick = function () {
        makeRequest('https://minhareceita.org/' + document.getElementById('cnpj_input').value);
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

                document.getElementById("cnpj").innerHTML = response.cnpj;
                document.getElementById("nome_fantasia").innerText = response.nome_fantasia;
                document.getElementById("razao_social").innerText = response.razao_social;
                document.getElementById("logradouro").innerText = response.logradouro;
                document.getElementById("numero").innerText = response.numero;
                document.getElementById("complemento").innerText = response.complemento;
                document.getElementById("bairro").innerText = response.bairro;
                document.getElementById("municipio").innerText = response.municipio;
                document.getElementById("uf").innerText = response.uf;
                document.getElementById("cep").innerText = response.cep;
                document.getElementById("ddd_telefone_1").innerText = response.ddd_telefone_1;
                document.getElementById("ddd_telefone_2").innerText = response.ddd_telefone_2;
                document.getElementById("email").innerText = response.email;
                document.getElementById("porte").innerText = response.porte;
                document.getElementById("natureza_juridica").innerText = response.natureza_juridica;


            } else {
                alert('Não foi possível completar a requisição. Verifique o CNPJ e tente novamente.');
            }
        }
    }
})();
