'use strict';
var authentic = function () {
    var API = {};
    var settings = undefined, forms = undefined;
    var formsToValidate = [];
    var d = document;
    var defaultOptions = {
        containers: 'form',
        correctClass: 'correct',
        incorrectClass: 'incorrect'
    };
    var hasAttributes = function hasAttributes(element, attrToFind) {
        var attr = element.attributes;
        for (var i in attr) {
            if (window.CP.shouldStopExecution(1)) {
                break;
            }
            if (attr[i].name == attrToFind) {
                return true;
            }
        }
        window.CP.exitedLoop(1);
        return false;
    };
    var getForms = function getForms() {
        for (var i in forms) {
            if (window.CP.shouldStopExecution(2)) {
                break;
            }
            if (!hasAttributes(forms[i], 'novalidate') && forms[i].tagName) {
                formsToValidate.push({
                    form: forms[i],
                    fields: getFields(forms[i].childNodes)
                });
            }
        }
        window.CP.exitedLoop(2);
    };
    var initializeForm = function initializeForm() {
        var _loop = function _loop(i) {
            formsToValidate[i].form.onsubmit = function (e) {
                if (validateForm(formsToValidate[i])) {
                    e.preventDefault();
                }
            };
        };
        for (var i in formsToValidate) {
            if (window.CP.shouldStopExecution(3)) {
                break;
            }
            _loop(i);
        }
        window.CP.exitedLoop(3);
    };
    var validateForm = function validateForm(form) {
        var formResponse = true;
        for (var i in form.fields) {
            if (window.CP.shouldStopExecution(4)) {
                break;
            }
            if (!validateField(form.fields[i])) {
                formResponse = false;
            }
        }
        window.CP.exitedLoop(4);
        if (formResponse) {
            form.form.classList.remove(settings.incorrectClass);
            form.form.classList.add(settings.correctClass);
            return false;
        } else {
            form.form.classList.remove(settings.correctClass);
            form.form.classList.add(settings.incorrectClass);
            return true;
        }
    };
    var getFields = function getFields(childern) {
        var formChildern = [];
        for (var i in childern) {
            if (window.CP.shouldStopExecution(6)) {
                break;
            }
            var tag = childern[i].tagName;
            if (!hasAttributes(childern[i], 'novalidate') && (tag == 'INPUT' || tag == 'TEXTAREA' || tag == 'SELECT')) {
                var type = childern[i].getAttribute('type');
                if (tag == 'INPUT' && (type == 'radio' || type == 'checkbox')) {
                    var nameFound = false;
                    var thisName = childern[i].getAttribute('name');
                    for (var n in formChildern) {
                        if (window.CP.shouldStopExecution(5)) {
                            break;
                        }
                        if (formChildern[n].name == thisName) {
                            nameFound = formChildern[n];
                        }
                    }
                    window.CP.exitedLoop(5);
                    if (nameFound) {
                        nameFound.element.push(childern[i]);
                    } else {
                        formChildern.push({
                            name: childern[i].getAttribute('name'),
                            element: [childern[i]],
                            tag: tag,
                            type: type
                        });
                    }
                } else if (tag == 'TEXTAREA') {
                    formChildern.push({
                        name: false,
                        element: childern[i],
                        defaultValue: childern[i].value,
                        tag: tag,
                        type: type
                    });
                } else if (tag == 'SELECT') {
                    formChildern.push({
                        name: false,
                        element: childern[i],
                        defaultValue: childern[i].value,
                        tag: tag,
                        type: type
                    });
                } else {
                    formChildern.push({
                        name: childern[i].getAttribute('name') || false,
                        element: childern[i],
                        defaultValue: childern[i].value || childern[i].placeholder,
                        tag: tag,
                        type: type
                    });
                }
            }
        }
        window.CP.exitedLoop(6);
        return formChildern;
    };
    var validateField = function validateField(_ref) {
        var defaultValue = _ref.defaultValue;
        var element = _ref.element;
        var field = _ref.field;
        var type = _ref.type;
        var name = _ref.name;
        var tag = _ref.tag;
        if (type == 'radio' || type == 'checkbox') {
            var isValid = false;
            for (var i in element) {
                if (window.CP.shouldStopExecution(7)) {
                    break;
                }
                if (element[i].checked) {
                    isValid = true;
                }
            }
            window.CP.exitedLoop(7);
            for (var i in element) {
                if (window.CP.shouldStopExecution(8)) {
                    break;
                }
                if (isValid) {
                    element[i].classList.remove(settings.incorrectClass);
                    element[i].classList.add(settings.correctClass);
                } else {
                    element[i].classList.remove(settings.correctClass);
                    element[i].classList.add(settings.incorrectClass);
                }
            }
            window.CP.exitedLoop(8);
            if (isValid) {
                return true;
            } else {
                return false;
            }
        }
        if (element.value == defaultValue || element.value == '') {
            element.classList.remove(settings.correctClass);
            element.classList.add(settings.incorrectClass);
            return false;
        }
        element.classList.remove(settings.incorrectClass);
        element.classList.add(settings.correctClass);
        return true;
    };
    var validationMethods = {
        inputElement: function inputElement() {
        },
        textareaElement: function textareaElement() {
        },
        selectElement: function selectElement() {
        }
    };
    API.init = function () {
        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
        settings = Object.assign({}, defaultOptions, options);
        forms = document.querySelectorAll(settings.containers);
        getForms();
        initializeForm();
    };
    return API;
}();
authentic.init();