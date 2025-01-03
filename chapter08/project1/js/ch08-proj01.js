const tax_rate = prompt('Enter tax rate (0.10)');
const shipping_threshold = prompt('Enter shipping threshold (1000)');
let subtotal = 0;

for (let c of cart) {
    let total = calculateTotal(c.quantity, c.product.price);
    outputCartRow(c, total);
    subtotal += total;
}

let tax = subtotal * tax_rate;
let shipping = 40.0;

if (subtotal > shipping_threshold) {
    shipping = 0.0;
}

let grand_total = subtotal + tax + shipping;

/*
document.write(`<tr class="totals">`);
document.write(`<td colspan="4">Subtotal</td>`);
document.write(`<td>$${subtotal.toFixed(2)}</td>`);
document.write(`</tr>`);

document.write(`<tr class="totals">`);
document.write(`<td colspan="4">Tax</td>`);
document.write(`<td>$${tax.toFixed(2)}</td>`);
document.write(`</tr>`);

document.write(`<tr class="totals">`);
document.write(`<td colspan="4">Shipping</td>`);
document.write(`<td>$${shipping.toFixed(2)}</td>`);
document.write(`</tr>`);

document.write(`<tr class="totals">`);
document.write(`<td colspan="4" class="focus">Grand Total</td>`);
document.write(`<td class="focus">$${grand_total.toFixed(2)}</td>`);
document.write(`</tr>`);
*/