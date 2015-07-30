/*
Angular-ui bootstrap datepicker
http://angular-ui.github.io/bootstrap/#/datepicker
*/
angular.module('xeditable').directive('editableUiselect', ['editableDirectiveFactory', '$templateCache','$parse',
  function(editableDirectiveFactory,$templateCache,$parse) {
    return editableDirectiveFactory({
      directiveName: 'editableUiselect',
      inputTpl: '<div ui-select></div>',
      render: function() {
        this.parent.render.call(this);
        console.log(this.scope.addressInputTplId);
        var html = '';
        if(angular.isDefined(this.attrs.eTemplate))
        {
          html = $templateCache.get($parse(this.attrs.eTemplate)(this.scope));
          if(!angular.isDefined(html))
          {
            console.log('Your "'+this.attrs.eTemplate+'" does not exist!');
            throw 'Your "'+this.attrs.eTemplate+'" does not exist!';
          }
        }
        else{
          var displayName = this.attrs.eDisplaynamekey,
              valueKey = this.attrs.eValuekey,
              dataSource = this.attrs.eDatasrc;
              html = ''
+'<ui-select-match placeholder="Enter your input...">{{$select.selected.'+displayName+'}}</ui-select-match>'
+'<ui-select-choices '
+'repeat="item.'+valueKey+' as item in '+dataSource
+' | uiSelectSearchFilter: {'+displayName+': $select.search}">'
+'<div ng-bind-html="item.'+displayName+' | highlight:$select.search"></div>'
+'</ui-select-choices>';
        }
        this.inputEl.attr('ng-model','_selectedValue');
        this.inputEl.attr('on-select','$parent.$data = $model');
        this.inputEl.append(html);
      }
    });
}]);