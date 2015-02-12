'use trick';
(function(){
function editableValidationRules(){
  var validatorFuncs={};//validator container
  var errorMsgs={};//validator container
  var validationRule={};

  /**
   * addValidator description
   * @param {object} options input
   * @param {string} options.validatorName validation name
   * @param {string} options.errorMsg error msg
   * @param {function} options.validatorFunc function to validate
   */
  validationRule.addValidator = function (options){

    //check if current validationName isExist
    if(angular.isDefined(validatorFuncs[options.validatorName]))
      {
        throw 'Your validation name : "'+options.validatorName+'" already exists';
      }
    // If there is no exist validator, then push it to the list
    validatorFuncs[options.validatorName] = options.validationFunc;
    errorMsgs[options.validatorName] = options.errorMsg;
  };//End addValidator
  
  validationRule.getMsg = function(validatorName){
    return errorMsgs[validatorName];
  };
  validationRule.getValidatorFunc = function(validatorName){
    return validatorFuncs[validatorName];
  };
  /*validationRule.validatorIsExist = function(varlidatorNames){
    var validatorList = varlidatorNames.split(',');
    for(var i = 0; i < validatorList.length; i++)
    {
      if(!angular.isDefined(validatorFuncs[validatorList[i].trim()]))
      {
        return false;
      }
    }
    return true;
  };//End validatorIsExist*/
  return validationRule;
}

editableValidator.$inject = ['$q','editableValidationRules'];
function editableValidator($q,editableValidationRules){
   var validator = {};
   function runValidate(value, validationName){
    var deferred = $q.defer();
    var validateResult;
    var validatorFunc = editableValidationRules.getValidatorFunc(validationName);
    validateResult = validatorFunc(value);
    if(angular.isObject(validateResult))
    {
      validateResult.then(function(result){
        if(result)
        {
          deferred.resolve({
            isValid: true}
            );
        }
        else{
          deferred.resolve({
            isValid: false,
            msg : editableValidationRules.getMsg(validationName)
          });
        }
      },function(){
        deferred.resolve({
            isValid: false,
            msg : editableValidationRules.getMsg(validationName)
          });
      });
    }
    else if(validateResult){
      deferred.resolve({
        isValid: true
      });
    }
    else{
     deferred.resolve({
        isValid: false,
        msg : editableValidationRules.getMsg(validationName)
      });
    }
    return deferred.promise;
   }
  validator.validate = function (value, validatorNames){
    var validatorList = validatorNames.split(','),
        validatorName;
       
  
    var promiseList = [];

    for(var i = 0; i < validatorList.length; i++)
    {
      validatorName = validatorList[i].trim();
      promiseList.push(runValidate(value, validatorName));
    }

    var promises = $q.all(promiseList).then(function(values){
      for(var i = 0; i < values.length; i++)
      {
        if(!values[i].isValid)
        {
          return values[i].msg;
        }
      }
      return true;
    });

    return promises;
  };

  return validator;
}

angular.module('xeditable')
  .factory('editableValidator',editableValidator)
  .factory('editableValidationRules',editableValidationRules);

}).call();
