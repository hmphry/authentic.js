export default (function(){
	let API = {};
	let settings, forms;
	let formsToValidate = [];
	const d = document;
	const defaultOptions = {
		containers: "form",
		correctClass: "correct",
		incorrectClass: "incorrect"
	}
	const hasAttributes = function(element, attrToFind){
		let attr = element.attributes;
		for(let i in attr){
			if(attr[i].name == attrToFind){
				return true
			}
		}
		return false
	}
	const getForms = function(){
		for(let i in forms){
			if(!hasAttributes(forms[i], "novalidate") && forms[i].tagName){
				formsToValidate.push({form: forms[i], fields: getFields(forms[i].getElementsByTagName("*"))});
			}
		}	
	}
	const initializeForm = function(){
		for(let i in formsToValidate){
			formsToValidate[i].form.onsubmit = function(e){
				if(validateForm(formsToValidate[i])){
					e.preventDefault()
				}
			}
		}
	}
	const validateForm = function(form){
		let formResponse = true;
		for(let i in form.fields){
			if(!validateField(form.fields[i])){
				formResponse = false;
			}
		}
		if(formResponse){
			form.form.classList.remove(settings.incorrectClass);
			form.form.classList.add(settings.correctClass);
			return false;
		} else{
			form.form.classList.remove(settings.correctClass);
			form.form.classList.add(settings.incorrectClass);
			return true;
		}
	}
	const getFields = function(childern){
		let formChildern = [];
		for(let i in childern){
			let tag = childern[i].tagName;
			if(!hasAttributes(childern[i], 'novalidate') && (tag == 'INPUT' || tag == 'TEXTAREA' || tag == 'SELECT')){
				let type = childern[i].getAttribute('type');
				if(tag == 'INPUT' && (type == 'radio' || type == 'checkbox')){
					let nameFound = false;
					let thisName = childern[i].getAttribute('name');
					for(let n in formChildern){
						if(formChildern[n].name == thisName){
							nameFound = formChildern[n];
						}
					}
					if(nameFound){
						nameFound.element.push(childern[i]);
					} else{
						formChildern.push({name: childern[i].getAttribute('name'), element: [childern[i]], tag, type});
					}
				} else if(tag == 'TEXTAREA'){
					formChildern.push({name: false, element: childern[i], defaultValue: childern[i].value, tag, type});
				} else if(tag == 'SELECT'){
					formChildern.push({name: false, element: childern[i], defaultValue: childern[i].value, tag, type})
				} else{
					formChildern.push({name: childern[i].getAttribute('name') || false, element: childern[i], defaultValue: childern[i].value || childern[i].placeholder, tag, type});
				}
			}
		}
		return formChildern;
	}	
	const validateField = function({defaultValue, element, field, type, name, tag}){
		if(type == 'radio' || type == 'checkbox'){
			let isValid = false;
			for(var i in element){
				if(element[i].checked){
					isValid = true;
				}
			}
			for(var i in element){
				if(isValid){
					element[i].classList.remove(settings.incorrectClass)
					element[i].classList.add(settings.correctClass)
				} else{
					element[i].classList.remove(settings.correctClass)
					element[i].classList.add(settings.incorrectClass)
				}
			}
			if(isValid){
				return true;
			} else{
				return false;
			}
		}
		if(element.value == defaultValue || element.value == ''){
			element.classList.remove(settings.correctClass)
			element.classList.add(settings.incorrectClass)
			return false
		}
		element.classList.remove(settings.incorrectClass)
		element.classList.add(settings.correctClass)
		return true;
	}
	const validationMethods = {
		inputElement(){
			
		},
		textareaElement(){
			
		},
		selectElement(){
			
		}
	}
	// initialize function
	API.init = function(options = {}){
		settings = Object.assign({}, defaultOptions, options);
		forms = document.querySelectorAll(settings.containers);
		getForms();
		initializeForm();
	};
	return API;
})();