// console.log("HELLO FROM LARAVEL 9");

let my_address = window.location.href;
let my_shop = Shopify.shop;
// console.log(my_address);
// console.log("CTH I");
if (my_address.includes("app_dis")) {
    const queryString = window.location.search;
    // console.log(queryString);

    const urlParams = new URLSearchParams(queryString);
    // console.log(urlParams);

    const campaign_id = urlParams.get("camp");
    // console.log(campaign_id);

    if (campaign_id) {
        if (localStorage.getItem("shop_name")) {
            alert(localStorage.getItem("message"));
        } else {
            let formData2 = {
                shop: Shopify.shop,
                campaign_id: campaign_id,
            };

            fetch(
                `https://af41-2400-adc5-1b3-b500-ac11-a213-ca45-e30b.in.ngrok.io/api/get_campaign_discount`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData2),
                }
            )
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log(data);

                    if (data.success == true) {
                        localStorage.setItem("discount_code", data.data);
                        localStorage.setItem("shop_name", Shopify.shop);
                        console.log(data.message);
                        let message1 = "";
                        let message2 = "";
                        if (data.data2 == "percentage") {
                            message1 = `CONGRATS! You won the Discount of ${data.data1}%. Use discount code ${data.data} to avail the discount`;
                            message2 = `You already won the Discount of ${data.data1}%. Use discount code ${data.data} to avail the discount`;
                            alert(message1);
                        } else {
                            message1 = `CONGRATS! You won the Discount of $${data.data1}. Use discount code ${data.data} to avail the discount`;
                            message2 = `You already won the Discount of $${data.data1}. Use discount code ${data.data} to avail the discount`;
                            alert(message1);
                        }

                        localStorage.setItem("message", message2);
                    } else {
                        alert(data.message);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }
}

if (my_address.includes("cart")) {
    console.log("Please Let me know. here is the cart");

    document
        .querySelectorAll('[name="checkout"]')[1]
        .addEventListener("click", function (event) {
            event.preventDefault();
            console.log("CTH II");
            localStorage.getItem("discount_code");
            localStorage.getItem("shop_name");
            var action_src =
                "https://" +
                localStorage.getItem("shop_name") +
                "/checkout?discount=" +
                localStorage.getItem("discount_code");
            console.log(action_src);
            window.location.href = action_src;
        });
}

if (my_address.includes("products")) {
    console.log("Please Let me know. here is the cart");

    document
        .querySelectorAll('[name="checkout"]')[0]
        .addEventListener("click", function (event) {
            event.preventDefault();
            console.log("CTH II");
            localStorage.getItem("discount_code");
            localStorage.getItem("shop_name");
            var action_src =
                "https://" +
                localStorage.getItem("shop_name") +
                "/checkout?discount=" +
                localStorage.getItem("discount_code");
            console.log(action_src);
            window.location.href = action_src;
        });

    document
        .querySelector('[data-testid="Checkout-button"]')
        .addEventListener("click", function (event) {
            event.preventDefault();
            event.stopPropagation();

            const formData = {
                items: [
                    {
                        quantity: 1,
                        id: document.getElementsByName("id")[0].value,
                    },
                ],
            };

            fetch("/cart/add.js", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    // console.log(data);
                    localStorage.getItem("discount_code");
                    localStorage.getItem("shop_name");
                    var action_src =
                        "https://" +
                        localStorage.getItem("shop_name") +
                        "/checkout?discount=" +
                        localStorage.getItem("discount_code");
                    console.log(action_src);
                    window.location.href = action_src;
                })
                .catch((error) => {
                    console.error(error);
                });

            // return false;
        });
}
