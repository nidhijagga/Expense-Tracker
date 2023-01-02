let categotySelector = document.getElementsByClassName('dropdown-item');



for (let i = 0; i < categotySelector.length; i++) {
    categotySelector[i].addEventListener('click', function () {
        // Update the text of the dropdown button to the text of the selected item
        // console.log(this.textContent);
        document.querySelector('#categoryBtn').textContent = this.textContent;
    });
}

let table = document.getElementById('tbodyId');
let submit = document.getElementById('submitBtn');

submit.addEventListener('click', addItem);
table.addEventListener('click', deleteRow);
table.addEventListener('click', editRow);

function addItem(e) {

    e.preventDefault();

    let categoryValue = document.getElementById('categoryBtn').textContent;
    let descriptionValue = document.getElementById('descriptionValue').value;
    let amountValue = document.getElementById('amountValue').value;


    //Alert for input requirement

    if (document.getElementById('categoryBtn').textContent === "Select Category" ||
        document.getElementById('descriptionValue').value === "" ||
        document.getElementById('amountValue').value === "") {
        alert('Input Required in All feilds.');
    }
    else {
        
        //Creating the new row.

        let tr = document.createElement('tr');
        tr.className = 'align-middle trStyle';

        let th = document.createElement('th');
        th.setAttribute('scope', 'row');
        th.appendChild(document.createTextNode("#"));

        let td1 = document.createElement('td');
        td1.appendChild(document.createTextNode(categoryValue));

        let td2 = document.createElement('td');
        td2.appendChild(document.createTextNode(descriptionValue));

        let td3 = document.createElement('td');
        td3.appendChild(document.createTextNode(amountValue))

        let td4 = document.createElement('td');

        let deleteBtn = document.createElement('button');
        deleteBtn.className = 'editDelete btn btn-danger delete';
        deleteBtn.appendChild(document.createTextNode('Delete'));

        let editBtn = document.createElement('button');
        editBtn.className = 'editDelete btn btn-secondary edit';
        editBtn.appendChild(document.createTextNode('Edit'));

        td4.appendChild(deleteBtn);
        td4.appendChild(editBtn);
        tr.appendChild(th);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        table.appendChild(tr);


        //Adding the Values to Local Storage

        let values = {
            category: categoryValue,
            desciption: descriptionValue,
            amount: amountValue
        }
        let valueStr = JSON.stringify(values);
        localStorage.setItem(descriptionValue, valueStr);


        //Emptying the input's after taking the value.

        document.getElementById('categoryBtn').textContent = "Select Category";
        document.getElementById('descriptionValue').value = "";
        document.getElementById('amountValue').value = "";

    }
}

function deleteRow(e) {
    if (e.target.classList.contains('delete')) {
        let tr = e.target.parentElement.parentElement;
        // console.log(tr.children[2].textContent);
        localStorage.removeItem(tr.children[2].textContent);
        table.removeChild(tr);
    }
}

function editRow(e) {
    if (e.target.classList.contains('edit')) {
        let tr = e.target.parentElement.parentElement;

        //Local Storage Object
        let localStorageValues = JSON.parse(localStorage.getItem(tr.children[2].textContent));
        console.log(localStorageValues);

        document.getElementById('categoryBtn').textContent = localStorageValues.category;
        document.getElementById('descriptionValue').value = localStorageValues.desciption;
        document.getElementById('amountValue').value = localStorageValues.amount;


        localStorage.removeItem(tr.children[2].textContent);
        table.removeChild(tr);
    }
}

// submit.addEventListener('click', addItem);
// table.addEventListener('click', deleteRow);
// table.addEventListener('click', editRow);
