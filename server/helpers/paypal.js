const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id:
    "AeA3A_NYsnWFXzE4hYOlyg5AjrPess695SHCAZL2fzIOtvsz053IX1C6rHvj7uTYTMlSyPEunpuoII41",
  client_secret:
    "EKahnwibR7W7-UViva_mQSSQdKRD09NjDRrBMIHRY7buwQKCtA4NMWwJbQ-wfylPq_x5fl5fxm3fHR7x",
});

module.exports = paypal;
