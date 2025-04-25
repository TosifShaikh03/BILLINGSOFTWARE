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
        width: 900px;
    }
table th{
        background: #8B4513;
        font-size:20px;
        font-weight:100;
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
          .invoice-header {
        background: #8B4513;
        color: white;
        text-align: center;
        padding: 5px;
        font-size: 15px;
        margin-top: 30px;
        border-top: 1px solid black;

    }
            .invoice-details {
        display: flex;
        justify-content: space-between;
        margin: 10px 0;
            font-size:20px;
        font-weight:100;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    }
            .invoice-amount {
        background: #8B4513;
        color: white;
        padding: 10px;
        margin: 10px 0;
        text-align: center;
    }
           .summary-table {
            width: 900px;

        margin-top: 10px;
    }

    .summary-table td {
        border: 1px solid #ccc;
        padding: 8px;
    }
            .total-amount {
        background: #8B4513;
        color: white;
        font-weight: bold;
    }
    .billing-address{
       font-size:15px;
        font-weight:100;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    }    
        #head-3{
        margin-top:5px;
        }
</style>


    <header>
        

    </header>
     <div class="invoice-header">
            <h2>Invoice</h2>
        </div>
        
    <center>
        <div class="main">
<div class="invoice-details">
            <strong>Bill To:&emsp;${customerName}</strong>
            <strong>Contact No.:&emsp;${customerPhone}</strong>
        </div>
              <div class="billing-address">
            <strong id="billing-address-1">Billing Address:&emsp; ${customerAddress}</strong><br><br>
        </div>

            <table>
                <thead>
                    <tr>
                       <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Price/Unit</th>
                    <th>GST</th>
                    <th>Amount</th>
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
                <td>${product.quantity}</td>
                <td>${product.rate}</td>
                <td></td>
                <td>${product.totalAmount}</td>
            </tr>
                   
                       
        
        `;
        totalBillAmount += product.totalAmount;
    });

    bill += `
            </tbody>
             
    <tr>
    <td></td>
    <td ></td>
    <td ></td>
    <td  id="money">Total Bill Amount</td>
    <td  id="money">${totalBillAmount}</td>
    </tr>
            </table>
            <div class="invoice-amount">
            <strong>INVOICE AMOUNT IN WORDS</strong>
        </div>
         <table class="summary-table">
            <tr>
                <td>Sub Total: </td>
                <td>${numberToWords(totalBillAmount).toUpperCase()}</td>
            </tr>
            <tr>
                <td>SGST:</td>
                <td></td>
            </tr>
            <tr>
                <td>CGST:</td>
                <td></td>
            </tr>
            <tr class="total-amount">
                <td>Total Amount:</td>
                <td>${totalBillAmount}</td>
            </tr>
        </table>
      
    `;

    const printWindow = window.open('', '', 'height=800,width=1000');
    printWindow.document.write(bill);
    printWindow.print();
});

function numberToWords(totalBillAmount) {
    const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    const thousands = ['', 'thousand', 'million', 'billion'];

    if (totalBillAmount === 0) {
        return 'zero';
    }

    let words = '';
    let i = 0;

    while (totalBillAmount > 0) {
        if (totalBillAmount % 1000 !== 0) {
            words = helper(totalBillAmount % 1000) + ' ' + thousands[i] + ' ' + words;
        }
        totalBillAmount = Math.floor(totalBillAmount / 1000);
        i++;
    }

    return words.trim();

    function helper(totalBillAmount) {
        if (totalBillAmount === 0) {
            return '';
        } else if (totalBillAmount < 10) {
            return ones[totalBillAmount];
        } else if (totalBillAmount < 20) {
            return teens[totalBillAmount - 10];
        } else if (totalBillAmount < 100) {
            return tens[Math.floor(totalBillAmount / 10)] + (totalBillAmount % 10 !== 0 ? ' ' + ones[totalBillAmount % 10] : '');
        } else {
            return ones[Math.floor(totalBillAmount / 100)] + ' hundred' + (totalBillAmount % 100 !== 0 ? ' ' + helper(totalBillAmount % 100) : '');
        }
    }
}
