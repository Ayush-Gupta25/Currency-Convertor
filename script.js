const fetchExchangeRate = async (baseCurrency, targetCurrency) => {
  const API_URL = `https://api.currencyapi.com/v3/latest?apikey=cur_live_Mfn9Gk3H27VzFwWLz8bC12VOFPhJeJJvxhrh2HyI`;

  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to fetch exchange rate data");

    const data = await response.json();
    const rates = data.data;
    if (!rates) throw new Error("Rates not found in the API response");
    const targetRate = rates[targetCurrency]?.value;
    if (!targetRate) {
      console.log(`Exchange rate for ${targetCurrency} not available.`);
      return null;
    }

    console.log(`1 ${baseCurrency} = ${targetRate} ${targetCurrency}`);
    return targetRate;
  } catch (error) {
    console.error("Error:", error.message);
    return null; // Return null if there's an error
  }
};

const amount_value = document.getElementById("amount");
const btn = document.getElementById("submit");
btn.addEventListener("click", () => {
  let c1 = document.getElementById("fromCurrency").value
  let c2 = document.getElementById("toCurrency").value
  let amount = parseFloat(amount_value.value);
  if(amount){
  fetchExchangeRate(c1, c2).then((rate) => {
    if (rate) {
      console.log(`Total Value: ${rate * amount}`);
      document.querySelector(".value_text").innerHTML = "Amount Converted : " + (rate * amount).toFixed(3)+" "+c2;
    } else {
      console.log("Could not fetch the exchange rate.");
    }
  });}
  else
  alert("Please enter the amount to be converted.");
  document.getElementById("amount").value = "";
});




