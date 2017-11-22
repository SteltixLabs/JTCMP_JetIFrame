/**
  Copyright (c) 2015, 2017, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
define(
  ['ojs/ojcore', 'knockout', 'jquery'],
  function (oj, ko, $) {
    'use strict';

    function iframeComponentModel(context) {
      var self = this;
      self.composite = context.element;

      self.source = ko.observable();

      self.addListener = function () {
        document.addEventListener('renderIframe', self.render);
      };
      self.render = function (e) {
        console.log("data into render event === " + e.detail);
        const newCode = self.prepareSource(e.detail);
        var iframe = document.querySelector('#output'),
          // Setup iFrame structure
        iframe_doc2 = iframe.contentDocument;
        // Write to iFrame
        console.log(newCode)
        iframe_doc2.open();
        iframe_doc2.write(newCode);
        iframe_doc2.close();
      }
      self.prepareSource = function (sourceCode) {


        var src = '';

        // Insert values into src template

        // HTML
        src = self.base_tpl.replace('</body>', sourceCode.html  + '</body>');
        //console.log(src);
        // var scrp = "<script type='text/javascript' src='http://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.2/require.min.js' />\n\t\t" +
        // "<link href='http://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css' rel='stylesheet' />\n\t\t" +
        // "<link href='http://static.oracle.com/cdn/jet/v4.0.0/default/css/alta/oj-alta-min.css rel='stylesheet' />\n\t\t"
        
        // CSS

        var css = '<style>' + sourceCode.css + '</style>';
        src = src.replace('</head>', css + '</head>');
        var js = '<script>'+sourceCode.js+'</script>';
        src = src.replace('</body>', js + '</body>');
        // console.log(src);
        // Libs css
        var libs = '<link href="//static.oracle.com/cdn/jet/v4.0.0/default/css/alta/oj-alta-min.css" rel="stylesheet"></link>';
        src = src.replace('</head>', libs + '</head>');
        //console.log(src);
        // libs js
        var libsJS = '<script src="http://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.2/require.min.js" type="text/javascript"></script>';
        src = src.replace('</head>', libsJS + '</head>');
        // Javascript
        
        //console.log(src);
        

        // return prepared src with textarea values inserted
        return src;
      }


      //{'knockout':'https://static.oracle.com/cdn/jet/v4.0.0/3rdparty/knockout/knockout-3.4.0','jquery':'https://static.oracle.com/cdn/jet/v4.0.0/3rdparty/jquery/jquery-3.1.1.min','jqueryui-amd':'https://static.oracle.com/cdn/jet/v4.0.0/3rdparty/jquery/jqueryui-amd-1.12.0.min','promise':'https://static.oracle.com/cdn/jet/v4.0.0/3rdparty/es6-promise/es6-promise.min','ojs':'https://static.oracle.com/cdn/jet/v4.0.0/default/js/debug','ojL10n':'https://static.oracle.com/cdn/jet/v4.0.0/default/js/ojL10n','ojtranslations':'https://static.oracle.com/cdn/jet/v4.0.0/default/js/resources','signals':'https://static.oracle.com/cdn/jet/v4.0.0/3rdparty/js-signals/signals.min','text':'https://static.oracle.com/cdn/jet/v4.0.0/3rdparty/require/text','hammerjs':'https://static.oracle.com/cdn/jet/v4.0.0/3rdparty/hammer/hammer-2.0.8.min','ojdnd':'https://static.oracle.com/cdn/jet/v4.0.0/3rdparty/dnd-polyfill/dnd-polyfill-1.0.0.min','customElements':'https://static.oracle.com/cdn/jet/v4.0.0/3rdparty/webcomponents/custom-elements.min'}
      // Base template - need to copy the base jet setup
      self.base_tpl =
        "<!doctype html>\n" +
        "<html>\n\t" +
        "<head>\n\t\t" +
        "<meta charset=\"utf-8\">\n\t\t" +
        "<title>Test Title</title>\n\n\t\t\n\t" +
        "</head>\n\t" +
        "<body>\n\t\n\t" +
        "</body>\n" +
        "</html>";

      
        self.cdnSetup = "";
      
        self.attached = function (context) {
        self.addListener();
      }
      context.props.then(function (propertyMap) {

        self.properties = propertyMap;
        console.log("props === " + self.properties.source)
        if (self.properties.width) {
          self.composite.width = self.properties.width;
        }
        if (self.properties.height) {
          self.composite.height = self.properties.height;
        }
        

      });
    };


    return iframeComponentModel;
  });
