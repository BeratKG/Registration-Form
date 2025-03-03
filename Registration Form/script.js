// Dil desteği için metinler
const translations = {
    tr: {
        headerTitle: "Kayıt Formu",
        headerDescription: "Hoş geldiniz! Lütfen kayıt olmak için formu doldurun.",
        labelFirstName: "İsim:",
        labelLastName: "Soyisim:",
        labelBirthdate: "Doğum Tarihi:",
        labelTC: "TC Kimlik No:",
        labelPhone: "Telefon Numarası:",
        labelCity: "İl:",
        labelDistrict: "İlçe:",
        labelEmail: "Mail Adresi:",
        labelPassword: "Şifre:",
        labelConfirmPassword: "Şifre Tekrarı:",
        passwordInfo: "Şifre en az 8 karakter uzunluğunda olmalı ve en az bir büyük harf, bir küçük harf ve bir sayı içermelidir.",
        submitButton: "Kayıt Ol",
        resetButton: "Temizle",
        footerText: "© 2025 Kayıt Formu. Tüm hakları saklıdır. Made by BKG.",
    },
    en: {
        headerTitle: "Registration Form",
        headerDescription: "Welcome! Please fill out the form to register.",
        labelFirstName: "First Name:",
        labelLastName: "Last Name:",
        labelBirthdate: "Birthdate:",
        labelTC: "TC ID Number:",
        labelPhone: "Phone Number:",
        labelCity: "City:",
        labelDistrict: "District:",
        labelEmail: "Email Address:",
        labelPassword: "Password:",
        labelConfirmPassword: "Confirm Password:",
        passwordInfo: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.",
        submitButton: "Register",
        resetButton: "Reset",
        footerText: "© 2025 Registration Form. All rights reserved. Made by BKG.",
    },
    de: {
        headerTitle: "Anmeldeformular",
        headerDescription: "Willkommen! Bitte füllen Sie das Formular aus, um sich zu registrieren.",
        labelFirstName: "Vorname:",
        labelLastName: "Nachname:",
        labelBirthdate: "Geburtsdatum:",
        labelTC: "TC-ID-Nummer:",
        labelPhone: "Telefonnummer:",
        labelCity: "Stadt:",
        labelDistrict: "Bezirk:",
        labelEmail: "E-Mail-Adresse:",
        labelPassword: "Passwort:",
        labelConfirmPassword: "Passwort bestätigen:",
        passwordInfo: "Das Passwort muss mindestens 8 Zeichen lang sein und mindestens einen Großbuchstaben, einen Kleinbuchstaben und eine Zahl enthalten.",
        submitButton: "Registrieren",
        resetButton: "Zurücksetzen",
        footerText: "© 2025 Anmeldeformular. Alle Rechte vorbehalten. Made by BKG.",
    },
    es: {
        headerTitle: "Formulario de Registro",
        headerDescription: "¡Bienvenido! Por favor, complete el formulario para registrarse.",
        labelFirstName: "Nombre:",
        labelLastName: "Apellido:",
        labelBirthdate: "Fecha de Nacimiento:",
        labelTC: "Número de Identificación TC:",
        labelPhone: "Número de Teléfono:",
        labelCity: "Ciudad:",
        labelDistrict: "Distrito:",
        labelEmail: "Correo Electrónico:",
        labelPassword: "Contraseña:",
        labelConfirmPassword: "Confirmar Contraseña:",
        passwordInfo: "La contraseña debe tener al menos 8 caracteres y contener al menos una letra mayúscula, una letra minúscula y un número.",
        submitButton: "Registrarse",
        resetButton: "Limpiar",
        footerText: "© 2025 Formulario de Registro. Todos los derechos reservados. Made by BKG.",
    },
};

// Dil seçimi değiştiğinde metinleri güncelle
document.querySelectorAll('.flag').forEach(flag => {
    flag.addEventListener('click', function () {
        const lang = this.getAttribute('data-lang');
        changeLanguage(lang);
    });
});

// Dark Mode Toggle
document.getElementById('dark-mode-toggle').addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');
});

// İsim ve Soyisim için ilk harfi büyük yapma
document.getElementById('firstName').addEventListener('input', function () {
    this.value = this.value.charAt(0).toUpperCase() + this.value.slice(1);
});

document.getElementById('lastName').addEventListener('input', function () {
    this.value = this.value.charAt(0).toUpperCase() + this.value.slice(1);
});

// Gerçek zamanlı doğrulama
document.getElementById('firstName').addEventListener('input', validateName);
document.getElementById('lastName').addEventListener('input', validateName);
document.getElementById('tc').addEventListener('input', validateTCKN);
document.getElementById('phone').addEventListener('input', validatePhone);
document.getElementById('email').addEventListener('input', validateEmail);
document.getElementById('password').addEventListener('input', validatePassword);
document.getElementById('confirmPassword').addEventListener('input', validateConfirmPassword);

function validateName() {
    const name = this.value;
    if (name.length > 20) {
        this.setCustomValidity('İsim ve soyisim en fazla 20 karakter olabilir.');
    } else {
        this.setCustomValidity('');
    }
}

function validateTCKN() {
    const tckn = this.value;
    if (!validateTCKN(tckn)) {
        this.setCustomValidity('Geçersiz TC Kimlik Numarası.');
    } else {
        this.setCustomValidity('');
    }
}

function validatePhone() {
    const phone = this.value;
    if (phone.length !== 10 || isNaN(phone) || !phone.startsWith('5')) {
        this.setCustomValidity('Telefon numarası 10 haneli olmalı ve 5 ile başlamalıdır.');
    } else {
        this.setCustomValidity('');
    }
}

function validateEmail() {
    const email = this.value;
    const emailRegex = /^[^@]{5,}@[^@]+\.(com|gov|tr|org)$/;
    if (!emailRegex.test(email)) {
        this.setCustomValidity('Lütfen geçerli bir mail adresi giriniz.');
    } else {
        this.setCustomValidity('');
    }
}

function validatePassword() {
    const password = this.value;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
        this.setCustomValidity('Şifre en az bir büyük harf, bir küçük harf ve bir sayı içermelidir.');
    } else {
        this.setCustomValidity('');
    }
}

function validateConfirmPassword() {
    const confirmPassword = this.value;
    const password = document.getElementById('password').value;
    if (confirmPassword !== password) {
        this.setCustomValidity('Şifreler eşleşmiyor.');
    } else {
        this.setCustomValidity('');
    }
}

// Tarih Alanlarını Doldurma
function populateDateFields() {
    const daySelect = document.getElementById('day');
    const monthSelect = document.getElementById('month');
    const yearSelect = document.getElementById('year');

    // Günler (1-31)
    for (let i = 1; i <= 31; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        daySelect.appendChild(option);
    }

    // Aylar (1-12)
    for (let i = 1; i <= 12; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        monthSelect.appendChild(option);
    }

    // Yıllar (1920-2023)
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= 1920; i--) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        yearSelect.appendChild(option);
    }

    // Tarih alanlarını aktif hale getir
    daySelect.disabled = false;
    monthSelect.disabled = false;
    yearSelect.disabled = false;
}

// İl ve İlçe Seçimi
document.getElementById('city').addEventListener('change', function () {
    const city = this.value;
    const districtSelect = document.getElementById('district');

    // İlçe seçeneğini temizle
    districtSelect.innerHTML = '';

    // İlk seçeneği ekle (disabled ve selected)
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'İlçe seçiniz';
    defaultOption.disabled = true;
    defaultOption.selected = true;
    districtSelect.appendChild(defaultOption);

    if (city) {
        // İlçe seçeneklerini doldur
        const districts = {
            istanbul: ['Kadıköy', 'Beşiktaş', 'Üsküdar'],
            ankara: ['Çankaya', 'Keçiören', 'Yenimahalle'],
            izmir: ['Bornova', 'Karşıyaka', 'Konak'],
            berlin: ['Mitte', 'Friedrichshain', 'Kreuzberg'],
            madrid: ['Centro', 'Salamanca', 'Chamartín'],
            london: ['Westminster', 'Camden', 'Kensington']
        };
        districts[city].forEach(district => {
            const option = document.createElement('option');
            option.value = district;
            option.textContent = district;
            districtSelect.appendChild(option);
        });

        // İlçe seçeneğini aktif hale getir
        districtSelect.disabled = false;
    } else {
        // İl seçilmediyse ilçe seçeneğini devre dışı bırak
        districtSelect.disabled = true;
    }
});

// Şifre Görünürlüğünü Açma/Kapama
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const toggleIcon = input.nextElementSibling;

    if (input.type === "password") {
        input.type = "text";
        toggleIcon.textContent = "🐵"; // Açık maymun emojisi
    } else {
        input.type = "password";
        toggleIcon.textContent = "🙈"; // Kapalı maymun emojisi
    }
}

// Formu Temizleme
function resetForm() {
    document.getElementById('registrationForm').reset();
    document.getElementById('district').disabled = true;
    document.getElementById('district').innerHTML = '<option value="" disabled selected>İlçe seçiniz</option>';
    showMessage('Form temizlendi.', 'success');
}

// TCKN Doğrulama Fonksiyonu
function validateTCKN(tckn) {
    // Uzunluk Kontrolü
    if (tckn.length !== 11 || tckn[0] === '0') {
        return false;
    }

    // 10. Hanenin Hesaplanması
    const first9Digits = tckn.slice(0, 9).split('').map(Number);
    const oddDigitsSum = first9Digits[0] + first9Digits[2] + first9Digits[4] + first9Digits[6] + first9Digits[8];
    const evenDigitsSum = first9Digits[1] + first9Digits[3] + first9Digits[5] + first9Digits[7];
    const tenthDigit = ((oddDigitsSum * 7) - evenDigitsSum) % 10;

    // 11. Hanenin Hesaplanması
    const first10DigitsSum = first9Digits.reduce((sum, digit) => sum + digit, 0) + tenthDigit;
    const eleventhDigit = first10DigitsSum % 10;

    // TCKN'nin son iki hanesi ile karşılaştırma
    return tckn[9] == tenthDigit && tckn[10] == eleventhDigit;
}

// Form Gönderimi
document.getElementById('registrationForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const errors = []; // Hataları bu dizide topla

    // İsim ve Soyisim Kontrolü
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    if (firstName.length > 20 || lastName.length > 20) {
        errors.push('İsim ve soyisim en fazla 20 karakter olabilir.');
    }

    // Doğum Tarihi Kontrolü
    const day = document.getElementById('day').value;
    const month = document.getElementById('month').value;
    const year = document.getElementById('year').value;
    if (!day || !month || !year) {
        errors.push('Lütfen geçerli bir doğum tarihi seçiniz.');
    } else {
        const birthdate = new Date(year, month - 1, day);
        const today = new Date();
        let age = today.getFullYear() - birthdate.getFullYear();
        const monthDifference = today.getMonth() - birthdate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthdate.getDate())) {
            age--;
        }
        if (age < 18) {
            errors.push('18 yaşından küçükler kayıt olamaz.');
        }
        if (birthdate > today) {
            errors.push('Geçersiz doğum tarihi! Gelecekteki bir tarih girdiniz.');
        }
    }

    // TC Kimlik No Kontrolü
    const tckn = document.getElementById('tc').value;
    if (!validateTCKN(tckn)) {
        errors.push('Geçersiz TC Kimlik Numarası.');
    }

    // Telefon Numarası Kontrolü
    const phone = document.getElementById('phone').value;
    if (phone.length !== 10 || isNaN(phone) || !phone.startsWith('5')) {
        errors.push('Telefon numarası 10 haneli olmalı ve 5 ile başlamalıdır.');
    }

    // Mail Adresi Kontrolü
    const email = document.getElementById('email').value;
    const emailRegex = /^[^@]{5,}@[^@]+\.(com|gov|tr|org)$/;
    if (!emailRegex.test(email)) {
        errors.push('Lütfen geçerli bir mail adresi giriniz.');
    }

    // Şifre Kontrolü
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (password.length < 8) {
        errors.push('Şifre en az 8 karakter uzunluğunda olmalıdır.');
    }
    if (password !== confirmPassword) {
        errors.push('Şifreler eşleşmiyor.');
    }
    if (!passwordRegex.test(password)) {
        errors.push('Şifre en az bir büyük harf, bir küçük harf ve bir sayı içermelidir.');
    }

    // Hataları göster
    if (errors.length > 0) {
        showMessage(errors.join('<br>'), 'error'); // Hataları satır satır göster
    } else {
        showMessage('Kayıt başarılı!', 'success');
        // Formu göndermek için burada gerekli işlemleri yapabilirsiniz
    }
});

// Mesaj Gösterme Fonksiyonu
function showMessage(message, type) {
    const messageElement = document.getElementById('message');
    messageElement.innerHTML = message;
    messageElement.className = `message ${type}`;
}

// Dil değiştirme fonksiyonu
function changeLanguage(lang) {
    const translation = translations[lang];
    document.getElementById('header-title').textContent = translation.headerTitle;
    document.getElementById('header-description').textContent = translation.headerDescription;
    document.getElementById('label-firstName').textContent = translation.labelFirstName;
    document.getElementById('label-lastName').textContent = translation.labelLastName;
    document.getElementById('label-birthdate').textContent = translation.labelBirthdate;
    document.getElementById('label-tc').textContent = translation.labelTC;
    document.getElementById('label-phone').textContent = translation.labelPhone;
    document.getElementById('label-city').textContent = translation.labelCity;
    document.getElementById('label-district').textContent = translation.labelDistrict;
    document.getElementById('label-email').textContent = translation.labelEmail;
    document.getElementById('label-password').textContent = translation.labelPassword;
    document.getElementById('label-confirmPassword').textContent = translation.labelConfirmPassword;
    document.getElementById('password-info').textContent = translation.passwordInfo;
    document.getElementById('submit-button').textContent = translation.submitButton;
    document.getElementById('reset-button').textContent = translation.resetButton;
    document.getElementById('footer-text').textContent = translation.footerText;
}

// Sayfa yüklendiğinde tarih alanlarını doldur
window.onload = populateDateFields;