(function () {
    angular.module('xeditable')
        .run(['editableValidationRules',
            function (editableValidationRules) {
                function number(value)
                {
                    var patt = new RegExp(/^\d+$/);
                    return !(value && !patt.test(value));
                }
                function email(value)
                {
                    var patt = new RegExp(/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/);
                    return !(value && !patt.test(value));
                }
                function required(value)
                {
                    return value && ((typeof (value) === "string") && value.length > 0);
                }
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

                editableValidationRules.addValidator({
                    validatorName:'email',
                    errorMsg: 'Your email address is not valid',
                    validationFunc: email
                });
            }
        ]);
}).call();
