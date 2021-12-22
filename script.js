// fazendo questão 5 e 6 (quando clicar no botão de criar tarefa,
// um novo item deve ser adicionado ao final da lista para ficar
// na ordem de criação e o texto do input deve ser limpo):
const button = document.querySelector('#criar-tarefa');
const input = document.querySelector('#texto-tarefa');
const list = document.querySelector('#lista-tarefas');

button.addEventListener('click', () => {
  const li = document.createElement('li');
  li.innerText = input.value;
  list.appendChild(li);
  input.value = '';
});

// fazendo questão 7 e 8 (clicar em um item da lista deve
// alterar a cor de fundo do item para cinza e não deve ser
// possível selecionar mais de um elemento da lista ao mesmo tempo):
list.addEventListener('click', (select) => {
  if (select.target.id === 'lista-tarefas') {
    return false;
  }
  for (let index = 0; index < list.children.length; index += 1) {
    list.children[index].style.backgroundColor = '';
  }
  select.target.style.backgroundColor = 'rgb(128, 128, 128)';
});

// fazendo questão 9 (clicar duas vezes em um item,
// faz com que ele seja riscado, indicando que foi completo.
// Deve ser possível desfazer essa ação clicando novamente duas vezes no item):
const li = document.createElement('li');
li.className = 'completed';

list.addEventListener('dblclick', (clickLi) => {
  if (clickLi.target.id === 'lista-tarefas') {
    return false;
  }
  if (clickLi.target.className === '') {
    clickLi.target.className = 'completed';
  } else {
    clickLi.target.className = '';
  }
});
// o target é para o evento funcionar exatamente onde estou clicando, no meu parâmetro.

// fazendo questão 10 (quando clicar no botão ele deve apagar todos os itens da lista):
const buttonClear = document.querySelector('#apaga-tudo');

buttonClear.addEventListener('click', () => {
  list.innerHTML = '';
});

// outra forma de fazer o 10 que aprendi depois:
// const buttonClear = document.querySelector('#apaga-tudo');
// buttonClear.addEventListener('click', () => {
//   const li = document.querySelectorAll('li');
//   for (let index = 0; index < li.length; index += 1) {
//     li[index].remove();
//   }
// });

// fazendo questão 11 (quando clicar o botão ele deve
// remover somente os elementos finalizados da lista):
const buttonClearComplete = document.querySelector('#remover-finalizados');

buttonClearComplete.addEventListener('click', () => {
  const listWithLi = document.querySelectorAll('ol#lista-tarefas>li.completed'); // essa forma de escrever o que está no parênteses foi o instrutor Lucas Leal que me ensinou, o uso do > é para dizer que é o filho direto.
  for (let index = listWithLi.length - 1; index >= 0; index -= 1) {
    listWithLi[index].remove();
  }
});

// fazendo bônus, questão 12 (salvar a lista quando clicar
// no botão para que ela não apague mesmo que a página seja fechada e reaberta):
const buttonSave = document.querySelector('#salvar-tarefas');

buttonSave.addEventListener('click', () => {
  const liArray = [];
  const allLi = document.querySelectorAll('li');
  for (let index = 0; index < allLi.length; index += 1) {
    const tasks = {
      taskLi: allLi[index].innerText,
      taskCompleted: allLi[index].classList.contains('completed'), // o classList é uma propriedade, que possui o contais como método, que vai me retornar um boleano (true or false), me dizendo se possuí a className completed ou não; => A Fê que me ensinou.
    };
    liArray.push(tasks);
  }
  localStorage.setItem('taskLi', JSON.stringify(liArray));
});

window.onload = function () {
  if (localStorage.length > 0) {
    const saveTaskLi = localStorage.getItem('taskLi');
    const arraySaveTaskLi = JSON.parse(saveTaskLi);
    for (let index = 0; index < arraySaveTaskLi.length; index += 1) {
      const key = arraySaveTaskLi[index];
      const li = document.createElement('li');
      li.innerText = key.taskLi;
      if (key.taskCompleted) {
        li.className = 'completed';
      }
      list.appendChild(li);
    }
  }
};

// fazendo bônus, questão 13 (mover o item selecionado
// para cima ou para baixo quando clicar em um dos botões):
const buttonMoveUp = document.querySelector('#mover-cima');
const buttonMoveDown = document.querySelector('#mover-baixo');

buttonMoveUp.addEventListener('click', () => {
  const allLi = document.querySelectorAll('li');

  for (let index = 1; index < allLi.length; index += 1) {
    if (allLi[index].style.backgroundColor === 'rgb(128, 128, 128)') {
      const liUp = allLi[index];
      list.insertBefore(liUp, liUp.previousElementSibling);
      break;
    }
  }
});

buttonMoveDown.addEventListener('click', () => {
  const allLi = document.querySelectorAll('li');

  for (let index = 0; index < allLi.length - 1; index += 1) {
    if (allLi[index].style.backgroundColor === 'rgb(128, 128, 128)') {
      const liDown = allLi[index];
      list.insertBefore(liDown.nextElementSibling, liDown);
      break;
    }
  }
});
// eu li sobre o insertBefor no https://www.w3schools.com/jsref/met_node_insertbefore.asp

// fazendo bônus, requisito 14 (remover o item selecionado quando clicar no botão):
const buttonClearSelect = document.querySelector('#remover-selecionado');

buttonClearSelect.addEventListener('click', () => {
  const allLi = document.querySelectorAll('li');
  for (let index = 0; index < allLi.length; index += 1) {
    if (allLi[index].style.backgroundColor === 'rgb(128, 128, 128)') {
      const liSelect = allLi[index];
      liSelect.remove();
    }
  }
});
