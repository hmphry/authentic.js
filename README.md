# authentic.js
Authentic.js is a dependency-free, JavaScript client-side form validator. 

## Getting Started
To begin, copy the file which fits your system. Once intergrated, authentic.js currently outputs on method, `authentic.init({containers: "DOM", correctClass: "string", incorrectClass: "string"})`.

### Params
`containers` is the DOM element tree to the form you'd like to target. By default, authentic.js will search for the `form` element. It will ignore any form, or field in a valid form, with the `novalidate` attribute.
	
`correctClass` the class that will be applied to the field and form if they validate correctly.
	
`incorrectClass` the class that will be applied to the field and form if they validate incorrectly.
	
### Fields
Right now, authentic.js will check against empty or unchanged inputs, checkbox, radio, select, and textarea elements. It determines the default value by first looking at the `value` attribute or the `placeholder` attribute.
	
## Road Map
Right now, authentic.js is in prerelease. A full road map will be in the issues under the improvements milestone, however my main goal is intergrating all over form types and creating a demo page.
