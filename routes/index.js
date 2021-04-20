const express = require("express");
const mongoose = require("mongoose");
const { check, validationResult } = require("express-validator");

var router = express.Router();
require("../models/Registration");
const Registration = mongoose.model("Registration");

router.get("/", function(req, res, next) {
    res.render("form", { title: "Kayıt formu" });
});

router.post(
    "/", [
        check("name").isLength({ min: 1 }).withMessage("İsim alanı boş geçilemez"),
        check("email")
        .isLength({ min: 1 })
        .withMessage("E-posta alanı boş geçilemez"),
    ],
    (req, res) => {
        const errors = validationResult(req);

        if (errors.isEmpty()) {
            const registration = new Registration(req.body);
            registration
                .save()
                .then(() => {
                    res.send("Kayıt başarılı!");
                })
                .catch((err) => {
                    console.log(err);
                    res.send("Hata! kayıt yapılamadı.");
                });
        } else {
            res.render("form", {
                title: "Kayıt Formu",
                errors: errors.array(),
                data: req.body,
            });
        }
    }
);

router.get("/registrations", (req, res) => {
    Registration.find()
        .then((registrations) => {
            res.render("index", { title: "Kayıtları Listele", registrations });
        })
        .catch(() => {
            res.send("Hata! kayıtlar alınamadı");
        });
});

module.exports = router;