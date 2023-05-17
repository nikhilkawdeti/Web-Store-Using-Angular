const express = require("express");

// cross origin resource sharing
const cors = require("cors");

// require to send data between server and client
const bodyParser = require("body-parser");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: true, Credential: true }));

const stripe = require("stripe")(
  "sk_test_51N8crPSF8tAcoBNOFBWRZtMAFO3DRzJjt0o90WfGW6x29UZYrzpXRYVDdk5V5bT8AFktkerdXxaP5d1ewx9bwm3T000cjdjGkY"
);

app.post("/checkout", async (req, res, next) => {
  try {
    const session = await stripe.checkout.sessions.create({
      shipping_address_collection: {
        allowed_countries: ["US", "CA"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 0,
              currency: "usd",
            },
            display_name: "Free shipping",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 5,
              },
              maximum: {
                unit: "business_day",
                value: 7,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 1500,
              currency: "usd",
            },
            display_name: "Next day Sir",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 1,
              },
              maximum: {
                unit: "business_day",
                value: 1,
              },
            },
          },
        },
      ],
      line_items: req.body.items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            image: [item.image],
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: "http://localhost:4242/success",
      cancel_url: "http://localhost:4242/cancel",
    });
    res.status(200).json(session);
  } catch (error) {
    next(error);
  }
});

app.listen(4242, () => console.log("app is runing on 4242"));
