To validate a form field you can add `o-validator` attribute to validate your input. `o-validator` can be inputed by multiple validator(which are seperated by comma).  
Ex: `<a href="#" o-validator="required,max300chars"` 

To define your own validation rule, you have to config your rules in `editableValidationRules` factory.  
Ex:   
	`	editableValidationRules.addValidator({`  
	`		validatorName:'max300chars',   `  
	`		errorMsg: 'Max 300 characters',  `  
	`		validationFunc: max300chars  `  
	`	});`  