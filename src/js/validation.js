(function(){
  "use strict";
function editableValidationRules(){
  var validatorFuncs={};//validator container
  var errorMsgs={};//validator container
  var rejectMsg = "There is an error white validate";
  /**
   * @namespace validationRule
   * @type {Object}
   */
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
        console.log("Your validation name : \""+options.validatorName+"\" already exists, we will override it");
      }
    // If there is no exist validator, then push it to the list
    validatorFuncs[options.validatorName] = options.validationFunc;
    errorMsgs[options.validatorName] = options.errorMsg;
  };//End addValidator
  
  /**
   * get validation Msg
   * @memberOf validationRule
   * @param  {string} validatorName 
   * @return {void}               
   */
  validationRule.getMsg = function(validatorName){
    return errorMsgs[validatorName];
  };
  validationRule.getValidatorFunc = function(validatorName){
    return validatorFuncs[validatorName];
  };
  validationRule.setRejectMsg = function(rejectMess){
     rejectMsg = rejectMess;
  };
  validationRule.getRejectMsg = function(rejectMsg){
    return rejectMsg;
  };
  return validationRule;
}

editableValidator.$inject = ["$q","editableValidationRules"];
function editableValidator($q,editableValidationRules){
   var validator = {};

   /**
    * run validator 
    * @param  {variant} value          [description]
    * @param  {String} validationName [description]
    * @param  {String} element        [description]
    * @return {promise}                [description]
    */
   function runValidate(value, validationName,element,scope){
    var deferred = $q.defer();
    var validateResult;
    var validatorFunc = editableValidationRules.getValidatorFunc(validationName);
    validateResult = validatorFunc(value,element,scope);
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
      },function(resolveData){
        deferred.resolve({
            isValid: false,
            msg : resolveData || editableValidationRules.getRejectMsg()
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

   /**
    * validate the input value by one-or-more defined validators
    * @param  {variant} value          
    * @param  {String} validatorNames 
    * @param  {element} element        
    * @return {boolean}                
    */
  validator.validate = function (value, validatorNames, element,scope){
    var validatorList = validatorNames.split(","),
        validatorName;
       
  
    var promiseList = [];

    for(var i = 0; i < validatorList.length; i++)
    {
      validatorName = validatorList[i].trim();
      promiseList.push(runValidate(value, validatorName,element,scope));
    }

    var promises = $q.all(promiseList).then(function(values){
      //After all promise is executed , check if it is valid
      
      for(var i = 0; i < values.length; i++)
      {
        if(!values[i].isValid)
        {
          // if there are any invalid data, return the invalid result imediately
          return values[i].msg;
        }
      }

      //if there is no invalid data, return the valid result 
      return true;
    });

    return promises;
  };

  return validator;
}

angular.module("xeditable")
  .factory("editableValidator",editableValidator)
  .factory("editableValidationRules",editableValidationRules);

}).call();
