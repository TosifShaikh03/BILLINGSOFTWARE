const customerForm = document.getElementById('customer-form');
const productForm = document.getElementById('product-form');
const addBtn = document.getElementById('add-btn');
const cartBody = document.getElementById('cart-body');
const printBtn = document.getElementById('print-btn');

let cart = [];

addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const itemName = document.getElementById('item-name').value.toUpperCase();
    const rate = parseFloat(document.getElementById('rate').value);
    const quantity = parseInt(document.getElementById('quantity').value);
    const totalAmount = rate * quantity;

    const product = {
        itemName: itemName,
        rate: rate,
        quantity: quantity,
        totalAmount: totalAmount
    };

    cart.push(product);

    const row = document.createElement('tr');
    const itemNameCell = document.createElement('td');
    const rateCell = document.createElement('td');
    const quantityCell = document.createElement('td');
    const totalAmountCell = document.createElement('td');
    const actionCell = document.createElement('td');

    itemNameCell.textContent = itemName;
    rateCell.textContent = rate;
    quantityCell.textContent = quantity;
    totalAmountCell.textContent = totalAmount;
    actionCell.innerHTML = '<button class="delete-btn">REMOVE</button>';

    row.appendChild(itemNameCell);
    row.appendChild(rateCell);
    row.appendChild(quantityCell);
    row.appendChild(totalAmountCell);
    row.appendChild(actionCell);

    cartBody.appendChild(row);

    productForm.reset();

    const deleteBtns = document.querySelectorAll('.delete-btn');
    deleteBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            const index = cart.indexOf(product);
            if (index == -1) {
                cart.splice(index, 1);
            }
            row.remove();
        });
    });
});

printBtn.addEventListener('click', () => {
    const customerName = document.getElementById('customer-name').value.toUpperCase();
    const customerAddress = document.getElementById('customer-address').value.toUpperCase();
    const customerPhone = document.getElementById('customer-phone').value;

    let bill = `
   <style>
    * {
        margin: 0;
        padding: 0;
    }
     

    table {
        border-collapse: collapse;
        margin-top: 1%;
        width: 600px;
    }

    th,
    td {
        border: 1px solid #ddd;
        padding: 10px;
    }

    #head-1 {
        font-size: 30px;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    }

    header {
        border-bottom: 1px solid black;
    }

    #billAmt {
        font-size: 20px;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    }

    .main {
        margin-top: 5%;
    }
    .main p{
        font-size: 18px;
        display: inline;
    }
        #money{
        border-top:2px solid black;
        font-size:20px;
        }
        .nonebor{
        border-left:none;
        
        }
</style>


    <header>
        <center>
            <p id="head-1">A-1 Glass Enterprises</p>
            <p id="head-2">vill. Shahpur Khana, Near Punjab National Bank Dist. Tiraha, Bijnor-246701</p>
                 <p> Cont.No. 8490843958/7819956006  &emsp;&emsp;      GSTIN:09ABZPF7974Q1Z7</p>
        </center>

    </header>
    <center>
        <div class="main">

            <p>Customer Name: ${customerName}</p>
            
            <p>Customer Phone: ${customerPhone}</p><br>
            <p>Customer Address: ${customerAddress}</p>

            <table>
                <thead>
                    <tr>
                        <th>Item Name</th>
                        <th>Rate</th>
                        <th>Quantity</th>
                        <th>Total Amount</th>
                    </tr>
                </thead>
                <tbody>
    
        </div>

    </center>
    `;

    let totalBillAmount = 0;
    cart.forEach((product) => {
        bill += `
            <tr>
                <td>${product.itemName}</td>
                <td>${product.rate}</td>
                <td>${product.quantity}</td>
                <td>${product.totalAmount}</td>
            </tr>
                   
                       
        
        `;
        totalBillAmount += product.totalAmount;
    });

    bill += `
            </tbody>
             <tr>
    <td id="money"></td>
    <td id="money"></td>
    <td id="money">GST</td>
    <td id="money">${totalBillAmount}</td>
    </tr>
    <tr>
    <td></td>
    <td ></td>
    <td  id="money">Total Bill Amount</td>
    <td  id="money">${totalBillAmount}</td>
    </tr>
            </table>
      
    `;

    const printWindow = window.open('', '', 'height=800,width=1000');
    printWindow.document.write(bill);
    printWindow.print();
});
