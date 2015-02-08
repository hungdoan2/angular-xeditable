(function () {
    angular.module('xeditable')
        .run(['editableValidationRules',
            function (editableValidationRules) {
                function max300chars(value)
                {
                    return value.length <=300;
                }
                function number(value)
                {
                    var patt = new RegExp(/^\d+$/);
                    return patt.test(value);
                }
                function required(value)
                {
                    return (!!value) && (typeof (value === "String") && value.trim().length > 0);
                }
                editableValidationRules.addValidator({
                    validatorName:'max300chars',
                    errorMsg: 'Max 300 characters',
                    validationFunc: max300chars
                });
                editableValidationRules.addValidator({
                    validatorName:'required',
                    errorMsg: 'Required',
                    validationFunc: required
                });
                editableValidationRules.addValidator({
                    validatorName:'number',
                    errorMsg: 'Have to be a number',
                    validationFunc: number
                });
            }
        ]);
}).call();
