/*
 *  es6-module-loader v0.5.0
 *  https://github.com/ModuleLoader/es6-module-loader
 *  Implemented to the 2013-12-02 ES6 module specification draft
 *  Copyright (c) 2014 Guy Bedford, Luke Hoban, Addy Osmani; Licensed MIT
 */
!function(a){var b="undefined"!=typeof window,c=b?function(a){setTimeout(a,1)}:process.nextTick,d=a.Promise;if(d)if(d.all&&d.resolve&&d.reject){d=a.Promise;{new d(function(a){"function"!=typeof a&&(d=null)})}}else d=null;d||(d=function(a,b,c){function d(a,b){return(typeof b)[0]==a}function e(a,h){return h=function i(j,k,l,m,n,o){function p(a){return function(b){n&&(n=0,i(d,a,b))}}if(m=i.q,j!=d)return e(function(a,b){m.push({p:this,r:a,j:b,1:j,0:k})});if(l&&d(b,l)|d(c,l))try{n=l.then}catch(q){k=0,l=q}if(d(b,n))try{n.call(l,p(1),k=p(0))}catch(q){k(q)}else for(h=f(a,l,k),o=0;o<m.length;)n=m[o++],d(b,j=n[k])?g(n.p,n.r,n.j,l,j):(k?n.r:n.j)(l)},h.q=[],a.call(a={then:function(a,b){return h(a,b)},"catch":function(a){return h(0,a)}},function(a){h(d,1,a)},function(a){h(d,0,a)}),a}function f(a,c,f){return function(h,i){return d(b,h=f?h:i)?e(function(a,b){g(this,a,b,c,h)}):a}}function g(e,f,g,h,i){a(function(){try{h=i(h),i=h&&d(c,h)|d(b,h)&&h.then,d(b,i)?h==e?g(new TypeError):i.call(h,f,g):f(h)}catch(a){g(a)}})}return e.resolve=function(a){return e(function(b){b(a)})},e.reject=function(a){return e(function(b,c){c(a)})},e.all=function(b){return new e(function(c,d){if(!b.length)return a(c);for(var e=[],f=0,g=0,h=b.length;h>g;g++)(function(a){b[a].then(function(d){e[a]=d,f++,f==b.length&&c(e)},d)})(g)})},e}(c,"f","o")),"object"==typeof exports&&(module.exports=d),a.Promise||(a.Promise=d),a.PromisePolyfill=d}("undefined"!=typeof global?global:this),function(a){function b(a,b){b||console.log("Assertion Failed - "+a)}function c(a){return{status:"loading",name:a,metadata:{},linkSets:[]}}function d(a,d,f,g){return new x(function(b){b(a.normalize(d,f,g))}).then(function(d){var f;if(a._modules[d])return f=c(d),f.status="linked",f;for(var g=0,h=a._loads.length;h>g;g++)if(f=a._loads[g],f.name==d)return b("loading or loaded","loading"==f.status||"loaded"==f.status),f;return f=c(d),a._loads.push(f),e(a,f),f})}function e(a,b){f(a,b,x.resolve().then(function(){return a.locate({name:b.name,metadata:b.metadata})}))}function f(a,b,c){g(a,b,c.then(function(c){return"failed"==b.status?void 0:(b.address=c,a.fetch({name:b.name,metadata:b.metadata,address:c}))}))}function g(a,c,e){e.then(function(b){return"failed"==c.status?void 0:a.translate({name:c.name,metadata:c.metadata,address:c.address,source:b})}).then(function(b){return"failed"==c.status?void 0:(c.source=b,a.instantiate({name:c.name,metadata:c.metadata,address:c.address,source:b}))}).then(function(e){if("failed"==c.status)return void 0;var f;if(void 0===e){if(C){c.address=c.address||"anon"+ ++D;var g=new C.syntax.Parser(new C.syntax.SourceFile(c.address,c.source)),h=g.parseModule();f=t(h),c.body=new C.codegeneration.module.AttachModuleNameTransformer(c.name).transformAny(h)}else{var j=c.source.match(B);if(!j)throw new TypeError("Include Traceur for module syntax support");f=[j[1]||j[2]]}c.kind="declarative"}else{if("object"!=typeof e)throw TypeError("Invalid instantiate return value");f=e.deps||[],c.execute=e.execute,c.kind="dynamic"}c.dependencies={},c.depsList=f;for(var k=[],l=0,m=f.length;m>l;l++)(function(e){var f=d(a,e,c.name,c.address);f.then(function(a){if(b("not already a dependency",!c.dependencies[e]),c.dependencies[e]=a.name,"linked"!=a.status)for(var d=c.linkSets.concat([]),f=0,g=d.length;g>f;f++)i(d[f],a)}),k.push(f)})(f[l]);return x.all(k)}).then(function(){b("is loading","loading"==c.status),c.status="loaded";for(var a=c.linkSets.concat([]),d=0,e=a.length;e>d;d++)j(a[d],c)},function(a){b("is loading on fail","loading"==c.status),c.status="failed",c.exception=a;for(var d=0,e=c.linkSets.length;e>d;d++)k(c.linkSets[d],a);b("fail linkSets removed",0==c.linkSets.length)})}function h(a,b){var c,d,e=new x(function(a,b){c=a,d=b}),f={loader:a,loads:[],done:e,resolve:c,reject:d,loadingCount:0};return i(f,b),f}function i(a,c){b("loading or loaded on link set","loading"==c.status||"loaded"==c.status);for(var d=0,e=a.loads.length;e>d;d++)if(a.loads[d]==c)return;a.loads.push(c),c.linkSets.push(a),"loaded"!=c.status&&a.loadingCount++;var f=a.loader;for(var g in c.dependencies){var h=c.dependencies[g];if(!f._modules[h])for(var d=0,e=f._loads.length;e>d;d++)if(f._loads[d].name==h){i(a,f._loads[d]);break}}}function j(a,c){if(b("loaded or linked","loaded"==c.status||"linked"==c.status),a.loadingCount--,!(a.loadingCount>0)){var d=a.loads[0];try{q(a.loads,a.loader)}catch(e){return k(a,e)}b("loads cleared",0==a.loads.length),a.resolve(d)}}function k(a,c){for(var d=a.loads.concat([]),e=0,f=d.length;f>e;e++){var g=d[e],h=z.call(g.linkSets,a);if(b("link not present",-1!=h),g.linkSets.splice(h,1),0==g.linkSets.length){var i=z.call(a.loader._loads,g);-1!=i&&a.loader._loads.splice(i,1)}}a.reject(c)}function l(a,c){c.name&&(b("load not in module table",!a._modules[c.name]),a._modules[c.name]=c.module);var d=z.call(a._loads,c);-1!=d&&a._loads.splice(d,1);for(var e=0,f=c.linkSets.length;f>e;e++)d=z.call(c.linkSets[e].loads,c),c.linkSets[e].loads.splice(d,1);c.linkSets=[]}function m(a,b,c){return new x(n(a,b,c&&c.address?"fetch":"locate",void 0,c&&c.address,void 0)).then(function(a){return a})}function n(a,d,i,j,k,l){return function(m,n){if(a._modules[d])throw new TypeError('Module "'+d+'" already exists in the module table');for(var o=0,p=a._loads.length;p>o;o++)if(a._loads[o].name==d)throw new TypeError('Module "'+d+'" is already loading');var q=c(d);j&&(q.metadata=j);var r=h(a,q);a._loads.push(q),r.done.then(m,n),"locate"==i?e(a,q):"fetch"==i?f(a,q,x.resolve(k)):(b("translate step","translate"==i),q.address=k,g(a,q,x.resolve(l)))}}function o(a,c){return b("is linked "+c.name,"linked"==c.status),p(c.module,a),b("is a module",c.module.module instanceof v),c.module.module}function p(b,c){if(b.module)return b.module;for(var d in b.dependencies){var e=b.dependencies[d];c._modules[e].module||p(c._modules[e],c)}C.options.sourceMaps=!0,C.options.modules="instantiate";var f=new C.util.ErrorReporter;f.reportMessageInternal=function(a,b){throw b+"\n"+a};var g=new C.codegeneration.FromOptionsTransformer(f),h=g.transform(b.body);delete b.body;var i=new C.outputgeneration.SourceMapGenerator({file:b.address}),j={sourceMapGenerator:i},k=C.outputgeneration.TreeWriter.write(h,j);a.btoa&&(k+="\n//# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(j.sourceMap)))+"\n");var l=System.register;System.register=function(c,d,e){for(var f=0;f<d.length;f++)d[f]=b.dependencies[d[f]];b.module=new v(e.apply(a,d))},u(k,a,b.address,b.name),System.register=l}function q(a,b){for(var c=!1;a.length;){c=!0;a:for(var d=0;d<a.length;d++){var e=a[d],f=[];for(var g in e.dependencies){var h=e.dependencies[g];if(!b._modules[h])continue a;var i=e.depsList.indexOf(g);f[i]=h}if(c=!1,"declarative"==e.kind)e.module={name:e.name,dependencies:e.dependencies,body:e.body};else{var j=e.execute.apply(null,f);if(!(j instanceof v))throw new TypeError("Execution must define a Module instance");e.module={module:j}}e.status="linked",l(b,e)}if(c)throw new TypeError("Circular dependencies not supported by the polyfill")}}function r(a){if("object"!=typeof a)throw new TypeError("Options must be an object");a.normalize&&(this.normalize=a.normalize),a.locate&&(this.locate=a.locate),a.fetch&&(this.fetch=a.fetch),a.translate&&(this.translate=a.translate),a.instantiate&&(this.instantiate=a.instantiate),w(this,"global",{get:function(){throw new TypeError("global accessor not provided by polyfill")}}),w(this,"realm",{get:function(){throw new TypeError("Realms not implemented in polyfill")}}),this._modules={},this._loads=[]}function s(a,b,c,d){var e,f;if(b(a,c,d)!==!1)for(e in a)a.hasOwnProperty(e)&&"location"!=e&&"type"!=e&&(f=a[e],"object"==typeof f&&null!==f&&s(f,b,a,e))}function t(a){function b(a){-1==z.call(c,a)&&c.push(a)}var c=[];return s(a,function(a){"EXPORT_DECLARATION"==a.type?a.declaration.moduleSpecifier&&b(a.declaration.moduleSpecifier.token.processedValue):"IMPORT_DECLARATION"==a.type?b(a.moduleSpecifier.token.processedValue):"MODULE_DECLARATION"==a.type&&b(a.expression.token.processedValue)}),c}function u(a,b,c,d){try{Function("global",'var __moduleName = "'+(d||"").replace('"','"')+'"; with(global) { '+a+" \n }"+(c&&!a.match(/\/\/[@#] ?(sourceURL|sourceMappingURL)=([^\n]+)/)?"\n//# sourceURL="+c:"")).call(b,b)}catch(e){throw"SyntaxError"==e.name&&(e.message="Evaluating "+c+"\n	"+e.message),e}}function v(a){if("object"!=typeof a)throw new TypeError("Expected object");if(!(this instanceof v))return new v(a);var b=this;for(var c in a)!function(a,c){w(b,a,{configurable:!1,enumerable:!0,get:function(){return c}})}(c,a[c]);Object.preventExtensions&&Object.preventExtensions(this)}var w,x=a.Promise||require("./promise");try{Object.defineProperty({},"a",{})&&(w=Object.defineProperty)}catch(y){w=function(a,b,c){a[b]=c.value||c.get.call(a)}}var z=Array.prototype.indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(this[b]===a)return b;return-1},A={};r.prototype={define:function(a,b,c){if(A[a])throw new TypeError("Module is already loading.");return A[a]=new x(n(this,a,c&&c.address?"fetch":"translate",c&&c.meta||{},c&&c.address,b)),A[a].then(function(){delete A[a]})},load:function(a,b){return this._modules[a]?(p(this._modules[a],this),x.resolve(this._modules[a].module)):A[a]?A[a]:(A[a]=m(this,a,b),A[a].then(function(){delete A[a]}))},module:function(a,b){var d=c();d.address=b&&b.address;var e=h(this,d),f=x.resolve(a),i=this,j=e.done.then(function(){return o(i,d)});return g(this,d,f),j},"import":function(a,b){if(this._modules[a])return p(this._modules[a],this),x.resolve(this._modules[a].module);var c=this;return(A[a]||(A[a]=m(this,a,b))).then(function(b){return delete A[a],o(c,b)})},eval:function(){throw new TypeError("Eval not implemented in polyfill")},get:function(a){return p(this._modules[a],this),this._modules[a].module},has:function(a){return!!this._modules[a]},set:function(a,b){if(!(b instanceof v))throw new TypeError("Set must be a module");this._modules[a]={module:b}},"delete":function(a){return this._modules[a]?delete this._modules[a]:!1},entries:function(){throw new TypeError("Iteration not yet implemented in the polyfill")},keys:function(){throw new TypeError("Iteration not yet implemented in the polyfill")},values:function(){throw new TypeError("Iteration not yet implemented in the polyfill")},normalize:function(a){return a},locate:function(a){return a.name},fetch:function(){throw new TypeError("Fetch not implemented")},translate:function(a){return a.source},instantiate:function(){}};var B=/^\s*export\s*\*\s*from\s*(?:'([^']+)'|"([^"]+)")/,C=a.traceur;$traceurRuntime.ModuleStore.get=$traceurRuntime.getModuleImpl=function(a){return System.get(a)};var D=0;"object"==typeof exports&&(module.exports=r),a.Loader||(a.Loader=r),a.LoaderPolyfill=r,a.Module||(a.Module=v)}("undefined"!=typeof global?global:this),function(a){function b(a){var b=String(a).replace(/^\s+|\s+$/g,"").match(/^([^:\/?#]+:)?(\/\/(?:[^:@]*(?::[^:@]*)?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/);return b?{href:b[0]||"",protocol:b[1]||"",authority:b[2]||"",host:b[3]||"",hostname:b[4]||"",port:b[5]||"",pathname:b[6]||"",search:b[7]||"",hash:b[8]||""}:null}function c(a,c){function d(a){var b=[];return a.replace(/^(\.\.?(\/|$))+/,"").replace(/\/(\.(\/|$))+/g,"/").replace(/\/\.\.$/,"/../").replace(/\/?[^\/]*/g,function(a){"/.."===a?b.pop():b.push(a)}),b.join("").replace(/^\//,"/"===a.charAt(0)?"/":"")}return c=b(c||""),a=b(a||""),c&&a?(c.protocol||a.protocol)+(c.protocol||c.authority?c.authority:a.authority)+d(c.protocol||c.authority||"/"===c.pathname.charAt(0)?c.pathname:c.pathname?(a.authority&&!a.pathname?"/":"")+a.pathname.slice(0,a.pathname.lastIndexOf("/")+1)+c.pathname:a.pathname)+(c.protocol||c.authority||c.pathname?c.search:c.search||a.search)+c.hash:null}var d,e="undefined"!=typeof window,f=a.Loader||require("./loader"),g=a.Promise||require("./promise");if(e)d=function(a,b,c){function d(){b(f.responseText)}function e(){c(f.statusText+": "+a||"XHR error")}var f=new XMLHttpRequest,g=!0;if(!("withCredentials"in f)){var h=/^(\w+:)?\/\/([^\/]+)/.exec(a);h&&(g=h[2]===window.location.host,h[1]&&(g&=h[1]===window.location.protocol))}g||(f=new XDomainRequest,f.onload=d,f.onerror=e,f.ontimeout=e),f.onreadystatechange=function(){4===f.readyState&&(200===f.status||0==f.status&&f.responseText?d():e())},f.open("GET",a,!0),f.send(null)};else{var h=require("fs");d=function(a,b,c){return h.readFile(a,function(a,d){return a?c(a):(b(d+""),void 0)})}}var i=new f({global:e?window:a,strict:!0,normalize:function(a,b){if("string"!=typeof a)throw new TypeError("Module name must be a string");var c=a.split("/");if(0==c.length)throw new TypeError("No module name provided");var d=0,e=!1,f=0;if("."==c[0]){if(d++,d==c.length)throw new TypeError('Illegal module name "'+a+'"');e=!0}else{for(;".."==c[d];)if(d++,d==c.length)throw new TypeError('Illegal module name "'+a+'"');d&&(e=!0),f=d}for(var g=d;g<c.length;g++){var h=c[g];if(""==h||"."==h||".."==h)throw new TypeError('Illegal module name"'+a+'"')}if(!e)return a;{var i=[],j=(b||"").split("/");j.length-1-f}return i=i.concat(j.splice(0,j.length-1-f)),i=i.concat(c.splice(d)),i.join("/")},locate:function(a){var b,d=a.name,e="";for(var f in this.paths){var g=f.split("*");if(g.length>2)throw new TypeError("Only one wildcard in a path is permitted");1==g.length?d==f&&f.length>e.length&&(e=f):d.substr(0,g[0].length)==g[0]&&d.substr(d.length-g[1].length)==g[1]&&(e=f,b=d.substr(g[0].length,d.length-g[1].length-g[0].length))}var h=this.paths[e];return b&&(h=h.replace("*",b)),c(this.baseURL,h)},fetch:function(a){var b,e,f=new g(function(a,c){b=a,e=c});return d(c(this.baseURL,a.address),function(a){b(a)},e),f}});if(e){var j=window.location.href.split("#")[0].split("?")[0];i.baseURL=j.substring(0,j.lastIndexOf("/")+1)}else i.baseURL="./";if(i.paths={"*":"*.js"},e){var k=document.getElementsByTagName("script");k=k[k.length-1],document.onreadystatechange=function(){if("interactive"==document.readyState)for(var a=document.getElementsByTagName("script"),b=0;b<a.length;b++){var c=a[b];if("module"==c.type){var d=c.getAttribute("name"),e=c.getAttribute("src"),f=c.innerHTML;(d?i.define(d,f,{address:e}):i.module(f,{address:e})).then(function(){},function(a){nextTick(function(){throw a})})}}},k.getAttribute("data-init")&&window[k.getAttribute("data-init")]()}"object"==typeof exports&&(module.exports=i),a.System=i}("undefined"!=typeof global?global:this);