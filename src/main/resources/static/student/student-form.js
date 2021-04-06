function validationInput() {
    let result = true;
    const $firstName = $('#first-name');
    const $lastName = $('#last-name');
    const $email = $('#email');
    const $birthDate = $('#birth-date');
//TODO - sprobowac to zrobic krocej
    $firstName.removeClass('is-invalid');
    $firstName.removeClass('is-valid');
    $lastName.removeClass('is-invalid');
    $lastName.removeClass('is-valid');
    $email.removeClass('is-invalid');
    $email.removeClass('is-valid');
    $birthDate.removeClass('is-invalid');
    $birthDate.removeClass('is-valid');
    //
    if ($firstName.val().length < 1) {
        $firstName.addClass('is-invalid');
        result = false;
        console.log("result $firstName: " + result);
    } else {
        $firstName.addClass('is-valid');
    }
    if ($lastName.val().length < 1) {
        $lastName.addClass('is-invalid');
        result = false;
        console.log("result $lastName: " + result);
    } else {
        $lastName.addClass('is-valid');
    }
    if (($email.val().length < 1) || !validateEmail($email.val())) {
        $email.addClass('is-invalid');
        result = false;
        console.log("result $email: " + result);
    } else {
        $email.addClass('is-valid');
    }
    if (!validateDate($birthDate.val())) {
        $birthDate.addClass('is-invalid');
        console.log("result $birthDate: " + result);
        result = false;
    } else {
        $birthDate.addClass('is-valid');
    }
    return result;
}

function addStudent() {
    if (!validationInput()) {
        console.log("validationInput: " + validationInput());
        return;
    }
    let $firstName = $('#first-name');
    let $lastName = $('#last-name');
    let $email = $('#email');
    let $birthDate = $('#birth-date');
    let student = {
        firstName: $firstName.val(),
        lastName: $lastName.val(),
        email: $email.val(),
        birthDate: $birthDate.val()
    };
    const stringStudent = JSON.stringify(student);
    console.log("addStudent()");
    console.log("student: " + stringStudent);
    $.ajax({
        url: "/rest/student",
        contentType: "application/json",
        dataType: "json",
        data: stringStudent,
        method: "POST",
        success: function (result) {
            console.log(result);
        }
    })
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validateDate(dateString) {
    if (dateString.length !== 10) {
        return false;
    }
    // Parse the date parts to integers
    const parts = dateString.split("-");
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const day = parseInt(parts[2], 10);
    // Check the ranges of month and year
    if (year < 1960 || year > 2005 || month === 0 || month > 12)
        return false;
    const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    // Adjust for leap years
    if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0))
        monthLength[1] = 29;
    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
}