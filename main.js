'use strict';

(function(window) {

  let rowIndex, colIndex;

  const container = document.querySelector('.main');
  const table = container.querySelector('table');

  table.addEventListener('mouseenter', mouseEnter);
  container.addEventListener('mouseleave', mouseLeave);
  table.addEventListener('mousemove', mouseMove);
  container.querySelector('.add-row').addEventListener('click', addRow);
  container.querySelector('.add-col').addEventListener('click', addColumn);
  container.querySelector('.del-row').addEventListener('click', deleteRow);
  container.querySelector('.del-col').addEventListener('click', deleteColumn);

  function mouseEnter() {
    container.querySelector('.del-row').style.visibility = 'visible';
    container.querySelector('.del-col').style.visibility = 'visible';
  };

  function mouseLeave() {
    setTimeout(function() {
      if (container.querySelector('table:hover')) return;
      if (container.querySelector('.del-btn:hover')) return;
      container.querySelector('.del-row').style.visibility = 'hidden';
      container.querySelector('.del-col').style.visibility = 'hidden';
    }, 200);
  };

  function mouseMove(e) {
    const { offsetTop, offsetLeft, nodeName, cellIndex, parentElement } = e.target;
    if (nodeName === 'TD') {
      container.querySelector('.del-row').style.top = offsetTop + 'px';
      container.querySelector('.del-col').style.left = offsetLeft + 'px';
      rowIndex = parentElement.rowIndex;
      colIndex = cellIndex;
    }
  };

  function addRow() {
    const newRow = table.querySelector('tr').cloneNode(true);
    table.querySelector('tbody').appendChild(newRow);
    actionCallback();
  };

  function addColumn() {
    table.querySelectorAll('tr').forEach((tr) => {
      tr.appendChild(tr.querySelector('td').cloneNode());
    });
    actionCallback();
  };

  function deleteRow() {
    table.querySelectorAll('tr')[rowIndex].remove();
    actionCallback();
  };

  function deleteColumn() {
    table.querySelectorAll('tr').forEach((tr) => {
      tr.querySelectorAll('td')[rowIndex].remove();
    });
    actionCallback();
  };

  function actionCallback() {
    container.querySelector('.del-row').style.display = table.querySelectorAll('tr')[1] ? 'block' : 'none';
    container.querySelector('.del-col').style.display = table.querySelector('tr').children[1] ? 'block' : 'none';
    container.querySelector('.del-row').style.visibility = 'hidden';
    container.querySelector('.del-col').style.visibility = 'hidden';
  }
}(window));
