//pop-up checkout modal

var modal = document.getElementById("orderModal");
var btn = document.getElementById("orderBtn");
var checkoutBtn = document.getElementById("checkOutBtn");

btn.onclick = function() {
    modal.style.display = "block";
}

checkOutBtn.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if(event.target == modal) {
        modal.style.display = "none";
    }
}

orderSummary = {
  // template
  // "how": '',
  // "bean": '',
  // "quantity": '',
  // "grind": '',
  // "delivery": '',
};

let arrow = document.querySelectorAll(".selection-arrow");
// let orderTotal = document.querySelector(".orderTotal");
const weekly = document.querySelector("span.weekly");
const biWeekly = document.querySelector("span.biWeekly");
const monthly = document.querySelector("span.monthly");

let option = document.querySelectorAll(".option");
let howText = document.querySelector('.howText');
let beanText = document.querySelector('.beanText');
let quantityText = document.querySelector('.quantityText');
let deliveryText = document.querySelector('.deliveryText');
let grindText = document.querySelector('.grindText');

let modalHow = document.querySelector("#orderModal .howText");
let modalBean = document.querySelector("#orderModal .beanText");
let modalQuantity = document.querySelector("#orderModal .quantityText");
let modalDelivery = document.querySelector("#orderModal .deliveryText");
let modalGrind = document.querySelector("#orderModal .grindText");


function openPanel(panel) {
    if(!panel.classList.contains("disabled")) {
        panel.style.display = "grid";
        panel.classList.add("active");
        panel.previousElementSibling.classList.add("active");
    }
}

function closePanel(panel) {
    if(panel.classList.contains("active")) {
        panel.style.display = "none";
        panel.classList.remove("active");
        panel.previousElementSibling.classList.remove("active");
    }
}

function shipmentPrice(quantity) {

    if (quantity === "250g") {
        weekly.innerHTML = "7.20";
        biWeekly.innerHTML = "9.60";
        monthly.innerHTML = "12.00";
    }

    if (quantity === "500g") {
        weekly.innerHTML = "13.00";
        biWeekly.innerHTML = "17.50";
        monthly.innerHTML = "22.00";
    }

    if (quantity === "1000g") {
        weekly.innerHTML = "22.00";
        biWeekly.innerHTML = "32.00";
        monthly.innerHTML = "42.00"
    }
}

function orderTotal(delivery) {
    if (delivery === "Every Week") {
        totalPrice = parseFloat(weekly.innerText) * 4; //turn a string number in a floating number
    } else if (delivery === "Every 2 Weeks") {
        totalPrice = parseFloat(biWeekly.innerText) * 2;
    } else {
        totalPrice = parseFloat(monthly.innerText);
    }
    return totalPrice.toFixed(2);
}

for (i=0; i< arrow.length; i++) {
    arrow[i].addEventListener("click", function (){
        let panel = this.closest("div").nextElementSibling;
        if (panel.classList.contains("active")) {
            closePanel(panel);
        } else {
            openPanel(panel);
        }
    })
}

option.forEach((options) => {
    options.addEventListener("click", function() {
        let currentRow = options.parentElement.querySelectorAll(".option");
        currentRow.forEach((currentRow) => {
            currentRow.classList.remove("selected");
        });

        options.classList.add("selected");

        let selected = options.getAttribute("data-answer");

        let dataQuestion = options.getAttribute("data-question");

        orderSummary[dataQuestion] = selected;

        if (dataQuestion === "how") {
            let grindArrow = document.querySelector("#grind-arrow");
            if(orderSummary.how === "Capsule") {
                howText.innerHTML = `using <span class="blue">${orderSummary.how}</span>,`;
                modalHow.innerHTML = `using <span class="blue">${orderSummary.how}</span>,`;

                if(!grindArrow.classList.contains('disabled')) {
                    grindArrow.classList.add('disabled');
                    grindArrow.closest("div").nextElementSibling.classList.add('disabled');
                    closePanel(grindArrow.closest("div").nextElementSibling);
                }
                
                delete orderSummary.grind;
                grindText.innerHTML = ``;
                let grindRow = document.querySelector('#grind-row');
                let grindOptions = grindRow.querySelectorAll('.option');
                grindOptions.forEach((option) => {
                    option.classList.remove('selected');
                });
            } else {
                if(!orderSummary.hasOwnProperty('how')) {
                    howText.innerHTML = `as <span class="blue">_____</span>,`;
                    modalHow.innerHTML = `as <span class="blue">_____</span>,`;
                } else {
                    howText.innerHTML = `as <span class="blue">${orderSummary.how}</span>,`;
                    modalHow.innerHTML = `as <span class="blue">${orderSummary.how}</span>,`;
                }
                if(grindArrow.classList.contains('disabled')) {
                    grindArrow.classList.remove('disabled');
                    grindArrow.closest("div").nextElementSibling.classList.remove('disabled');
                }
            }
        } else if(dataQuestion === 'bean') {
            beanText.innerHTML = orderSummary.bean;
            modalBean.innerHTML = orderSummary.bean;
        } else if(dataQuestion === 'quantity') {
            quantityText.innerHTML = orderSummary.quantity;
            modalQuantity.innerHTML = orderSummary.quantity;
            shipmentPrice(orderSummary.quantity);

            // if selected quantity has changed but selected delivery stays the same, need to update orderTotal; 
            if(orderTotal(orderSummary.delivery)){
                document.querySelector("span.orderTotal").innerHTML = orderTotal(orderSummary.delivery);
            }

            let deliveryArrow = document.querySelector("#delivery-arrow");
            if (orderSummary.how === ("Capsule")) {
                openPanel(deliveryArrow.closest("div").nextElementSibling)
            }
        } else if(dataQuestion === 'grind') {
            if(orderSummary.grind === 'Wholebean') {
                grindText.innerHTML = ``;
                modalGrind.innerHTML = ``;
            } else {
                grindText.innerHTML = ` ground ala <span class="blue">${orderSummary.grind}</span>`;
                modalGrind.innerHTML = ` ground ala <span class="blue">${orderSummary.grind}</span>`;
            }
        } else if(dataQuestion === 'delivery') {
            deliveryText.innerHTML = orderSummary.delivery;
            modalDelivery.innerHTML = orderSummary.delivery;
            document.querySelector("span.orderTotal").innerHTML = orderTotal(orderSummary.delivery);
        } else {
            console.log('unknown row');
        }

        let currentPanel = this.closest('.panel'); 
        
        let nextPanel = this.closest('.customizePlan').nextElementSibling.firstElementChild.nextElementSibling;

        if(!currentPanel.classList.contains('last')) {
            openPanel(nextPanel);
        }
    })
})




