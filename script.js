const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sPlano = document.querySelector('#m-plano')
const sValor = document.querySelector('#m-valor')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id


function openModal(edit = false, index = 0) {
    modal.classList.add('active')

    modal.onclick = e => {
     if (e.target.className.indexOf('modal-container') !== -1) {
        modal.classList.remove('active')
        }
    }

if (edit) {
    sNome.value = itens[index].nome
    sPlano.value = itens[index].plano
    sValor.value = itens[index].valor
    id = index
}else{
    sNome.value = ''
    sPlano.value = ''
    sValor.value = ''
 }

}

function editItem(index){

    openModal(true, index)
}

function deleteItem(index) {
    itens.splice(index, 1)
    setItensBD()
    loadItens()
}

function insertItem(item, index) {
    let tr = document.createElement('tr')

    tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.plano}</td>
    <td>${item.valor}</td>
    <td class="acao">
     <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
     <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
   `    
    tbody.appendChild(tr)
}

btnSalvar.onclick = e => {

    if (sNome.value == '' || sPlano.value == '' || sValor.value == '') {
        return
    }

    e.preventDefault();

    if (id !== undefined) {
        itens[id].nome = sNome.value
        itens[id].plano = sPlano.value
        itens[id].valor = sValor.value
    }else{
        itens.push({'nome': sNome.value, 'plano': sPlano.value, 'valor': sValor.value})
    }

    setItensBD()

    modal.classList.remove('active')
    loadItens()
    id= undefined
}


function loadItens() {
    itens = getItensBD()
    tbody.innerHTML = ''
    itens.forEach((item, index) => {
        insertItem(item, index)
    })
}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()