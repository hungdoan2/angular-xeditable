/*
Angular-ui bootstrap datepicker
http://angular-ui.github.io/bootstrap/#/datepicker
*/
angular.module('xeditable').directive('editableCustom', ['editableDirectiveFactory', '$templateCache','$parse',
  function(editableDirectiveFactory,$templateCache,$parse) {
    return editableDirectiveFactory({
      directiveName: 'editableCustom',
      inputTpl: '<div></div>',
      render: function() {
        var self = this;
        self.parent.render.call(this);

        var html = '';
        if(!angular.isDefined(self.attrs.eTemplate))
        {
          console.log('Your "'+self.attrs.eTemplate+'" does not exist!');
        }        
        html = $templateCache.get($parse(self.attrs.eTemplate)(self.scope));
        self.inputEl.append(html);
        //Generate model;
        //var parser = $parse(self.name);
        //var defaultValue = parser(self.scope);
        //self.scope[self.name.split('.')[0]] = {};
        //parser.assign(self.scope,defaultValue);
        //
        self.scope.$modelScope = self.scope;
      }
    });
}]);