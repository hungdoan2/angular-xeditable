/*
Input types: text|email|tel|number|url|search|color|date|datetime|time|month|week
*/

(function() {

  var types = 'text|email|tel|number|url|search|color|date|datetime|time|month|week'.split('|');

  //todo: datalist
  
  // generate directives
  angular.forEach(types, function(type) {
    var directiveName = 'editable'+type.charAt(0).toUpperCase() + type.slice(1);
    angular.module('xeditable').directive(directiveName, ['editableDirectiveFactory',
      function(editableDirectiveFactory) {
        return editableDirectiveFactory({
          directiveName: directiveName,
          inputTpl: '<input type="'+type+'">',
          render: function() {
            this.parent.render.call(this);
            var inputDirective = this.attrs.oDirective;
            if(inputDirective)
            {
              var dparts = inputDirective.split('=');
              this.inputEl.attr(dparts[0],dparts[1] || '');              
            }
            
          }
        });
    }]);
  });

  //`range` is bit specific
  angular.module('xeditable').directive('editableRange', ['editableDirectiveFactory',
    function(editableDirectiveFactory) {
      return editableDirectiveFactory({
        directiveName: 'editableRange',
        inputTpl: '<input type="range" id="range" name="range">',
        render: function() {
          this.parent.render.call(this);
          this.inputEl.after('<output>{{$data}}</output>');
        }        
      });
  }]);

}());

