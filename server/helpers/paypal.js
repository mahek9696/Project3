const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id:
    "AWXxw7mf9hRse_v_at_XK-JwPoYYltNzAEi_OpS-Hv_LUpQ6X7RHZaYiRGvWudzPNBjobHVSuoO1d3Vq",
  client_secret:
    "EExwdwxlGLLvJ9-mdaMw8LfGW5cuozzkM5wjF4Fn6z20DCp_nae1sDVwN53Trw0Qyozwx4ElajzrxAux",
});
// sb-nvcqr46165952@personal.example.com
// mahek9696
module.exports = paypal;
